let { Tapable, SyncHook } = require("tapable");
const path = require("path");

const NormalModuleFactory = require("./NormalModuleFactory");
const normalModuleFactory = new NormalModuleFactory();
const Parser = require("./Parser");
const parser = new Parser();

class Compilation extends Tapable {
  constructor(compiler) {
    super();
    this.compiler = compiler;
    this.options = compiler.options; // 选项一样
    this.context = compiler.context; // 根目录
    this.inputFileSystem = compiler.inputFileSystem; // 读取文件模块fs
    this.outputFileSystem = compiler.outputFileSystem; // 写入文件的模块fs

    // 入口模块的数组,这里放着所有的入口模块
    this.entries = [];
    this.modules = []; // 模块的数组,这里放着所有的模块
    this.hooks = {
      //当你成功构建完成一个模块后，就会触发此钩子执行
      succeedModule: new SyncHook(["module"]),
    };
  }

  /**
   * 开始编译一个新的入口
   * @param {*} context  根目录
   * @param {*} entry 入口模块的相对路径 ./src/index.js
   * @param {*} name 入口的名字 main
   * @param {*} callback 所有模块都被编译完成  的回调
   */
  addEntry(context, entry, name, finalCallback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      finalCallback(err, module);
    });
  }

  _addModuleChain(context, rawRequest, name, callback) {
    //通过模块工厂创里一个模块
    let entryModule = normalModuleFactory.create({
      name,
      context, // 根目录
      rawRequest, // ./src/index.is
      resource: path.posix.join(context, rawRequest), // 入口的绝对路径
      parser,
    });
    // 添加入口模块 到数组里
    this.entries.push(entryModule);
    // 添加普通模块 到数组里
    this.modules.push(entryModule);

    const afterBuild = (err) => {
      // todo 递归 编译依赖的模块

      return callback(err, entryModule);
    };

    // 编译模块
    this.buildModule(entryModule, afterBuild);
  }

  /**
   * 编译模块
   * @param {*} module 要编译的模块
   * @param {*} afterBuild 编译完成后的后的回调
   */
  buildModule(module, afterBuild) {
    // 模块的真正的编译逻辑，其实是 放在module内部完成
    module.build(this, (err) => {
      //走到这里意味着，一个module模块 已经编译完成了
      this.hooks.succeedModule.call(module);
      afterBuild(err, module);
    });
  }
}

module.exports = Compilation;
