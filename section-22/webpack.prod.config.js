const UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
webpack = require('webpack'),
common = require('./webpack.common.config'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
path = require('path'),
merge = require('webpack-merge');

module.exports = merge(common, {
    entry: {
        main: ['babel-polyfill', './src/index.js'],
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: './js/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                use: {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        webp: {
                            quality: 70 
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            title: 'Webpack React App',
            inject: 'body',
            minify: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new UglifyJSPlugin({
            test: /\.jsx?$/,
            exclude: /node_modules/,
            parallel: true,
            uglifyOptions: {
                ecma: 5,
                compress: true,
                ie8: true,
                safari10: true                
            }
        })
    ]
})