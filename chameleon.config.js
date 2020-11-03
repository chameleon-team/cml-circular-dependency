
// 设置静态资源的线上路径
const publicPath = '//www.static.chameleon.com/cml';
// 设置api请求前缀
const apiPrefix = 'https://api.chameleon.com';
const CircularDependencyPlugin = require('circular-dependency-plugin')
cml.config.merge({
  templateLang: "cml",
  templateType: "html",
  platforms: ["web","weex","wx","alipay","baidu","qq"],
  buildInfo: {
    wxAppId: '123456'
  },
  wx: {
    dev: {
    },
    build: {
      apiPrefix
    }
  },
  web: {
    dev: {
      analysis: false,
      console: false,
      isWrapComponent: false // 取消默认对组件的包裹
    },
    build: {
      analysis: false,
      publicPath: `${publicPath}/web/`,
      apiPrefix,
      isWrapComponent: false // 取消默认对组件的包裹
    }
  },
  weex: {
    dev: {
      isWrapComponent: false // 取消默认对组件的包裹
    },
    build: {
      publicPath: `${publicPath}/weex/`,
      apiPrefix,
      isWrapComponent: false // 取消默认对组件的包裹
    },
    custom: {
      publicPath: `${publicPath}/wx/`,
      apiPrefix
    }
  },
  optimize: {
    watchNodeModules: false, // 设置为true对于调试 node_modules 里面的内容很有帮助
    showWarning: false, // 设置为true可以在构建过程中看到警告信息，比如编译过程中引入了同一个npm包的不同版本会在终端输出信息
    dropConsole: true, // 可以配置是否压缩模式下删除调试信息
    processBar: true // 可以配置是否需要构建进度条
  }
});

cml.utils.plugin('webpackConfig', function({ type, media, webpackConfig }, cb) {
  // cb函数用于设置修改后的配置
  debugger;
  if(media === 'dev'){ //开发阶段引入警告提示
    let checkCircular = new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
      });
      webpackConfig.plugins.push(checkCircular)
  }
  cb({
    type,
    media,
    webpackConfig
  });
});

