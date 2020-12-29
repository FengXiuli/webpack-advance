const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook
} = require('tapable');

/*
  [hooks](https: //webpack.docschina.org/api/compiler-hooks/#hooks)
    [tapable](https: //github.com/webpack/tapable#tapable)
      1. 安装tapable： npm install tapable - D 
      2. 初始化hooks容器 2.1 同步hooks， 任务会依次执行: SyncHook、 SyncBailHook 
      2.2 异步hooks， 异步并行： AsyncParallelHook， 异步串行： AsyncSeriesHook 
      3. 往hooks容器中注册事件 / 添加回调函数 
      4. 触发hooks 
      5. 启动文件： node tapable.test.js
*/

class Lesson {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      // 同步hooks，任务会依次执行
      // go: new SyncHook(['address'])
      // SyncBailHook：一旦有返回值就会退出～
      go: new SyncBailHook(['address']),

      // 异步hooks
      // AsyncParallelHook：异步并行
      // leave: new AsyncParallelHook(['name', 'age']),
      // AsyncSeriesHook: 异步串行
      leave: new AsyncSeriesHook(['name', 'age'])
    }
  }
  tap() {
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318', address);
      return 111;
    })
    this.hooks.go.tap('class0410', (address) => {
      console.log('class0410', address);
    })

    // tapAsync常用，有回调函数
    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
        setTimeout(() => {
          console.log('class0510', name, age);
          cb();
        }, 2000)
      })
      // 需要返回promise
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('class0610', name, age);
          resolve();
        }, 1000)
      })
    })
  }

  start() {
    // 触发hooks
    this.hooks.go.call('c318');
    this.hooks.leave.callAsync('jack', 18, function() {
      // 代表所有leave容器中的函数触发完了，才触发
      console.log('end~~~');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();