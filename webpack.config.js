//webpack.config.js
const path = require('path')

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/client.ts",
    },
    output: {
        library: ['RemoteDom'],
        path: path.resolve(__dirname, './dist'),
        filename: "[name]-bundle.js" // <--- Will be compiled to this single file
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
            "fs": false,
            "tls": false,
            "url": false,
            "util": false,
            "buffer": false,
            "querystring": false,
            "async_hooks": false,
            "string_decoder": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
}