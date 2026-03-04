#!/bin/bash

# Define configuration constants
CONTAINER_NAME="pgvector-db"
LOCAL_DATA_PATH="/opt/psgl/data"
POSTGRES_PASSWORD="p8ksXZihmif8dHhY"
POSTGRES_USER="langflow_user"
POSTGRES_DB="langflow_demo_db"
PORT_MAPPING="15432:5432"
IMAGE="pgvector/pgvector:pg15"

# List of additional directories to create (no cleanup required)
EXTRA_DIRS=(
    "/opt/chatflow/conf"
    "/opt/chatflow/logs"
    "/opt/chatflow-app/model"
)

# Script title
echo "====================================="
echo "      PostgreSQL + pgvector Startup Script"
echo "====================================="

# 1. Create data directory (if not exists)
echo -e "\n[1/6] Checking and creating data directory..."
if [ ! -d "${LOCAL_DATA_PATH}" ]; then
    mkdir -p "${LOCAL_DATA_PATH}"
    echo "✅ Data directory does not exist, created: ${LOCAL_DATA_PATH}"
else
    echo "✅ Data directory already exists: ${LOCAL_DATA_PATH}"
fi

# 2. Interactive confirmation to clear data directory
echo -e "\n[2/6] Data directory initialization confirmation"
read -p "❓ Do you want to clear data in ${LOCAL_DATA_PATH}? (y/n, default n): " CLEAR_DATA
CLEAR_DATA=${CLEAR_DATA:-n}  # Set default value to n

if [ "${CLEAR_DATA}" = "y" ] || [ "${CLEAR_DATA}" = "Y" ]; then
    echo "🗑️  Clearing data directory..."
    rm -rf "${LOCAL_DATA_PATH:?}"/*  # :? Prevent accidental deletion of root directory if path is empty
    echo "✅ Data directory cleared successfully"
else
    echo "ℹ️  Skipping data directory cleanup"
fi

# 3. Create additional application directories (create only, no cleanup)
echo -e "\n[3/6] Checking and creating application required directories..."
for dir in "${EXTRA_DIRS[@]}"; do
    if [ ! -d "${dir}" ]; then
        mkdir -p "${dir}"
        echo "✅ Directory does not exist, created: ${dir}"
    else
        echo "✅ Directory already exists: ${dir}"
    fi
done

# 4. Stop and remove existing container with the same name (avoid conflicts)
echo -e "\n[4/6] Checking and cleaning up old container..."
if docker ps -a --format "{{.Names}}" | grep -w "${CONTAINER_NAME}" > /dev/null; then
    echo "🔴 Found container with the same name, stopping and removing..."
    docker stop "${CONTAINER_NAME}" > /dev/null
    docker rm "${CONTAINER_NAME}" > /dev/null
    echo "✅ Old container cleaned up successfully"
else
    echo "✅ No container with the same name found, no cleanup needed"
fi

# 5. Start pgvector container
echo -e "\n[5/6] Starting PostgreSQL + pgvector container..."
docker run -d \
    --name "${CONTAINER_NAME}" \
    -e "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" \
    -e "POSTGRES_USER=${POSTGRES_USER}" \
    -e "POSTGRES_DB=${POSTGRES_DB}" \
    -p "${PORT_MAPPING}" \
    -v "${LOCAL_DATA_PATH}:/var/lib/postgresql/data" \
    "${IMAGE}"

# Check if container started successfully
if [ $? -eq 0 ]; then
    echo "✅ Container startup command executed successfully"
else
    echo "❌ Container startup failed, please check the command or image"
    exit 1
fi

# 6. Wait for container to be ready and enable vector extension
echo -e "\n[6/6] Waiting for container initialization (10 seconds)..."
sleep 10

echo "🔧 Enabling pgvector extension..."
# Use exec -i instead of -it (avoid terminal interaction issues), execute SQL command directly
docker exec -i "${CONTAINER_NAME}" psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" << EOF
CREATE EXTENSION IF NOT EXISTS vector;
\q
EOF

# Verify if extension enabled successfully
if [ $? -eq 0 ]; then
    echo -e "\n🎉 Operation completed!"
    echo "✅ pgvector container started, vector extension enabled"
    echo "📌 Container Name: ${CONTAINER_NAME}"
    echo "📌 Access Port: 15432"
    echo "📌 Data Directory: ${LOCAL_DATA_PATH}"
    echo "📌 Created Application Directories: ${EXTRA_DIRS[*]}"
else
    echo -e "\n❌ Failed to enable vector extension, please troubleshoot with the following command manually:"
    echo "docker exec -it ${CONTAINER_NAME} psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c 'CREATE EXTENSION IF NOT EXISTS vector;'"
    exit 1
fi

echo -e "\n====================================="
echo "            Script Execution End"
echo "====================================="