#  mkp项目 Ques & Todo 记录


## Ques

1 如何开发 私有的脚手架工具/CLI 工具(命令行界面工具)

2 dependencies 和 devDependencies 的区别




3 Todo记录

从项目目录来看，建议按以下顺序查看文件：
先看构建和配置相关文件
package.json：了解项目依赖和脚本命令
babel.config.js：了解 JS 编译配置
webpack.config.js：了解构建和打包配置
postcss.config.js：了解 CSS 处理配置
再看项目入口和核心逻辑
src/main.js：项目的入口文件
src/app/：应用的核心配置
src/router/：路由配置
最后看具体业务实现
src/pages/：页面组件
src/components/：通用组件
src/services/：接口服务
