// This class is used to
// get the required device 
// features of Grandeur Apollo i.e
// To pair device

//Class
class device{
    // Constructor
    constructor(handlers) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;
    }

    pairDevice(deviceID) {
        // Method to send request for pairing a device with this User ID
        return this.post.send("/devices/pairDevice", {deviceID: deviceID});
    }

    unpairDevice(deviceID) {
        // Method to unpair a device from the user ID
        return this.duplex.send( {
            header: {
                task: "unpairDevice"
            },
            payload: {
                deviceID: deviceID
            }
        });
    }
    getUserDevices() {
        // Method to list all devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: 'getUserDevices'
            }
        });
    }
    getOnlineDevicesCount() {
        // Method to count all online devices paired to user ID
        return this.duplex.send( {
            header: {    
                task: 'getOnlineDevicesCount'
            }
        });
    }
    getDeviceSummary(deviceID) {
        // Method to request a particular device's summary
        return this.duplex.send( {
            header: {    
                task: 'getDeviceSummary'
            },
            payload: {
                deviceID: deviceID
            }
        });
    }
    getDeviceParms(deviceID) {
        // Method to request a particular device's parms
        return this.duplex.send( {
            header: {    
                task: 'getDeviceParms'
            },
            payload: {
                deviceID: deviceID
            }
        });
    }
    setDeviceSummary(deviceID,summary) {
        // Method to update a particular device's summary
        return this.duplex.send( {
            header: {    
                task: 'setDeviceSummary'
            },
            payload: {
                deviceID: deviceID,
                summary: summary
            }
        });
    }
    setDeviceParms(deviceID,parms) {
        // Method to update a particular device's parms
        return this.duplex.send( {
            header: {    
                task: 'setDeviceParms'
            },
            payload: {
                deviceID: deviceID,
                parms: parms
            }
        });

    }
    getDeviceDetails(deviceID) {
        // Method to request a particular device's details
        return this.duplex.send( {
            header: {    
                task: 'getDeviceDetails'
            },
            payload: {
                deviceID: deviceID
            }
        });
    }
    setDeviceName(deviceID, deviceName) {
        // Method to update a particular device's name
        return this.duplex.send( {
            header: {    
                task: 'setDeviceName'
            },
            payload: {
                deviceID: deviceID,
                deviceName: deviceName
            }
        });
    }
    getDeviceStatus(deviceID) {
        // Method to request a particular device's online status
        return this.duplex.send( {
            header: {    
                task: 'getDeviceStatus'
            },
            payload: {
                deviceID: deviceID
            }
        });
    }

}
export default device;