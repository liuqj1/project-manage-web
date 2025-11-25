const path = require('path')
const { defineConfig } = require('@vue/cli-service')


// 详情查看：   https://blog.csdn.net/sunyctf/article/details/129590503
module.exports = defineConfig({

    // 基本路径 baseURL已经过时

    publicPath: "/scientific-manage-web/",
    // 输出文件目录
    outputDir: "dist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    filenameHashing: true,
    pages: {
        index: {
            // page 的入口
            entry: "src/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"],
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        //subpage: "src/subpage/main.js",
    },
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    //解决SVG图标问题
    chainWebpack:config=>{
        // svg图标加载
        config.module
            .rule('svg')
            .exclude.add(path.join(__dirname, 'src/icons/svg'))
            .end()

        config.module
            .rule('icons')// 定义一个名叫 icons 的规则
            .test(/\.svg$/)// 设置 icons 的匹配正则
            .include.add(path.join(__dirname,'src/icons/svg'))// 设置当前规则的作用目录，只在当前目录下才执行当前规则
            .end()
            .use('svg-sprite')// 指定一个名叫 svg-sprite 的 loader 配置
            .loader('svg-sprite-loader')// 该配置使用 svg-sprite-loader 作为处理 loader
            .options({// 该 svg-sprite-loader 的配置
                symbolId:'icon-[name]'
            })
            .end()
    },
    configureWebpack: () => { },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},

    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === "darwin",  //配置自动启动浏览器
        //host: "localhost",
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: 8090,
        //open: true,
        // proxy: {
        //     "/scientific-manage": {
        //         target: "http://localhost:8083",
        //         changeOrigin: true,
        //         // ws: true,
        //         // pathRewrite: {
        //         //     ["^/dev-api"]: "",
        //         // },
        //     }
        // }
    },
        //https: false,
       // hotOnly: false,   //热更新
       //  proxy: null, // 设置代理
       //  changOrigin: true,//是否开启跨域
       //  proxy: {
       //      '/forecast': {//表示拦截以/forecast开头的请求路径
       //          target: 'localhost:8081',
       //          changOrigin: true,//是否开启跨域
       //          pathRewrite: {
       //              '^/forecast': '' //重写api，把api变成空字符，因为我们真正请求的路径是没有api的
       //          }
       //      }
       //  }
       //  before: (app) => { },
    // },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },

})
