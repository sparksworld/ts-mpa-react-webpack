const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const glob = require('glob')


let entry = {}
let plugins = []

glob.sync(path.resolve(__dirname, '../src/pages/*/main.{js,jsx,tsx}')).forEach(_path => {
    let name = _path.match(/\/pages\/\S+\//)[0].split('/')[2];
    plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../src/pages/${name}/index.pug`),
        filename: `${name}.html`,
        // inject: 'head', //js放到头部
        chunks: [name, 'vendor', 'common', 'react'] //指定页面加载的entry
    }))
    entry[name] = _path
})

module.exports = function(env) {
    return {
        entry: entry,
        module: {
            rules: [{
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader'
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            exclude: /node_modules/,
                            cacheDirectory: true
                        }
                    },
                }, {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['iOS >= 7', 'Android >= 4.1']
                                    }),
                                    require('postcss-px2rem')({
                                        remUnit: 100
                                    })
                                ]
                            }
                        },
                        'sass-loader',
                    ],
                }, {
                    test: /\.pug$/,
                    use: [{
                        loader: 'pug-loader'
                    }]
                }, {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'image/[name].[hash:8].[ext]',
                            fallback: 'file-loader'
                        }
                    }]
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    common: {
                        chunks: "initial",
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /\/node_modules\//,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.scss'],
            alias: {
                '~': path.resolve(__dirname, '../src')
            }
        },


        plugins: [
            new webpack.BannerPlugin(`Spark created at ${new Date()} \n`),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../static'),
                to: path.resolve(__dirname, '../dist/static')
            }]),
            new MiniCssExtractPlugin({
                filename: "css/[name].[hash:8].css",
                chunkFilename: "css/[id].[name].[chunkhash:8].css"
            }),
            new webpack.DefinePlugin({
                'INTERFACE': JSON.stringify(process.env)
            }),
            ...plugins
        ]
    }
}