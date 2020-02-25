// Support classes
import auth from "./src/auth.apollo";
import storage from "./src/storage.apollo";
import device from "./src/device.apollo";

// Handlers
import post from "./src/handlers/post.handler";

// The main config object to stores the
// base urls of the Grandeur Server
const config = {
    url: "https://api.grandeur.tech",
    node: "wss://api.grandeur.tech"
}

// Function that initializes 
// the object
function init(apiKey) {
    // Returns a Object with a refernce to
    // Apollo Supported Classes
    const apolloConfig = {...config, apiKey}

    // Post Handler
    const postHandler = new post(apolloConfig);

    // Handlers
    const handlers = {
        post: postHandler
    };

    return {
        auth: () => new auth(handlers),
        storage: () => new storage(handlers),
        device: () => new device(handlers)
    }
}
export {init};