const { Tapable, AsyncSeriesHook } = require("tapable");

class Compiler extends Tapable {
  constructor(context) {
    super();
    this.context = context;
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]), //所有的编译全部都完成
    };
  }

  //run方法是 开始编译的入口
  run(callback) {
    console.log("Compiler run");
    callback(null, {
      toJson: () => {
        return {
          entries: [],
          modules: [],
          chunks: [],
          assets: [],
        };
      },
    });
  }
}

module.exports = Compiler;
