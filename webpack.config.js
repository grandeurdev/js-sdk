const path = require("path");

module.exports = {
    entry: "./index.js",
    mode: "production",
    devServer: {
        static: './dist',
    },
    resolve: {
        fallback: {
            "Buffer": require.resolve('buffer/'),
            "stream": require.resolve("stream-browserify")
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "grandeur.js",
        library: "grandeur",
        libraryTarget: "umd",
        globalObject: 'this'
    }
}