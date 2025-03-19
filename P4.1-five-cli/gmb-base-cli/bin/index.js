#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

// 使用方法1：内置的单例对象 使用
// const { program } = commander

// program
//   .version(pkg.version)
//   .parse(process.argv)

// 使用方法2：新建一个 program对象
const program = new commander.Command()

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --env <envName>', '获取环境变量名称')
  .parse(process.argv)

// 获取解析后的选项值
const options = program.opts(); 
console.log(options.debug)
console.log(options.env)

program.outputHelp()