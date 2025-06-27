import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"
import { ArcoResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import { vitePluginForArco } from "@arco-plugins/vite-vue"
import { visualizer } from "rollup-plugin-visualizer"
// 代码压缩
// import viteCompression from "vite-plugin-compression"

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
      AutoImport({
        resolvers: [
          ArcoResolver({
            importStyle: "less",
          }),
        ],
        imports: ["vue"],
        vueTemplate: true,
      }),

      vitePluginForArco({
        style: true,
      }),
      // viteCompression({  // 压缩代码
      // verbose: true, // 是否在控制台输出压缩结果，默认为true
      // disable: false, // 是否禁用压缩，默认为false
      // threshold: 10240, // 文件大小超过10240字节（10KB）时才进行压缩
      // algorithm: "gzip", // 压缩算法，可选['gzip', 'brotliCompress', 'deflate', 'deflateRaw']
      // ext: ".gz", // 压缩文件的扩展名
      // compressionOptions: {}, // 压缩算法的参数
      // deleteOriginFile: false, // 压缩后是否删除源文件
      // }),
      visualizer({
        gzipSize: true, // 显示各文件在经过 gzip 压缩后的大小
        brotliSize: true, // 显示各文件在经过 brotli 压缩后的
        open: false,
        filename: "visualizer.html", // 生成的报告文件名称
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      esbuild: {
        drop: ["console", "debugger"], // 生产环境时移除console、
      },
      // minify: "terser", // 需要安装terser，和esbuild（不用安装）差不多。选项:esbuild/terser; terser构建后文件体积更小，但会使打包时变卡(cpu占满)
      // emptyOutDir: true,
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      rollupOptions: {
        output: {
          // experimentalMinChunkSize: 10 * 1024, // 单位b 没有副作用，合并较小的模块 -- 实验性选项
          manualChunks(id) {
            if (id.includes("/@bpmn-io")) {
              // 让每个插件都打包成独立的文件
              return "bpmn-io"
            }
            if (id.includes("/@arco-design/web-vue")) {
              // 让每个插件都打包成独立的文件
              return "arco-design"
            }
          },
        },
      },
    },
  }
})
