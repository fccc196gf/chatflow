# ChatFlow

[English](README.md) | [中文](README_zh.md)

ChatFlow 是一个强大的可视化对话 AI 应用构建平台。它利用现代大语言模型（LLM）的能力，让用户能够轻松设计、测试和部署智能聊天机器人及工作流。

## 环境要求 (Prerequisites)

在开始之前，请确保您的系统已安装以下环境：

- **Python**: 版本 3.11 或更高
- **Node.js**: 版本 20 或更高
- **uv**: 快速的 Python 包安装和解析工具
- **Docker**: 用于运行 PostgreSQL 数据库

## 数据库设置 (Database Setup)

ChatFlow 需要 **PostgreSQL**（带 `pgvector` 扩展）和 **Redis**。

- **Redis**: 可以安装在本地或通过 Docker 运行。
- **PostgreSQL**: 必须通过 Docker 使用提供的脚本安装，以确保正确的版本和扩展可用。

### 启动 PostgreSQL (Docker)

我们提供了一个脚本，可以快速启动启用了 `pgvector` 扩展的 PostgreSQL 容器。

**脚本路径**: `en_start_pgvector.sh`

启动数据库，请运行：

```bash
# 如果需要，授予执行权限
chmod +x en_start_pgvector.sh

# 运行脚本
./en_start_pgvector.sh
```

**注意**:
- 脚本使用 `pgvector/pgvector:pg15` 镜像。请确保您的 Docker 环境支持此版本。
- 默认端口映射为 `15432:5432`。
- 默认凭据可在脚本中找到（用户: `langflow_user`, 数据库: `langflow_demo_db`）。

## 配置 (Configuration)

在运行应用程序之前，您需要设置配置文件和模型资源。

1.  **创建配置目录**
    确保目标目录存在：

    ```bash
    mkdir -p /opt/chatflow/conf
    ```

2.  **复制配置文件**
    将项目根目录下的 `config.yml` 复制到配置目录：

    ```bash
    cp config.yml /opt/chatflow/conf/config.yml
    ```

3.  **设置模型资源**
    下载所需的模型资源并将其放置在指定目录中。

    - **目标路径**: `/opt/chatflow-app`
    - **下载链接**: [Google Drive](https://drive.google.com/file/d/141ivxMi3L3ZPAnDAwOkLH4n-FBYGpf6B/view?usp=sharing)

    将下载的文件解压到 `/opt/chatflow-app`，以确保应用程序可以访问必要的模型。

    > **备选方案**: 如果您无法从 Google Drive 下载，可以执行以下脚本来下载模型文件：
    >
    > ```bash
    > python installer_work/install_model_file.py
    > ```

## 快速开始 (Getting Started)

### 后端设置 (Backend Setup - Python)

1.  **创建虚拟环境**
    使用 Python 内置的 `venv` 模块在 `.venv` 目录中创建虚拟环境：

    ```bash
    python -m venv .venv
    ```

2.  **激活虚拟环境**
    激活环境以隔离项目依赖：

    ```bash
    # Linux/macOS
    source .venv/bin/activate

    # Windows
    # .venv\Scripts\activate
    ```

3.  **安装 `uv`**
    在虚拟环境中安装 `uv` 以便更快地管理包：

    ```bash
    pip install uv
    ```

4.  **同步依赖**
    使用 `uv` 同步并安装所有必需的 Python 包：

    ```bash
    uv sync
    ```

5.  **运行后端**
    从项目根目录启动后端应用程序：

    ```bash
    python main.py start
    ```

    等待应用程序初始化。如果遇到任何错误或需要进行故障排除，请检查以下目录中的日志：
    `/opt/chatflow/logs`

    **默认登录凭据**:
    - **用户名**: `admin`
    - **密码**: `CHATFLOW@123..`

### 前端设置 (Frontend Setup - Node.js)

1.  **进入 UI 目录**
    进入前端项目文件夹：

    ```bash
    cd ./ui
    ```

2.  **安装依赖**
    使用 `npm` 安装必要的 Node.js 包：

    ```bash
    npm install
    ```

3.  **运行前端**
    启动开发服务器：

    ```bash
    npm run dev
    ```

    应用程序将在 `http://localhost:3000`（或终端中显示的端口）上可用。

    **构建 (可选)**
    如果您需要为生产环境构建项目：

    ```bash
    npx concurrently "npm run build" "npm run build-chat"
    ```

    构建产物将生成在 `dist` 目录中。

    **Nginx 配置**

    如果您使用 Nginx 部署前端，可以使用以下配置：

    ```nginx
    server {
        listen       80;
        server_name  localhost;
        root   /www/python-03-02/chatflow/ui/dist;

        # ==========================
        # 1. 根路径策略
        # ==========================
        # 访问 / 时，直接重定向到 /admin
        location = / {
            return 302 /admin;
        }

        # 全局兜底策略
        location / {
            try_files $uri $uri/ /admin/index.html;
        }

        # ==========================
        # 2. API 代理 (必须配置)
        # ==========================
        # 拦截所有 /admin/api/ 和 /chat/api/ 请求，转发给后端
        location ~ ^/(admin|chat)/api/ {
            proxy_pass http://127.0.0.1:8080; # 你的 Django 后端地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # ==========================
        # 3. 前端应用路由 (SPA)
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

## 致谢 (Acknowledgement)

本项目参考自 [MaxKB](https://github.com/1Panel-dev/MaxKB)。
我们移除了一些不必要的功能，并专注于增强 **Agent**、**RAG** 及其他相关功能，以提供更专业的使用体验。
