const path = require('path')

module.exports = {
    // Source files
    src: path.resolve(__dirname, '../src'),

    // Production build files
    build: path.resolve(__dirname, '../build'),

    // `html` file and Static resources
    public: path.resolve(__dirname, '../public'),

    // Static files that get copied to build folder
    static: path.resolve(__dirname, '../public/static'),
}
