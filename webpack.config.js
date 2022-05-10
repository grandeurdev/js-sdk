const path = require("path");

// Function to generate configurations
const config = (bundle, target) => ({
    target: target,
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
        filename: bundle,
        library: "grandeur",
        globalObject: "this"
    }
})

module.exports = [
    config("grandeur-node.js", "node"),
    config("grandeur.js", "web")
]