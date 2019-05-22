const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.base')
const merge = require('webpack-merge')
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()
module.exports = function(env, argv) {
    return merge(common(env, argv), {
        mode: 'development',
        output: {
            filename: 'js/[name].[hash:8].js',
            publicPath: '/',
            path: path.resolve(__dirname, `../${argv.dt || 'dist'}`),
            chunkFilename: 'js/[name].[chunkhash:8].js',
        },

        devtool: 'inline-source-map',
        optimization: {
            minimize: false
        },
        devServer: {
            host: 'localhost',
            contentBase: path.resolve(__dirname, `../${argv.dt || 'dist'}`),
            port: 8080,
            quiet: true,
            open: false,
            hot: true
        },

        plugins: [
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': '"development"'
            // }),
            new webpack.HotModuleReplacementPlugin(),
            new DashboardPlugin(dashboard.setData)
        ]
    })
}