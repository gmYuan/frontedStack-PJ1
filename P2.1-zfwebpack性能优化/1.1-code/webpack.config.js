const path = require("path");
const fs = require("fs");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const bootstrap = path.resolve(
  __dirname,
  "node_modules/bootstrap/dist/css/bootstrap.css"
);

// 定义自定义loader路径
const loadersPath = path.resolve(__dirname, "loaders");

// 日志美化
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// 错误通知
const notifier = require("node-notifier");
const icon = path.join(__dirname, "icon.jpg");

// 速度分析
// const SpeedMeasureWebpack5Plugin = require("speed-measure-webpack5-plugin");
// const smw = new SpeedMeasureWebpack5Plugin();

// 文件体积监控
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 文件体积压缩
const TerserPlugin = require("terser-webpack-plugin");
// 因为CSS和JS的加载可以并行，所以我们可以通过此插件提取CSS成单独的文件;
// 然后去掉无用的 css 并进行压缩
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackplugin = require("optimize-css-assets-webpack-plugin");
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");

module.exports = (env) => {
  return {
    // devtool: "source-map",
    devtool: "inline-source-map",

    // context: 设置项目的根目录，所有相对路径都会基于这个目录来解析
    // process.cwd(): 返回脚本运行的 工作目录的绝对路径
    //  注意，它返回的是 命令执行时的目录，而不是文件所在的目录
    context: process.cwd(),

    resolve: {
      // 指定文件的扩展名, 找不到会报错
      extensions: [".js", ".jsx", ".json"],
      // 指定查找别名
      alias: {
        bootstrap,
      },
      // 指定查找目录
      modules: ["node_modules"],
      mainFields: ["browser", "module", "main"],
      mainFiles: ["index"],
    },

    // 配置 外部依赖 的声明
    // externals: {
    //   jquery: "Jquery",
    //   lodash: "Lodash",
    // },

    // 配置 自定义loader 的查找规则
    resolveLoader: {
      modules: [loadersPath, "node_modules"],
    },

    // 压缩JS
    optimization: {
      // 开启最小化
      // minimize: true,
      // // 配置 minimizer数组，
      // minimizer: [new TerserPlugin()],
      splitChunks: {
        // 分割什么加载类型的 模块：async（异步）、initial（同步）、all（所有）
        chunks: "all",
        // 分割成的单个chunk的 最小体积（以字节为单位）
        // 注意 minSize的优先级 > maxSize
        minSize: 0,
        // 分割成的单个chunk的 最大体积（以字节为单位）
        maxSize: 0,
        // 用于控制分割后剩余 chunk 的最小体积
        // 它主要用来防止 过小分割的情况
        minRemainingSize: 0,

        // 指定一个模块被引用 N次时, 才会被分割成单独的chunk
        minChunks: 2,

        // 限制异步加载时的 最大并行请求数
        maxAsyncRequests: 30,
        // 限制入口点（entry point）的最大并行请求数
        maxInitialRequests: 30,

        // chunk 名称分隔符
        automaticNameDelimiter: "~",
        // 强制分割的体积阈值
        // 当模块大小超过这个值时，会强制进行分割，忽略其他的限制条件
        // 主要用于处理大模块，确保它们能被分割出去，从而优化加载性能
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            // 使用函数来生成更有意义的名称
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item)
                .replace(/\.[^/.]+$/, "");
              return `${cacheGroupKey}~${moduleFileName}`;
            },
            priority: -10,
            // 用于控制 是否复用已经存在的chunk
            // 特别适合处理公共依赖和第三方库
            reuseExistingChunk: true,
          },
          default: {
            // 这个设置被上面的全局配置覆盖了
            minChunks: 2,
            priority: -20,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item)
                .replace(/\.[^/.]+$/, "");
              return `${cacheGroupKey}~${moduleFileName}`;
            },
            reuseExistingChunk: true,
          },
        },
      },
    },

    entry: {
      // main: "./src/index.js",
      // page1: "./src/page1.js",
      // page2: "./src/page2.js",

      p1: "./src/p1.js",
      p2: "./src/p2.js",
      p3: "./src/p3.js",
    },

    output: {
      // 返回 当前文件所在的目录 的绝对路径
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      // chunkFilename: '[filename]_[contenthash:4].js',
    },

    //oneOf只可能匹配数组中的某一个，找到一个之后就不再继续查找剩下的loader
    module: {
      // 配置 无依赖的类库 的递归解析
      // noParse: /title.js/,

      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              include: path.resolve(__dirname, "src"),
              exclude: /node_modules/,
              use: [
                // 开启多进程打包，需要注意 开启多进程需要引入通信耗时，需要注意避免 ”得不偿失“
                // {
                //   loader: 'thread-loader',
                //   options: {
                //     workers: 3,
                //   },
                // },
                {
                  loader: "babel-loader",
                  options: {
                    cacheDirectory: true,
                    presets: ["@babel/preset-env"],
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                // "cache-loader",
                "logger-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
              ],
            },
            {
              test: /\.less$/,
              use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            // 压缩图片
            {
              test: /\.(png|jpg|gif|bmp)$/,
              use: [
                {
                  loader: "image-webpack-loader",
                  options: {
                    // 启用渐进式JPEG，使图片在加载时由模糊到清晰
                    mozjpeg: {
                      progressive: true,
                    },
                    // 禁用 optipng 优化器，因为通常pngquant更好
                    optipng: {
                      enabled: false,
                    },
                    // 压缩质量范围，0.65是最小质量，0.9是最大质量
                    // 压缩速度，范围 1-11
                    pngquant: {
                      quality: [0.65, 0.9],
                      speed: 4,
                    },
                    // 是否启用隔行扫描，false 表示禁用
                    // 启用会让图片渐进式加载
                    gifsicle: {
                      interlaced: false,
                    },
                    // WebP 压缩质量，范围 0-100
                    webp: {
                      quality: 75,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      // 压缩HTML
      // new htmlWebpackPlugin({
      //   template: "./public/index.html",
      //   filename: "index.html",
      //   minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
      // }),

      new htmlWebpackPlugin({
        template: "./public/index.html",
        filename: "p1.html",
        chunks: ["p1"], // 向html中注入哪些 bundle
      }),

      new htmlWebpackPlugin({
        template: "./public/index.html",
        filename: "p2.html",
        chunks: ["p2"],
      }),

      new htmlWebpackPlugin({
        template: "./public/index.html",
        filename: "p3.html",
        chunks: ["p3"],
      }),

      // 提取CSS
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      // 压缩CSS
      new OptimizeCssAssetsWebpackplugin(),
      // 删除无用的CSS
      // new PurgecssWebpackPlugin({
      //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      //   // 开启这个选项来查看哪些选择器被删除了
      //   rejected: true,
      // }),

      // 日志美化
      new FriendlyErrorsWebpackPlugin({
        // everity：错误的严重程度;  errors：错误信息
        onErrors: (severity, errors) => {
          const error = errors[0];
          notifier.notify({
            title: "Webpack编译失败",
            message: severity + ": " + error.name,
            // subtitle: 出错的文件名（如果有的话）
            subtitle: error.file || "",
            icon,
          });
        },
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
        generateStatsFile: true,
      }),

      new webpack.IgnorePlugin({
        // 资源模块 匹配
        resourceRegExp: /^\.\/locale$/,
        // 上下文目录 匹配
        contextRegExp: /moment$/,
      }),

      // 设置 编译阶段的 全局变量
      // new webpack.DefinePlugin({
      //   "process.env": Object.keys(process.env).reduce(
      //     (env, key) => {
      //       env[key] = JSON.stringify(process.env[key]);
      //       return env;
      //     },
      //     {
      //       // 确保 NODE_ENV 一定存在且在对象最前面
      //       NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      //     }
      //   ),
      // }),
    ],
  };
};
