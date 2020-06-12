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

        // To store the connection callback
        this.connectionCallback = null;

        // Error response to be returned 
        // in case of default error
        this.errResponse = {
            code: "ERR-CONNECTION-REFUSED",
            message: "Apollo is not connected to server. Check internet connection."
        }

        // Setup list for events
        this.otherEvents = ["setDevicesList"];
        this.deviceEvents = ["setDeviceSummary", "setDeviceParms", "setDeviceName", "setDeviceStatus"];
    }

    // To initialize the connection
    async init(auth) {
        // Before starting the connection
        // verify that either the user is authenticated
        // or not using the auth object provided in args
        // Start the Connection

        try {
            var res = await auth.ping();

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
                    
                    // Setup error response
                    this.errResponse = {
                        code: "AUTH-UNAUTHORIZED",
                        message: "You are not authenticated to the server."
                    }
                    return; 
            }
        }
        catch(err) {
            // Internet connectivity issue
            // so try to reconnect in a while
            this.reconnect(auth);

            // Setup default error
            this.errResponse = {
                code: "ERR-CONNECTION-REFUSED",
                message: "Apollo is not connected to server. Check internet connection."
            }
            return;
        }
        
        // When connection opened with the server
        this.ws.onopen = () => {
            // Set status to connected
            this.status = "CONNECTED";

            // Notify user about the change
            if (this.connectionCallback) 
                this.connectionCallback(this.status);

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

            // Notify user about the change
            if (this.connectionCallback) 
                this.connectionCallback(this.status);

            // Clear ping
            clearInterval(this.ping);

            // Retry connection after a while
            this.reconnect(auth)

            // Setup default error
            this.errResponse = {
                code: "ERR-CONNECTION-REFUSED",
                message: "Apollo is not connected to server. Check internet connection."
            }
        }

        this.ws.onmessage = (message) => {
            // When a message is received from the server on duplex
            var data = JSON.parse(message.data);
            
            // Raise user event
            if (data.header.task === "update") {
                // Got an update a subscribed topic
                if (this.deviceEvents.includes(data.payload.event)) {
                    // If event is of device type
                    if (this.subscriptions[`${data.payload.event}/${data.payload.deviceID}`]) {
                        // Handler is defined for the event type
                        // so execute the callback
                        this.subscriptions[`${data.payload.event}/${data.payload.deviceID}`](data.payload.update);
                    }
                }
                else {
                    // otherwise
                    if (this.subscriptions[data.payload.event]) {
                        // Handler is defined for the event type
                        // so execute the callback
                        this.subscriptions[data.payload.event](data.payload.update);
                    }
                }
            }
            else {
                // Got response for a task
                if(this.eventQueue[data.header.id]){
                    // All messages other than subscription are passed to the event queue
                    this.eventQueue[data.header.id].resolve(data.payload);
    
                    // Deleting the callback function from event queue
                    delete this.eventQueue[data.header.id];
                }
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

    onConnection(callback) {
        // This function will take the 
        // callback from use and will set
        // it to context so that
        // a the user could be notified
        // about possible connection changes
        this.connectionCallback = callback;

        // and return a 
        return {
            clear: () => {
                // Remove the callback
                this.connectionCallback = undefined;
            }
        }
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
                reject(this.errResponse);
            }
        });
    }

    async subscribeTopic(event, callback, deviceID) {
        // Method to subscribe to a particular device's data
        // Verify that the event is valid
        if (!(this.deviceEvents.includes(event) || this.otherEvents.includes(event))) {
            // If the event is invalid
            // then return an error through callback
            callback({
                code: "TOPIC-INVALID", 
                message: "The specified topic seems invalid."
            });

            return;
        }

        // Verify that if it is a device event
        // then device id is provided
        if (this.deviceEvents.includes(event) && !deviceID) {
            // device id is not specified
            callback({
                code: "DATA-INVALID", 
                message: "Device ID is required."
            });

            return;
        }

        // Packet
        var packet = {
            header: {
                task: 'subscribeTopic'
            }, 
            payload: {
                event: event,
                deviceID: deviceID
            }
        };

        // Send response in try catch
        try {
            // Send the request
            var res = await this.send(packet);
 
            // Add callback to subscriptions queue
            // depending upon type of event

            if (this.deviceEvents.includes(event)) {
                // If event is of device type
                this.subscriptions[`${event}/${deviceID}`] = callback;
            }
            else {
                // otherwise
                this.subscriptions[event] = callback;
            }
            
            // Return the response
            return {
                ...res, 
                clear: () => {
                    // Packet
                    var packet = {
                        header: {
                            task: 'unsubscribeTopic'
                        }, 
                        payload: {
                            event: event,
                            deviceID: deviceID
                        }
                    };

                    // Send request
                    return this.send(packet);
                }
            }
        }
        catch(error) {
            // Failed to send the request
            // return an error in the callback
            throw error;
        }
    }

}
export default duplex;