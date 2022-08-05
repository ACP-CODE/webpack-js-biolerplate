const paths = require('./setup');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Custom `html-webpack-plugin`
const htmlWebpackPlugin = require('./helpers/html-webpack-plugin');

module.exports = merge(htmlWebpackPlugin, {
    entry: {
        app: [paths.src + '/js/index.js',]
    },

    output: {
        path: paths.build,
        filename: 'assets/js/[name].js?v=[hash:10]',
        publicPath: '/',
    },

    /* Asset Modules type replaces all of these loaders by adding 4 new module types:
        1. `asset/resource` emits a separate file and exports the URL. Previously achievable by using `file-loader`.
        2. `asset/inline` exports a data URI of the asset. Previously achievable by using `url-loader`.
        3. `asset/source` exports the source code of the asset. Previously achievable by using `raw-loader`
        4. `asset` automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using `url-loader` with asset size limit.
    Reference: https://webpack.js.org/guides/asset-modules/ */
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                }
            },
        ],
    },

    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
        },
    },

    plugins: [

        // Webpack `ProgressPlugin`
        new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            // handler(percentage, message, ...args) {
            //   // custom logic
            //   console.info(percentage, message, ...args);
            // },
            modules: true,
            modulesCount: 5000,
            profile: false,
            dependencies: true,
            dependenciesCount: 10000,
            percentBy: null,
        }),

        // Webpack `ProgressPlugin`
        new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            // handler(percentage, message, ...args) {
            //   // custom logic
            //   console.info(percentage, message, ...args);
            // },
            modules: true,
            modulesCount: 5000,
            profile: false,
            dependencies: true,
            dependenciesCount: 10000,
            percentBy: null,
        }),

        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.build,
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],

});