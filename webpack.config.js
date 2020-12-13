const path = require("path");

module.exports = {
    entry: "./index.js",
    mode: "production",
    devServer: {
        contentBase: './dist',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "grandeur.js",
        library: "grandeur",
        libraryTarget: "umd",
        globalObject: 'this'
    }
}