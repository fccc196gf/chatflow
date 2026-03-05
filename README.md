# ChatFlow

[English](README.md) | [中文](README_zh.md)

ChatFlow is a powerful, visual platform for building conversational AI applications. It enables users to design, test, and deploy intelligent chatbots and workflows with ease, leveraging modern LLM capabilities.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python**: Version 3.11 or higher
- **Node.js**: Version 20 or higher
- **uv**: A fast Python package installer and resolver
- **Docker**: Required for running the PostgreSQL database

## Database Setup

ChatFlow requires **PostgreSQL** (with `pgvector` extension) and **Redis**.

- **Redis**: Can be installed locally on your machine or run via Docker.
- **PostgreSQL**: Must be installed via Docker using the provided script to ensure the correct version and extensions are available.

### Start PostgreSQL (Docker)

We provide a script to quickly start a PostgreSQL container with the `pgvector` extension enabled.

**Script Path**: `en_start_pgvector.sh`

To start the database, run:

```bash
# Grant execution permissions (if needed)
chmod +x en_start_pgvector.sh

# Run the script
./en_start_pgvector.sh
```

**Note**:
- The script uses the `pgvector/pgvector:pg15` image. Please ensure your Docker environment supports this version.
- Default port mapping is `15432:5432`.
- Default credentials can be found in the script (User: `langflow_user`, DB: `langflow_demo_db`).

## Configuration

Before running the application, you need to set up the configuration file and model resources.

1.  **Create Configuration Directory**
    Ensure the target directory exists:

    ```bash
    mkdir -p /opt/chatflow/conf
    ```

2.  **Copy Configuration File**
    Copy the `config.yml` from the project root to the configuration directory:

    ```bash
    cp config.yml /opt/chatflow/conf/config.yml
    ```

3.  **Setup Model Resources**
    Download the required model resources and place them in the specified directory.

    - **Target Path**: `/opt/chatflow-app`
    - **Download Link**: [Google Drive](https://drive.google.com/file/d/141ivxMi3L3ZPAnDAwOkLH4n-FBYGpf6B/view?usp=sharing)

    Extract the downloaded files to `/opt/chatflow-app` to ensure the application can access the necessary models.

    > **Alternative**: If you are unable to download from Google Drive, you can execute the following script to download the model files:
    >
    > ```bash
    > python installer_work/install_model_file.py
    > ```

## Getting Started

### Backend Setup (Python)

1.  **Create a Virtual Environment**
    Use Python's built-in `venv` module to create a virtual environment in the `.venv` directory:

    ```bash
    python -m venv .venv
    ```

2.  **Activate the Virtual Environment**
    Activate the environment to isolate your project dependencies:

    ```bash
    # On Linux/macOS
    source .venv/bin/activate

    # On Windows
    # .venv\Scripts\activate
    ```

3.  **Install `uv`**
    Install `uv` within your virtual environment for faster package management:

    ```bash
    pip install uv
    ```

4.  **Sync Dependencies**
    Use `uv` to synchronize and install all required Python packages:

    ```bash
    uv sync
    ```

5.  **Running the Backend**
    Start the backend application from the project root directory:

    ```bash
    python main.py start
    ```

    Wait for the application to initialize. If you encounter any errors or need to troubleshoot, please check the logs in the following directory:
    `/opt/chatflow/logs`

    **Default Credentials**:
    - **Username**: `admin`
    - **Password**: `CHATFLOW@123..`

### Frontend Setup (Node.js)

1.  **Navigate to the UI Directory**
    Move into the frontend project folder:

    ```bash
    cd ./ui
    ```

2.  **Install Dependencies**
    Install the necessary Node.js packages using `npm`:

    ```bash
    npm install
    ```

3.  **Run the Frontend**
    Start the development server:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000` (or the port shown in the terminal).

    **Build (Optional)**
    If you need to build the project for production:

    ```bash
    npx concurrently "npm run build" "npm run build-chat"
    ```
    
    The build artifacts will be generated in the `dist` directory.

    **Nginx Configuration**

    If you deploy the frontend using Nginx, you can use the following configuration:

    ```nginx
    server {
        listen       80;
        server_name  localhost;
        root   /www/python-03-02/chatflow/ui/dist;

        # ==========================
        # 1. Root Path Strategy
        # ==========================
        # Redirect root path to admin
        location = / {
            return 302 /admin;
        }

        # Global fallback strategy
        location / {
            try_files $uri $uri/ /admin/index.html;
        }

        # ==========================
        # 2. API Proxy (Mandatory)
        # ==========================
        # Intercept all /admin/api/ and /chat/api/ requests and forward them to the backend
        location ~ ^/(admin|chat)/api/ {
            proxy_pass http://127.0.0.1:8080; # Your Django backend address
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # ==========================
        # 3. Frontend Application Routing (SPA)
        # ==========================

        # Admin
        location /admin {
            try_files $uri $uri/ /admin/index.html;
        }

        # Chat
        location /chat {
            try_files $uri $uri/ /chat/index.html;
        }
    }
    ```

## Acknowledgement

This project is referenced from [MaxKB](https://github.com/1Panel-dev/MaxKB).
We have removed unnecessary features and focused on enhancing **Agent**, **RAG**, and other related functionalities to provide a more specialized experience.
