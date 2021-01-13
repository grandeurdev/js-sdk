// Support classes
import auth from "./src/auth";
import storage from "./src/storage";
import devices from "./src/devices";
import datastore from "./src/datastore";

// Handlers
import post from "./src/handlers/post.handler";
import duplex from "./src/handlers/duplex.handler";

// The main config object to stores the
// base urls of the Grandeur Server
const config = {
    url: "https://trex.dev.api.grandeur.tech",
    node: "wss://trex.dev.api.grandeur.tech"
}

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
        storage: () => new storage(handlers),
        devices: () => new devices(handlers),
        datastore: () => new datastore(handlers)
    }
}