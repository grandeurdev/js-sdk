// Support classes
import auth from "./src/auth";
import user from "./src/user";
import devices from "./src/devices";

// Handlers
import post from "./src/handlers/post.handler";
import duplex from "./src/handlers/duplex.handler";

// The main config object to stores the
// base urls of the Grandeur Server
const options = {
	url: "https://api.grandeur.tech",
	node: "wss://api.grandeur.tech",
};

// Object will store the extensions which
// be then included in the init
var extensions = {};

// Function that initializes
// the object
export function init(apiKey, secretKey, overrides) {

	// Fetch token from storage and add it to context
	if (typeof window !== "undefined") var token = localStorage.getItem(`grandeur-auth-${apiKey}`);

	// Returns a Object with a refernce to
	// Grandeur Supported Classes
	const config = { apiKey, secretKey, token: overrides?.token || token, url: overrides?.url || options.url, node: overrides?.node || options.node };
	
	// Post Handler
	const postHandler = new post(config);

	// Duplex Handler
	const duplexHandler = new duplex(config, new auth({ post: postHandler }));

	// Handlers
	const handlers = {
		post: postHandler,
		duplex: duplexHandler,
	};

	// Initialize the Connection
	// to the Server
	duplexHandler.init();

	// Forumlate the plugins
	var plugins = {};

	// Loop over the provided extensions and add to plugins
	Object.keys(extensions).map((extension) => (plugins[extension] = () => new extensions[extension](handlers)));

	// Return reference to the classes
	return {
		// Helper Method
		isConnected: () => handlers.duplex.status === "CONNECTED",
		on: (callback) => handlers.duplex.onConnection(callback),
		dispose: () => {
			handlers.duplex.dispose();
			handlers.post.dispose();
		},

		// Classes
		auth: () => new auth(handlers),
		user: () => new user(handlers),
		devices: () => new devices(handlers),

		// Include plugins
		...plugins,
	};
}

// Function can be used to add extensions to the SDK
export function extend(plugins) {
	// Include the extensions in the global object
	extensions = plugins;
}
