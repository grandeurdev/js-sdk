// This is the most important class 
// of Grandeur Cloud. This 
// handles the real time connectivity.

// Class
class duplex {
    // Constructor
    constructor(config){
        // Server URL to send upgrade requests
        this.node = config.node + "?apiKey=" + config.apiKey;
        
        // Event queue object to handle callbacks
        // on Response
        this.eventQueue = { };

        // User subscriptions object to handle
        // user subscriptions
        this.subscriptions = {};
        
        // To check the status of Connection
        this.status = "DISCONNECTED";
    }

    // To initilize the connection
    async init(auth) {
        // Before starting the connection
        // verify that either the user is authenticated
        // or not using the auth object provided in args
        // Start the Connection

        try {
            var res = await auth.isAuthenticated();

            // Got the response
            switch(res.code) {
                case "AUTH-AUTHORIZED": 
                    // User is authenticated
                    // so try to connect to the duplex
                    this.ws  = new WebSocket(this.node , "node");
                    break;

                case "AUTH-UNAUTHORIZED": 
                    // User is not Authenticated
                    // try to reconnect after some time
                    this.reconnect(auth);      
                    return; 
            }
        }
        catch(err) {
            // Internet connectivity issue
            // so try to reconnect in a while
            this.reconnect(auth);
            return;
        }
        
        // When conenction opened with the server
        this.ws.onopen = () => {
            // Set status to connected
            this.status = "CONNECTED";

            // Start Ping
            this.ping = setInterval(() => {
                // Send packet to server
                var packet = {header: {id: 'ping', task: 'ping'},payload:{}};
                this.ws.send(JSON.stringify(packet));
            }, 25000)
        }

        // When connection closed with the server
        this.ws.onclose = () => {
            // Set the status to disconnected
            this.status = "DISCONNECTED";

            // Clear ping
            clearInterval(this.ping);

            // Retry connection after a while
            this.reconnect(auth)
        }

        this.ws.onmessage = (message) => {
            // When a message is received from the server on duplex
            var data = JSON.parse(message.data);
            
            // Raise user event
            if(this.eventQueue[data.header.id]){
                // All messages other than subscription are passed to the event queue
                this.eventQueue[data.header.id].resolve(data.payload);

                // Deleting the callbacked function from event queue
                delete this.eventQueue[data.header.id];
            }
        }
    }

    reconnect(auth) {
        // This function will call the
        // init event again with the auth
        // object after certain time

        setTimeout(() => {
            // Call init again
            this.init(auth);
        }, 5000);
    }

    send(packet) {
        // Create promise 
        return new Promise((resolve, reject) => {
            // If Connected to the server
            if (this.status === "CONNECTED") {
                // Generate unique ID for the request
                var id = Date.now();

                // Append ID to header
                packet.header.id = id;

                // Save promise in the event queue
                // so that event could be raised whenever
                // response will be received in the onmessage
                this.eventQueue[id] = {
                    resolve: resolve,
                    reject: reject
                }

                // Send packet
                this.ws.send(JSON.stringify(packet));
            }
            else {
                // Otherwise return a rejection
                reject({
                    code: "ERR-CONNECTION-REFUSED", 
                    message: "Apollo is not connceted to server. Check internet connection or make sure that you are authenticated to the server."
                });
            }
        });
    }
    subscribeTopic(data, callback) {
        // Method to subscribe to a particular device's data
        var packet = {
            header: {
                task: 'subscribeTopic'
            }, 
            payload: data
        };
        this.ws.send(JSON.stringify(packet));

        // Add callback to subscriptions queue
        this.subscriptions[data.event] = callback;
        
        // Return
        return {
            clear: () => {
                var packet = {
                    header: {
                        task: 'unsubscribeTopic'
                    }, 
                    payload: data
                };
                return this.send(packet);
            }
        }
    }

}
export default duplex;