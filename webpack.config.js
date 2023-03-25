const path = require("path");
const Dotenv = require("dotenv-webpack");

const generalConfig = {
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
  plugins: [new Dotenv()],
  devtool: "source-map",
  mode: "production",
};

const nodeConfig = {
  entry: {
    "grandeur-cjs": "./index.js",
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "grandeur",
    libraryTarget: "umd",
    globalObject: "this",
  },
};

const browserConfig = {
  entry: {
    grandeur: "./index.js",
    "grandeur-react": "./distributions/react.js",
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "grandeur",
    libraryTarget: "umd",
    globalObject: "this",
  },
};

// Function to generate configurations
module.exports = () => {
  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};
