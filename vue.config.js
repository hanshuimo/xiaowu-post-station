module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    publicPath: "./", // 构建好的文件输出到哪里
  
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [
      /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?
  
    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {}, // CSS 相关选项
    css: {
      // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
      // 也可以是传递给 extract-text-webpack-plugin 的选项对象
      
      loaderOptions: {
        postcss: {
         plugins: [
          require("postcss-plugin-px2rem")({
           rootValue: 32, //换算基数， 默认100 ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
           // unitPrecision: 5, //允许REM单位增长到的十进制数字。
           //propWhiteList: [], //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
           // propBlackList: [], //黑名单
           exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
           // selectorBlackList: [], //要忽略并保留为px的选择器
           // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
           // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
           mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
           minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
         ]
        }
       }
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
    
    
    
    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  
    pwa: {}, // configure webpack-dev-server behavior
    devServer: {
      open: process.platform === "darwin",
      disableHostCheck: false,
      host: "0.0.0.0",
      port: 8080,
      https: false,
      hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      proxy: null // string | Object
      // before: app => {}
    }, // 第三方插件配置
  
    pluginOptions: {
      // ...
    }
    
  };