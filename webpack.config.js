const path = require("path");

// Function to generate configurations
const config = (bundle, target) => ({
    target: "web",
    entry: "./index.js",
    mode: "production",
    devServer: {
        static: './dist',
    },
    resolve: {
        
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: bundle,
        library: "grandeur",
        libraryTarget: target,
        globalObject: "this"
    }
})

module.exports = [
    config("grandeur.js", "commonjs2"),
    config("grandeur.umd.js", "umd")
]