const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('../setup');
/* const glob = require('glob');

let htmlTemplates = glob(paths.public + "/pages/*.html", function (er, files) {
    console.log(files);
    return files
}); */

let htmlPageNames = [];

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: paths.public + `/pages/` + `${name}.html`, // relative path to the HTML files
        inject: "body",
        minify: {
            removeComments: true,
        },
        filename: `${name}/index.html`,
        // chunks: [`${name}`] // respective JS files
    })
});

module.exports = {
    plugins: [
        /* Generates an HTML file from a template
        Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501 */
        new HtmlWebpackPlugin({
            title: 'Javascript | Webpack Boilerplate',
            favicon: paths.public + '/favicon.png',
            template: paths.public + '/index.html', // template file
            inject: "body",
            minify: {
                removeComments: true
            },
            filename: 'index.html', // output file
        }),
    ].concat(multipleHtmlPlugins),
}