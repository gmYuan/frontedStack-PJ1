const path = require("path");
const plugin1 = path.resolve(__dirname, "plugins", "plugin1.js");
const plugin2 = path.resolve(__dirname, "plugins", "plugin2.js");
const plugin3 = path.resolve(__dirname, "plugins", "plugin3.js");
const plugin4 = path.resolve(__dirname, "plugins", "plugin4.js");
const plugin5 = path.resolve(__dirname, "plugins", "plugin5.js");
const plugin6 = path.resolve(__dirname, "plugins", "plugin6.js");
function preset1() {
  return { plugins: [plugin5, plugin6] };
}
function preset2() {
  return { plugins: [plugin3, plugin4] };
}
//plugins: [plugin1,plugin2],
//presets: [preset1,preset2]
//插件先执行 + 预设后执行
//插件是从前往后
//预设是从后往前
//plugin1, plugin2;  plugin3, plugin4;  plugin5, plugin6

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     // [
          //     //   "@babel/preset-env",
          //     //   {
          //     //     // false: 无视配置的浏览器兼容性，引入所有polyfill
          //     //     // entry: 根据配置的浏览器兼容，引入浏览器不兼容的polyfill
          //     //     // usage: 会根据代码中使用到的api，按需引入对应的polyfill
          //     //     useBuiltIns: "usage",
          //     //     corejs: 3,
          //     //     targets: "> 0.25%",
          //     //   },
          //     // ],

          //     [
          //       "@babel/preset-env",
          //       {
          //         targets: "> 0.25%",
          //       },
          //     ],
          //   ],
          //   plugins: [
          //     [
          //       "@babel/plugin-transform-runtime",
          //       {
          //         corejs: 3,
          //         // 移除内联的babel helpers 并替换使用 babel-runtime/helpers
          //         // helpers: false,
          //         // 移除内联的 regenerator helpers 并替换使用 babel-runtime/regenerator
          //         regenerator: true,
          //       },
          //     ],
          //   ],
          //   // 添加这个配置来正确处理 ES modules
          //   sourceType: "unambiguous",
          // },

          // 测试插件和预设执行顺序
          options: {
            plugins: [plugin1, plugin2],
            presets: [preset1, preset2],
          },
        },
      },
    ],
  },
  plugins: [],
};
