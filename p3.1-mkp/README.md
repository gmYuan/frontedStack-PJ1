# frontedStack-pj1

# mkp 实践记录

## 1 初始化项目 + 安装核心依赖

```bash
# 1. 初始化项目（如果还没有执行过）
npm init -y

# 2. 安装 Vue 核心依赖
npm install vue@2.7.13 vue-router@3.6.5 vuex@3.3.0 --save

# 3. 安装基础开发依赖
npm install cross-env@5.0.1 --save-dev
```


## 2 安装 配置构建的 脚手架工具

1 安装 官方构建脚手架工具: vue-cli

```bash
# npm install -g @vue/cli
npm install @vue/cli-service --save-dev  
```

2 或者是 安装 公司私有仓库的 内部构建脚手架工具: my-cli

2.1 安装指定版本

```bash
npm install git+http://xxxyyy#v1.0.1
```

2.2 安装最新版本

```bash
npm install git+http://xxxyyy
```


3.1 在 package.json 中添加基本的开发和构建命令

```json
{
  // ... 其他配置保持不变 ...
  "scripts": {
    "dev": "cross-env NODE_ENV=development [官方/内部 构建脚手架工具] [开发环境构建命令]",
    "build": "cross-env NODE_ENV=production [官方/内部 构建脚手架工具] [生产环境构建命令]"
  }
}
```

3.2 这里采用 官方构建脚手架工具: vue-cli-service

```json
{
  // ... 其他配置保持不变 ...
  "scripts": {
    "dev": "cross-env NODE_ENV=development vue-cli-service serve",
    "build": "cross-env NODE_ENV=production vue-cli-service build"
  }
}
```

