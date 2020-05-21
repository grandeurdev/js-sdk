const path = require("path");

module.exports = {
    entry: "./index.js",
    mode: "production",
    devServer: {
        contentBase: './dist',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "apollo.js",
        library: "apollo",
        libraryTarget: "umd"
    }
}