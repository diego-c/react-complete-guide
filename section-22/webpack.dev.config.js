const common = require('./webpack.common.config'),
path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
merge = require('webpack-merge');

module.exports = merge(common, {
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            title: 'Webpack React App',
            inject: 'body'
        })
    ]
})
