const fs = require('fs');
const util = require('util');
const path = require('path');

const webpack = require('webpack');
const {
  RawSource
} = webpack.sources;

// 将fs.readFile方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile);

/*
  1. 初始化compilation钩子
  2. 往要输出资源中，添加一个a.txt文件
  3. 读取b.txt中的内容，将b.txt中的内容添加到输出资源中的b.txt文件中
      3.1 读取b.txt中的内容需要使用node的readFile模块
      3.2  将b.txt中的内容添加到输出资源中的b.txt文件中除了使用 2 中的方法外，还有两种形式可以使用
          3.2.1 借助RawSource
          3.2.2 借助RawSource和emitAsset
*/

class Plugin2 {

  apply(compiler) {
    // 1.初始化compilation钩子
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      // debugger
      // console.log(compilation);
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async(cb) => {
        // debugger
        // console.log(compilation);

        const content = 'hello plugin2';

        // 2.往要输出资源中，添加一个a.txt
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length;
          },
          // 文件内容
          source() {
            return content;
          }
        }

        const data = await readFile(path.resolve(__dirname, 'b.txt'));

        // 3.2.1 compilation.assets['b.txt'] = new RawSource(data);
        // 3.2.1
        compilation.emitAsset('b.txt', new RawSource(data));

        cb();

      })
    })

  }

}

module.exports = Plugin2;