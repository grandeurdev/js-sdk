// This class is used to
// get the required device 
// features of Grandeur Apollo i.e
// To pair device

class data {
    // Constructor
    constructor(handlers, deviceID) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;

        // Setup device ID to context
        this.deviceID = deviceID;
    }

    get(path) {
        // Method to list all devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/device/data/get'
            },
            payload: {
                deviceID: this.deviceID,
                path: path
            }
        });
    }

    set(path, data) {
        // Method to count all online devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/device/data/set'
            },
            payload: {
                deviceID: this.deviceID,
                path: path,
                data: data
            }
        });
    }

    on(path, callback) {
        // Method to get updates whenever a devices
        // paired or unpaired
        return this.duplex.subscribe("data", callback, this.deviceID, path);
    }
}

//Class
class device {
    // Constructor
    constructor(handlers, deviceID) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;

        // Setup device ID to context
        this.deviceID = deviceID;
    }

    pair() {
        // Method to send request for pairing a device with this User ID
        return this.duplex.send( {
            header: {
                task: "/device/pair"
            },
            payload: {
                deviceID: this.deviceID
            }
        });
    }

    unpair() {
        // Method to unpair a device from the user ID
        return this.duplex.send( {
            header: {
                task: "/device/unpair"
            },
            payload: {
                deviceID: this.deviceID
            }
        });
    }

    get(path) {
        // Method to request a particular device's details
        return this.duplex.send( {
            header: {    
                task: '/device/get'
            },
            payload: {
                deviceID: this.deviceID,
                path: path
            }
        });
    }

    set(path, data) {
        // Method to update a particular device's name
        return this.duplex.send( {
            header: {    
                task: '/device/set'
            },
            payload: {
                deviceID: this.deviceID,
                path: path,
                data: data
            }
        });
    }

    on(event, callback) {
        // Method to get updates whenever device name or data gets a change
        return this.duplex.subscribe(event, callback, this.deviceID);
    }

    data() {
        // Operation is required to be performed on a device data
        return new data({post: this.post, duplex: this.duplex}, this.deviceID);
    }

    getSummary() {
        // Method to request a particular device's summary
        return this.duplex.send( {
            header: {    
                task: '/device/summary/get'
            },
            payload: {
                deviceID: this.deviceID
            }
        });
    }

    getParms() {
        // Method to request a particular device's parms
        return this.duplex.send( {
            header: {    
                task: '/device/parms/get'
            },
            payload: {
                deviceID: this.deviceID
            }
        });
    }

    setSummary(summary) {
        // Method to update a particular device's summary
        return this.duplex.send( {
            header: {    
                task: '/device/summary/set'
            },
            payload: {
                deviceID: this.deviceID,
                summary: summary
            }
        });
    }

    setParms(parms) {
        // Method to update a particular device's parms
        return this.duplex.send( {
            header: {    
                task: '/device/parms/set'
            },
            payload: {
                deviceID: this.deviceID,
                parms: parms
            }
        });

    }

    onSummary(callback) {
        // Method to get updates whenever summary of a 
        // device gets updated
        return this.duplex.subscribe("deviceSummary", callback, this.deviceID);
    }

    onParms(callback) {
        // Method to get updates whenever parms of a 
        // device gets updated
        return this.duplex.subscribe("deviceParms", callback, this.deviceID);
    }
}

class devices {
    // Constructor
    constructor(handlers) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;
    }

    get(filter) {
        // Method to list all devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/devices/get'
            },
            payload: {
                filter: filter
            }
        });
    }

    count(filter) {
        // Method to count all online devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/devices/count'
            },
            payload: {
                filter: filter
            }
        });
    }

    on(callback) {
        // Method to get updates whenever a devices
        // paired or unpaired
        return this.duplex.subscribe("devices", callback);
    }

    device(deviceID) {
        // Operation is required to be performed on a device
        return new device({post: this.post, duplex: this.duplex}, deviceID);
    }
}
export default devices;