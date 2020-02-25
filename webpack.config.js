const path = require("path");

module.exports = {
    entry: "./index.js",
    mode: "development",
    devServer: {
        contentBase: './dist',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "apollo.js",
        library: "apollo",
        libraryTarget: "var"
    }
}