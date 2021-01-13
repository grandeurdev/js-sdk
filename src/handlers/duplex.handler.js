// This is the most important class 
// of Grandeur. This 
// handles the real time connectivity.

// Import the event emitter class
import { EventEmitter } from 'events';

// Class
class duplex {
    // Constructor
    constructor(config){
        // Server URL to send upgrade requests
        this.node = config.node + "?apiKey=" + config.apiKey;
        
        // Event queue object to handle callbacks
        // on Response
        this.tasks = new EventEmitter();

        // User subscriptions object to handle
        // user subscriptions
        this.subscriptions = new EventEmitter();
        
        // To check the status of Connection
        this.status = "CONNECTING";

        // To store the connection callback
        this.cConnection = null;

        // Queue to store packets
        this.queue = [];

        // Setup list for events
        this.userEvents = ["devices"];
        this.deviceEvents = ["deviceSummary", "deviceParms", "name", "status", "data"];
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
                    this.setStatus("AUTH-UNAUTHORIZED");

                    // Flush queue
                    this.flush();

                    return; 

                case "SIGNATURE-INVALID": 
                    // Signature is invalid
                    // Don't reconnect
                    
                    // Setup error response
                    this.setStatus("SIGNATURE-INVALID");

                    // Flush queue
                    this.flush();

                    return; 
            }
        }
        catch(err) {
            // Internet connectivity issue
            // so try to reconnect in a while
            this.reconnect(auth);

            // Setup default error
            this.setStatus("CONNECTION-REFUSED");

            // Flush queue
            this.flush();

            return;
        }
        
        // When connection opened with the server
        this.ws.onopen = () => {
            // Set status to connected
            this.setStatus("CONNECTED");

            // Notify user about the change
            if (this.cConnection) 
                this.cConnection("CONNECTED");

            // Start Ping
            this.ping = setInterval(() => {
                // Send packet to server
                var packet = {header: {id: 'ping', task: 'ping'},payload:{}};
                this.ws.send(JSON.stringify(packet));
            }, 25000);

            // Handle queued packets
            this.handle();
        }

        // When connection closed with the server
        this.ws.onclose = () => {
            // Set the status to connecting
            this.setStatus("CONNECTING");

            // Notify user about the change
            if (this.cConnection) 
                this.cConnection("DISCONNECTED");

            // Clear ping
            clearInterval(this.ping);

            // Retry connection after a while
            this.reconnect(auth);
        }

        this.ws.onmessage = (message) => {
            // When a message is received from the server on duplex
            var data = JSON.parse(message.data);
            
            // Raise user event
            if (data.header.task === "update") {
                // Got an update a subscribed topic
                if (this.deviceEvents.includes(data.payload.event)) {
                    // If event is of device type then get topic
                    var topic = `${data.payload.deviceID}/${data.payload.event}${data.payload.path ? `/${data.payload.path}` : ""}`;

                    // Then check the event type
                    if (data.payload.event === "data") {
                        // Loop over the list of topics
                        this.subscriptions.eventNames().forEach(sub => {
                            // Emit event where ever there is a possible match
                            if (topic.match(new RegExp(sub))) {
                                // Send update on the sub 
                                this.subscriptions.emit(sub, data.payload.update, data.payload.path);
                            }
                        });
                    }
                    else {
                        // Validate the event and emit
                        if (this.subscriptions.eventNames().includes(topic)) {
                            // Handler is defined for the event type
                            // so execute the callback
                            this.subscriptions.emit(topic, data.payload.update);
                        }
                    }
                }
                else {
                    // otherwise
                    if (this.subscriptions.eventNames().includes(data.payload.event)) {
                        // Handler is defined for the event type
                        // so execute the callback
                        this.subscriptions.emit(data.payload.event, data.payload.update);
                    }
                }
            }
            else {
                // Got response for a task
                if(this.tasks.eventNames().includes(data.header.id.toString())) {
                    // Fire event
                    this.tasks.emit(data.header.id, data.payload);
                }
            }
        }
    }

    reconnect(auth) {
        // This function will call the
        // init event again with the auth
        // object after certain time

        // If the connection was disposed then don't reconnect
        if (this.status === "DISPOSED") return;

        // Start timer
        this.recon = setTimeout(() => {
            // Set status
            this.setStatus("CONNECTING");

            // Call init again
            this.init(auth);

        }, 5000);
    }

    setStatus(status) {
        // Function to set status

        // Prevent setting status if the connection was disposed
        if (this.status === "DISPOSED") return;

        // Set
        this.status = status;
    }

    dispose() {
        // The function will close the duplex
        if (this.status === "CONNECTED") {
            // Also close the connection
            this.ws.close();
        }

        // Set status to disposed
        this.setStatus("DISPOSED");

        // Clear timeout
        clearTimeout(this.recon);
    }

    onConnection(callback) {
        // This function will take the 
        // callback from use and will set
        // it to context so that
        // a the user could be notified
        // about possible connection changes
        this.cConnection = callback;

        // and return a 
        return {
            clear: () => {
                // Remove the callback
                this.cConnection = undefined;
            }
        }
    }

    handle() {
        // This function handles all the packets
        // queued while the duplex was connecting

        while (this.queue.length > 0) {
            // Pop a packet
            var packet = this.queue.pop();

            // Then emit send the packet
            this.ws.send(JSON.stringify(packet));
        }
    }

    flush() {
        // This function flushes the event
        // queue of the duplex. Loop over the queue

        while (this.queue.length > 0) {
            // Pop a packet
            var packet = this.queue.pop();

            // Then emit event and throw error
            this.tasks.emit(packet.header.id, undefined, {
                code: this.status
            });
        }
    }

    send(packet) {
        // Create promise 
        return new Promise((resolve, reject) => {
            //  If the connection is not borked
            if (this.status !== "SIGNATURE-INVALID" && this.status !== "DISPOSED") {
                // Generate unique ID for the request
                var id = Date.now();

                // Append ID to header
                packet.header.id = id;

                // Attach an event listener
                this.tasks.once(id, (res, err) => {
                    // Reject if error has been returned
                    if (err) return reject(err);

                    // Resolve the promise
                    resolve(res);
                });

                // If Connected to server
                if (this.status === "CONNECTED")
                    // Then send packet right away if 
                    this.ws.send(JSON.stringify(packet));
                
                else 
                    // Otherwise store the packet into a queue
                    this.queue.push(packet);
            }
            else {
                // Otherwise return a rejection
                reject({
                    code: this.status
                });
            }
        });
    }

    async subscribe(event, callback, deviceID, path) {
        // Method to subscribe to a particular device's data
        // Verify that the event is valid
        if (!(this.deviceEvents.includes(event) || this.userEvents.includes(event))) {
            // If the event is invalid
            // then return an error through callback
            callback({
                code: "TOPIC-INVALID"
            });

            return;
        }

        // Verify that if it is a device event
        // then device id is provided
        if (this.deviceEvents.includes(event) && !deviceID) {
            // device id is not specified
            callback({
                code: "DATA-INVALID"
            });

            return;
        }

        // Packet
        var packet = {
            header: {
                task: '/topic/subscribe'
            }, 
            payload: {
                event: event,
                deviceID: deviceID,
                path: path
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
                this.subscriptions.on(`${deviceID}/${event}${path ? `/${path}` : ""}`, callback);
            }
            else {
                // otherwise
                this.subscriptions.on(event, callback);
            }
            
            // Return the response
            return {
                ...res, 
                clear: () => {
                    // Packet
                    var packet = {
                        header: {
                            task: '/topic/unsubscribe'
                        }, 
                        payload: {
                            event: event,
                            deviceID: deviceID,
                            path: path
                        }
                    };

                    // Remove event listener
                    if (this.deviceEvents.includes(event)) {
                        // If event is of device type
                        this.subscriptions.removeListener(`${deviceID}/${event}${path ? `/${path}` : ""}`, callback);
                    }
                    else {
                        // otherwise
                        this.subscriptions.removeListener(event, callback);
                    }

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