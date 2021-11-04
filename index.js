// Support classes
import auth from "./src/auth";
import devices from "./src/devices";
import datastore from "./src/datastore";

// Handlers
import post from "./src/handlers/post.handler";
import duplex from "./src/handlers/duplex.handler";

// The main config object to stores the
// base urls of the Grandeur Server
const config = {
    url: "https://api.grandeur.tech",
    node: "wss://api.grandeur.tech"
}

// Object will store the extensions which
// be then included in the init
var extensions = {}

// Function that initializes 
// the object
export function init(apiKey, accessKey, accessToken) {
    // Returns a Object with a refernce to
    // Grandeur Supported Classes
    const grandeurConfig = {...config, apiKey, accessKey, accessToken}

    // Post Handler
    const postHandler = new post(grandeurConfig);

    // Duplex Handler
    const duplexHandler = new duplex(grandeurConfig);
    
    // Handlers
    const handlers = {
        post: postHandler,
        duplex: duplexHandler
    };

    // Initialize the Connection
    // to the Server
    duplexHandler.init(new auth(handlers));

    // Forumlate the plugins
    var plugins = {}

    // Loop over the provided extensions and add to plugins
    Object.keys(extensions).map( extension => plugins[extension] = () => new extensions[extension](handlers) )

    // Return reference to the classes
    return {
        // Helper Method
        isConnected: () => handlers.duplex.status === "CONNECTED",
        onConnection: (callback) => handlers.duplex.onConnection(callback),
        dispose: () => {
            handlers.duplex.dispose();
            handlers.post.dispose();
        },

        // Classes
        auth: () => new auth(handlers),
        devices: () => new devices(handlers),
        datastore: () => new datastore(handlers),
        
        // Include plugins
        ...plugins
    }
}

// Function can be used to add extensions to the SDK
export function extend(plugins) {
    // Include the extensions in the global object
    extensions = plugins;
}