### 本demo主要提供如何在构建是自动检测循环依赖的能力

```
npm i circular-dependency-plugin@4 -D
```

>注意webpack@3 的版本应该安装 circular-dependency-plugin@4 的版本

https://www.npmjs.com/package/circular-dependency-plugin

修改chameleon.config.js

```javascript
const CircularDependencyPlugin = require('circular-dependency-plugin')
//....
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
```