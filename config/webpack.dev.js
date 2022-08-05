const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');
const sassOptions = require('./helpers/sass-option');

module.exports = merge(common, {
    // Set the mode to development or production
    mode: 'development',

    // Control how source maps are generated
    devtool: 'source-map',

    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        // contentBase: paths.build,
        open: true,
        compress: true,
        // hot: true,
        port: 8080,
    },

    module: {
        rules: [
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: sassOptions.additionalData,
                            sourceMap: true
                        }
                    }
                ],
            },
        ],
    },

    plugins: [
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),

        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],
});