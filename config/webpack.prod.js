const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')

const paths = require('./setup')
const common = require('./webpack.common.js')
const sassOptions = require('./helpers/sass-option');

module.exports = merge(common, {
    // Set the mode to development or production
    mode: 'production',

    // Control how source maps are generated
    devtool: false,

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: sassOptions.additionalData,
                            sourceMap: false
                        }
                    }
                ],
            },
        ],
    },

    plugins: [
        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],

    // Optimization: minimize `*.js` and `*.css` files
    optimization: {
        moduleIds: "deterministic",
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10,
                    chunks: "all",
                },
            },
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})
