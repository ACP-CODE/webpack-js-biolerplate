var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = { 
    plugins:[
        // Broswer Sync
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:4040/'
        })
    ]
}