const path = require("path");

// Function to generate configurations
module.exports = {
  entry: {
    grandeur: "./index.js",
    "grandeur-react": "./distributions/react.js",
  },
  mode: "production",
  devServer: {
    static: "./",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {},
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "grandeur",
    libraryTarget: "umd",
    globalObject: "this",
  },
};
