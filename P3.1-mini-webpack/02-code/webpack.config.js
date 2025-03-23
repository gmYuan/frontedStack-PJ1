const path  = require('path');
module.exports = {
    context: path.resolve(__dirname, 'src'),//当前的工作目录
    mode:'development',
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    },
}