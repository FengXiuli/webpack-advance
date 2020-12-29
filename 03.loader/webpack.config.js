const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babelLoader',
      options: {
        presets: [
          '@babel/preset-env'
        ]
      }
    }]
  },
  // 配置loader解析规则：我们的loader去哪个文件夹下面寻找（这里表示的是同级目录的loaders文件夹下面寻找）
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
}