const path = require('path'),
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        chunkFilename: './js/[name].chunk.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env',
                            'babel-preset-stage-2', 
                            'babel-preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',                        
                                options: {
                                    modules: true,
                                    sourceMap: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]__[local]__[hash:base64:5]'
                                }                        
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                ident: 'postcss',
                                plugins: () => [
                                require('autoprefixer')({
                                    browsers: [
                                        '> 0.5%',
                                        'last 2 versions'
                                    ]
                                })
                            ]
                        }
                    }]
                
                })
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: 'file-loader',
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css')
    ]
}