const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.base')
const merge = require('webpack-merge')
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()
module.exports = function(env) {
    return merge(common(env), {
        mode: 'development',
        output: {
            filename: 'js/[name].[hash:8].js',
            publicPath: '/',
            path: path.resolve(__dirname, '../dist'),
            chunkFilename: 'js/[name].[chunkhash:8].js'
        },
        
        devtool: 'inline-source-map',
        optimization: {
            minimize: false
        },
        devServer: {
            host: 'localhost',
            contentBase: path.resolve(__dirname, '../dist'),
            port: 8080,
            quiet: true,
            open: true,
            hot: true
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new DashboardPlugin(dashboard.setData)
        ]
    })
}