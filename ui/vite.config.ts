import {fileURLToPath, URL} from 'node:url'
import type {ProxyOptions} from 'vite'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'
import {createHtmlPlugin} from 'vite-plugin-html'
import fs from 'fs'
// import vueDevTools from 'vite-plugin-vue-devtools'
const envDir = './env'
// 自定义插件：重命名入口文件
const renameHtmlPlugin = (outDir: string, entry: string) => {
  return {
    name: 'rename-html',
    closeBundle: () => {
      const buildDir = path.resolve(__dirname, outDir)
      const oldFile = path.join(buildDir, entry)
      const newFile = path.join(buildDir, 'index.html')

      // 检查文件是否存在
      if (fs.existsSync(oldFile)) {
        // 删除已存在的 index.html
        if (fs.existsSync(newFile)) {
          fs.unlinkSync(newFile)
        }
        // 重命名文件
        fs.renameSync(oldFile, newFile)
      }
    },
  }
}

const devRootRedirectPlugin = (basePath: string, entry: string) => {
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  const entryPath = `${basePath}${entry}`
  return {
    name: 'dev-root-redirect',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (
          req.url === '/' ||
          req.url === '/index.html' ||
          req.url === basePath ||
          req.url === normalizedBasePath ||
          req.url?.startsWith(`${basePath}?`) ||
          req.url?.startsWith(`${normalizedBasePath}?`)
        ) {
          res.statusCode = 302
          res.setHeader('Location', entryPath)
          res.end()
          return
        }
        next()
      })
    },
  }
}
const devChatEntryPlugin = () => {
  const chatHtml = fs.readFileSync(path.resolve(__dirname, 'chat.html'), 'utf-8')
  return {
    name: 'dev-chat-entry',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url || ''
        const pathname = url.split('?')[0]
        if (pathname === '/chat/favicon.ico') {
          res.statusCode = 302
          res.setHeader('Location', '/favicon.ico')
          res.end()
          return
        }
        const accept = req.headers?.accept || ''
        const isChatPage = pathname === '/chat' || pathname.startsWith('/chat/')
        if (!isChatPage || pathname.startsWith('/chat/api') || !accept.includes('text/html')) {
          next()
          return
        }
        const html = await server.transformIndexHtml(url, chatHtml)
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
      })
    },
  }
}
// https://vite.dev/config/
export default defineConfig((conf: any) => {
  const mode = conf.mode
  const ENV = loadEnv(mode, envDir)
  const proxyConf: Record<string, string | ProxyOptions> = {}
  proxyConf['/admin/api'] = {
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
  }
  proxyConf['/chat/api'] = {
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
  }
  proxyConf['/doc'] = {
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(ENV.VITE_BASE_PATH, '/'),
  }
  proxyConf['/schema'] = {
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(ENV.VITE_BASE_PATH, '/'),
  }
  proxyConf['/static'] = {
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(ENV.VITE_BASE_PATH, '/'),
  }

  // 前端静态资源转发到本身
  proxyConf[`^${ENV.VITE_BASE_PATH}.+\/oss\/file\/.*$`] = {
    target: `http://127.0.0.1:8080`,
    changeOrigin: true,
  }
  // 前端静态资源转发到本身
  proxyConf[`^${ENV.VITE_BASE_PATH}oss\/file\/.*$`] = {
    target: `http://127.0.0.1:8080`,
    changeOrigin: true,
  }
  proxyConf[`^${ENV.VITE_BASE_PATH}oss\/get_url\/.*$`] = {
    target: `http://127.0.0.1:8080`,
    changeOrigin: true,
  }
  // 前端静态资源转发到本身
  // proxyConf[ENV.VITE_BASE_PATH] = {
  //   target: `http://127.0.0.1:${ENV.VITE_APP_PORT}`,
  //   changeOrigin: true,
  //   rewrite: (path: string) => path.replace(ENV.VITE_BASE_PATH, '/'),
  // }

  return {
    preflight: false,
    lintOnSave: false,
    base: ENV.VITE_BASE_PATH,
    envDir: envDir,
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      createHtmlPlugin({template: ENV.VITE_ENTRY}),
      renameHtmlPlugin(`dist${ENV.VITE_BASE_PATH}`, ENV.VITE_ENTRY),
      ...(conf.command === 'serve'
        ? [devRootRedirectPlugin(ENV.VITE_BASE_PATH, ENV.VITE_ENTRY), devChatEntryPlugin()]
        : []),
    ],
    server: {
      cors: true,
      host: '0.0.0.0',
      port: Number(ENV.VITE_APP_PORT),
      strictPort: true,
      proxy: proxyConf,
    },
    build: {
      outDir: `dist${ENV.VITE_BASE_PATH}`,
      rollupOptions: {
        input: ENV.VITE_ENTRY,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
