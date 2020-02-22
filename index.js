import auth from "./src/auth.apollo";
import storage from "./src/storage.apollo";
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

    return {
        auth: () => new auth(apolloConfig),
        storage: () => new storage(apolloConfig)
    }
}
export {init};