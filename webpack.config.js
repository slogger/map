var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: 'dist'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.json$/,
            loader: "json"
        }]
    },
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]

};
