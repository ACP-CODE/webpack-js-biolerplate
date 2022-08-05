const webpack = require('webpack');
const { merge } = require('webpack-merge');

const BrowserSyncPlugin = require('./helpers/brower-sync-plugin');
const dev = require('./webpack.dev.js');

module.exports = merge(dev, BrowserSyncPlugin, {
});