const path = require('path')
const common = require('./webpack.base')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env) {
    return merge(common(env), {
        mode: 'production',
        output: {
            filename: 'js/[name].[hash:8].js',
            publicPath: './',
            path: path.resolve(__dirname, '../dist'),
            chunkFilename: 'js/[name].[chunkhash:8].js',
            /* 输出umd模块 */
            // library: "friendly",
            // libraryTarget: "umd"
        },
        optimization: {
            minimize: true,
            minimizer: [
                // 自定义js优化配置，将会覆盖默认配置
                new UglifyJsPlugin({
                    exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                    cache: true,
                    parallel: true, // 开启并行压缩，充分利用cpu
                    sourceMap: false,
                    uglifyOptions: {
                        compress: {
                            unused: true,
                            drop_debugger: true
                        },
                        output: {
                            comments: true
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessorOptions: {
                        safe: true,
                        autoprefixer: {
                            disable: true
                        },
                        mergeLonghand: false,
                        discardComments: {
                            removeAll: true // 移除注释
                        }
                    },
                    canPrint: true
                })
            ]
        },
        plugins: [
            new ClearWebpackPlugin(),

            new ProgressBarPlugin({
                format: 'build [:bar] :percent (:elapsed seconds)',
                clear: true,
                width: 60
            })
        ]
    })
}