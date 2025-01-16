(() => {
  var __webpack_modules__ = {
    "./src/a.js": (module) => {
      eval(
        "module.exports = '我是a.js导出内容';\n\n
        //# sourceURL=webpack://1.1-webpack-base/./src/a.js?"
      );
    },

    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'console.log("Hello Webpack");\n\n
        let str = __webpack_require__(/*! ./a */ "./src/a.js");\n
        console.log(\'str是----\', str);\n\n\n
        //# sourceURL=webpack://1.1-webpack-base/./src/index.js?'
      );
    },
  // };
  /************************************************************************/

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }

    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
