const path = require('path')
const common = require('./webpack.base')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const pl = []
if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
   pl.push(new BundleAnalyzerPlugin())
}
module.exports = function(env, argv) {
    return merge(common(env, argv), {
        mode: 'production',
        output: {
            filename: 'js/[name].[hash:8].js',
            publicPath: './',
            path: path.resolve(__dirname, `../${argv.dt || 'dist'}`),
            chunkFilename: 'js/[name].[chunkhash:8].js',
            /* 输出umd模块 */
            // library: "test",
            // libraryTarget: "umd"
        },
        optimization: {
            minimize: true,
            minimizer: [
                // 自定义js优化配置，将会覆盖默认配置
                new UglifyJsPlugin({
                    exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件
                    cache: true,
                    parallel: true, // 开启并行压缩，充分利用cpu
                    sourceMap: false,
                    extractComments: false, // 是否提取注释到单独的文件
                    uglifyOptions: {
                        compress: {
                            unused: true,
                            drop_debugger: true
                        },
                        output: {
                            comments: /spark/gi
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
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': '"production"'
            // }),
            new ProgressBarPlugin({
                format: 'build [:bar] :percent (:elapsed seconds)',
                clear: true,
                width: 60
            }),
            ...pl
        ]
    })
}