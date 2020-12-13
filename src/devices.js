// This class is used to
// get the required device 
// features of Grandeur Apollo i.e
// To pair device

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

    getDetails() {
        // Method to request a particular device's details
        return this.duplex.send( {
            header: {    
                task: '/device/details/get'
            },
            payload: {
                deviceID: this.deviceID
            }
        });
    }

    setName(deviceName) {
        // Method to update a particular device's name
        return this.duplex.send( {
            header: {    
                task: '/device/name/set'
            },
            payload: {
                deviceID: this.deviceID,
                deviceName: deviceName
            }
        });
    }

    getStatus() {
        // Method to request a particular device's online status
        return this.duplex.send( {
            header: {    
                task: '/device/status/get'
            },
            payload: {
                deviceID: this.deviceID
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

    onName(callback) {
        // Method to get updates whenever name of a 
        // device gets updated
        return this.duplex.subscribe("deviceName", callback, this.deviceID);
    }

    onStatus(callback) {
        // Method to get updates whenever status of a 
        // device gets updated
        return this.duplex.subscribe("deviceStatus", callback, this.deviceID);
    }
}

class devices {
    // Constructor
    constructor(handlers) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;
    }

    list() {
        // Method to list all devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/devices/list/get'
            }
        });
    }

    onlineCount() {
        // Method to count all online devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: '/devices/onlineCount/get'
            }
        });
    }

    onList(callback) {
        // Method to get updates whenever a devices
        // paired or unpaired
        return this.duplex.subscribe("devicesList", callback);
    }

    device(deviceID) {
        // Operation is required to be performed on a device
        return new device({post: this.post, duplex: this.duplex}, deviceID);
    }
}
export default devices;