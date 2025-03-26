class NormalModule {
  constructor({ name, context, rawRequest, resource, parser }) {
    this.name = name;
    this.context = context;
    this.rawRequest = rawRequest;
    //这是这个模块的绝对路径: /xxx/src/index.js
    this.resource = resource;

    //这是AST解析器, 可以把源代码 转成 AST抽象语法树
    this.parser = parser;
    //此模块对应的源代码
    this._source;
    //此模块对应的AST抽象语法树
    this._ast;
  }

  /**
   * 编译本模块
   * @param {*} compilation
   * @param {*} callback
   */
  build(compilation, callback) {
    this.doBuild(compilation, (err) => {
      // 得到语法树
      this._ast = this.parser.parse(this._source);
      callback();

      // 遍历语法树,找到里面的依赖进行收集依赖
      // 把转换后的语法树，重新生成源代码
      // 循环构建每一个异步代码块, 都构建完成才会代表 当前的模块编译完成
    });
  }

  /**
   * 1.读取模块的源代码
   * @param {*} compilation
   * @param {*} callback
   */
  doBuild(compilation, callback) {
    this.getSource(compilation, (err, source) => {
      this._source = source;
      callback();
    });
  }

  /**
   * 读取真正的源代码
   */
  getSource(compilation, callback) {
    // fs.readFile读文件
    compilation.inputFileSystem.readFile(this.resource, "utf8", callback);
  }
}

module.exports = NormalModule;

/**
module.build 的 实现思路
 1. 从硬盘上把模块内容读出来,读成一个文本

 2. 可能它不是一个JS模块,所以会可能要走loader的转换,最终肯定要得到一个JS模块代码,得不到就报错了

 3. 把这个JS模块代码经过parser处理，转成抽象语法树AST

 4. 分析AST里面的依赖,也就是找 require/import节点, 分析依赖的模块

 5. 递归的 编译依赖的模块

 6. 不停的依次递归 执行上面5步,直到所有的模块都 编译完成为止
 
 */

/**
 * 非常的重要的问题
 * 模块的ID的问题
 * 不管你是相对的本地模 块,还是三方模块
 * 最后它的moduleId 全部都一个相对相对于项目根目录打对路径
 * ./src/title.js
 * ./src/index.js
 * ./node_modules/util/util.js
 * 路径分隔符一定是linux /,而非window里的\
 */

/**
 * 如何处理懒加载
 * 1.先把代码转成AST语法树
 * 2.找出动态import节点
 */
