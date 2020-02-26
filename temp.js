
class duplexHandler {
    
    constructor() {
        // Server URL to send UPGRADE requests to
        this.url = apollo.getConfig()['duplex'];
        // User's methods handler object
        this.handler = {};
        // The Event Queue object to handle callbacks on response
        this.eventQueue = {
            logout: (message) => {
                console.log(message);
            }
        };
        // User subscriptions handler object
        this.subscriptions = {};
        // Reference object to datastore
        this.datastore = {};
    }

    start() {
        // Start the Connection
        // A websocket object
        this.ws  = new WebSocket(this.url , 'node');
        this.datastore = new datastore(this.ws, this.eventQueue);
        
        this.ws.onopen = () => {
            // When duplex connection is opened with the server (client is connected to the server via duplex)
            if(this.handler['onConnected'] != undefined) {
                this.handler['onConnected']();
            }
        }

        
        this.ws.onclose = (res) => {
            // When duplex connection is closed
            if(this.handler['onDisconnected'] != undefined) {
                this.handler['onDisconnected'](res);
            }
        }
        
        
        this.ws.onmessage = (message) => {
            // When a message is received from the server on duplex
            var data = JSON.parse(message.data);

            if(data.header.task == 'subscribe') {
                // All subscription messages are handled here
                if(data.payload.event != undefined) {
                    this.subscriptions[data.payload.event](data);
                }
                else {
                    console.log(data);
                }
            }
            else {
                if(this.eventQueue[data.header.id] != undefined) {
                    // All messages other than subscription are passed to the event queue
                    this.eventQueue[data.header.id](data);
                    // Deleting the callbacked function from event queue
                    delete this.eventQueue[data.header.id];
                }
            }
        }
    }

    onConnected(callback) {
        // Method called when the duplex connection is opened
        this.handler['onConnected'] = callback;
    }

    onDisconnected(callback) {
        // Method called when the duplex connection is closed
        this.handler['onDisconnected'] = callback;
    }

    ping(message, callback) {
        // Method to ping the server from time to time to keep the connection alive
        // A unique ID for each packet
        var id = Date.now();
        var packet = {header: {id: id, task: 'ping'}, payload: message};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    unpairDevice(data, callback) {
        // Method to unpair a device from a user ID
        var id = Date.now();
        var packet = {
              header: {
                 id: id, 
                 task: 'unpairDevice'
              }, 
              payload: data
        };
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    getUserDevices(callback) {
        // Method to list all devices paired to user ID
        var id = Date.now();
        var packet = {header: {id: id, task: 'getUserDevices'}};
        this.ws.send(JSON.stringify(packet));
        this.eventQueue[id] = callback;
    }

    getOnlineDevicesCount(callback) {
        // Method to count all online devices paired to user ID
        var id = Date.now();
        var packet = {header: {id: id, task: 'getOnlineDevicesCount'}};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    getDeviceSummary(data, callback) {
        // Method to request a particular device's summary
        var id = Date.now();
        var packet = {
            header: {
                id: id,
                task: 'getDeviceSummary'
            }, 
            payload: data
        };
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    getDeviceParms(data, callback) {
        // Method to request a particular device's parms
        var id = Date.now();
        var packet = {
            header: {
                id: id, 
                task: 'getDeviceParms'
            }, 
            payload: data
        };
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    setDeviceSummary(data, callback) {
        // Method to update a particular device's summary
        var id = Date.now();
        var packet = {header: {id: id, task: 'setDeviceSummary'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    setDeviceParms(data, callback) {
        // Method to update a particular device's parms
        var id = Date.now();
        var packet = {header: {id: id, task: 'setDeviceParms'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    getDeviceDetails(data, callback) {
        // Method to request a particular device's details
        var id = Date.now();
        var packet = {header: {id: id, task: 'getDeviceDetails'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    setDeviceName(data, callback) {
        // Method to update a particular device's name
        var id = Date.now();
        var packet = {header: {id: id, task: 'setDeviceName'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    getDeviceStatus(data, callback) {
        // Method to request a particular device's online status
        var id = Date.now();
        var packet = {header: {id: id, task: 'getDeviceStatus'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    subscribeTopic(data, callback) {
        // Method to subscribe to a particular device's data
        var packet = {header: {task: 'subscribeTopic'}, payload: data};
        this.ws.send(JSON.stringify(packet));

        this.subscriptions[data.event] = callback;

        return () => {
            var id = Date.now();
            var packet = {header: {id: id, task: 'unsubscribeTopic'}, payload: data};
            this.ws.send(JSON.stringify(packet));

            this.eventQueue[id] = callback;
        }
    }

    getSubscribedTopics(callback) {
        // Method to fetch a list of user's subscribed topics
        var id = Date.now();
        var packet = {header: {id: id, task: 'getSubscribedTopics'}};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    unsubscribeAllTopics(callback) {
        // Method to unsubscribe to all the devices currently subscribed by the user
        var id = Date.now();
        var packet = {header: {id: id, task: 'unsubscribeAllTopics'}};
        this.ws.send(JSON.stringify(packet));

        this.eventQueue[id] = callback;
    }

    logout() {
        // Method to request a forced closing of duplex connection by the user
        var packet = {header: {id: 'logout', task: 'logout'}};
        this.ws.send(JSON.stringify(packet));
    }
}