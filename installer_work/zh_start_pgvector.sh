#!/bin/bash

# 定义配置常量
CONTAINER_NAME="pgvector-db"
LOCAL_DATA_PATH="/opt/psgl/data"
POSTGRES_PASSWORD="p8ksXZihmif8dHhY"
POSTGRES_USER="langflow_user"
POSTGRES_DB="langflow_demo_db"
PORT_MAPPING="15432:5432"
IMAGE="pgvector/pgvector:pg15"

# 新增需要创建的额外目录列表（无需清空）
EXTRA_DIRS=(
    "/opt/chatflow/conf"
    "/opt/chatflow/logs"
    "/opt/chatflow-app/model"
)

# 脚本标题
echo "====================================="
echo "      PostgreSQL + pgvector 启动脚本"
echo "====================================="

# 1. 创建数据目录（如果不存在）
echo -e "\n[1/6] 检查并创建数据目录..."
if [ ! -d "${LOCAL_DATA_PATH}" ]; then
    mkdir -p "${LOCAL_DATA_PATH}"
    echo "✅ 数据目录不存在，已创建: ${LOCAL_DATA_PATH}"
else
    echo "✅ 数据目录已存在: ${LOCAL_DATA_PATH}"
fi

# 2. 交互式确认是否清空数据目录
echo -e "\n[2/6] 数据目录初始化确认"
read -p "❓ 是否清空数据目录 ${LOCAL_DATA_PATH} 中的数据？(y/n，默认n): " CLEAR_DATA
CLEAR_DATA=${CLEAR_DATA:-n}  # 设置默认值为n

if [ "${CLEAR_DATA}" = "y" ] || [ "${CLEAR_DATA}" = "Y" ]; then
    echo "🗑️  正在清空数据目录..."
    rm -rf "${LOCAL_DATA_PATH:?}"/*  # :? 防止路径为空时误删根目录
    echo "✅ 数据目录已清空"
else
    echo "ℹ️  跳过数据目录清空操作"
fi

# 3. 新增：创建额外的应用目录（仅创建，不清空）
echo -e "\n[3/6] 检查并创建应用所需目录..."
for dir in "${EXTRA_DIRS[@]}"; do
    if [ ! -d "${dir}" ]; then
        mkdir -p "${dir}"
        echo "✅ 目录不存在，已创建: ${dir}"
    else
        echo "✅ 目录已存在: ${dir}"
    fi
done

# 4. 停止并删除已存在的同名容器（避免冲突）
echo -e "\n[4/6] 检查并清理旧容器..."
if docker ps -a --format "{{.Names}}" | grep -w "${CONTAINER_NAME}" > /dev/null; then
    echo "🔴 发现同名容器，正在停止并删除..."
    docker stop "${CONTAINER_NAME}" > /dev/null
    docker rm "${CONTAINER_NAME}" > /dev/null
    echo "✅ 旧容器已清理"
else
    echo "✅ 无同名容器，无需清理"
fi

# 5. 启动 pgvector 容器
echo -e "\n[5/6] 启动 PostgreSQL + pgvector 容器..."
docker run -d \
    --name "${CONTAINER_NAME}" \
    -e "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" \
    -e "POSTGRES_USER=${POSTGRES_USER}" \
    -e "POSTGRES_DB=${POSTGRES_DB}" \
    -p "${PORT_MAPPING}" \
    -v "${LOCAL_DATA_PATH}:/var/lib/postgresql/data" \
    "${IMAGE}"

# 检查容器是否启动成功
if [ $? -eq 0 ]; then
    echo "✅ 容器启动命令执行成功"
else
    echo "❌ 容器启动失败，请检查命令或镜像是否正确"
    exit 1
fi

# 6. 等待容器就绪并启用 vector 扩展
echo -e "\n[6/6] 等待容器初始化（10秒）..."
sleep 10

echo "🔧 正在启用 pgvector 扩展..."
# 使用 exec -i 而非 -it（避免终端交互问题），直接执行 SQL 命令
docker exec -i "${CONTAINER_NAME}" psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" << EOF
CREATE EXTENSION IF NOT EXISTS vector;
\q
EOF

# 验证扩展是否启用成功
if [ $? -eq 0 ]; then
    echo -e "\n🎉 操作完成！"
    echo "✅ pgvector 容器已启动，vector 扩展已启用"
    echo "📌 容器名称: ${CONTAINER_NAME}"
    echo "📌 访问端口: 15432"
    echo "📌 数据目录: ${LOCAL_DATA_PATH}"
    echo "📌 已创建应用目录: ${EXTRA_DIRS[*]}"
else
    echo -e "\n❌ vector 扩展启用失败，请手动执行以下命令排查："
    echo "docker exec -it ${CONTAINER_NAME} psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c 'CREATE EXTENSION IF NOT EXISTS vector;'"
    exit 1
fi

echo -e "\n====================================="
echo "            脚本执行结束"
echo "====================================="