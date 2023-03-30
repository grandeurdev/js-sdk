// Imports
const path = require("path");


// For node js
const node = {

	// We will start with the index file
	entry: {
		"grandeur-cjs": "./index.js"
	},

	// Target is node enviroments
	target: "node",

	// Configuration about output
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: "grandeur",
		libraryTarget: "umd",
		globalObject: "this"
	},

	mode: "production"
};

// For react and browser
const browser = {

	// We will parse both index and react distribution
	entry: {
		grandeur: "./index.js",
		"grandeur-react": "./distributions/react.js",
	},

	// Target for browsers
	target: "web",

	// Output configurations
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: "grandeur",
		libraryTarget: "umd",
		globalObject: "this"
	},

	// Plugin to parse the react component
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
						options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			},
		]
	},

	mode: "production"
};

// Function to generate configurations
module.exports = () => {
	
	// And return the configurations
	return [node, browser];
};
