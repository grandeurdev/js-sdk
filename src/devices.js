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
        // Setup payload
        var payload = {
            deviceID: this.deviceID,
            path: path
        }

        // Place request
        return this.duplex.send('/device/data/get', payload);
    }

    set(path, data) {
        // Method to count all online devices paired to user ID
        // Setup payload
        var payload = {
            deviceID: this.deviceID,
            path: path,
            data: data
        }

        // Place request
        return this.duplex.send('/device/data/set', payload);
    }

    on(path, callback) {
        // Method to get updates whenever a devices data changes
        // Setup payload
        var payload = {
            event: "data",
            path: path,
            deviceID: this.deviceID
        }

        // Place request
        return this.duplex.subscribe("data", payload, callback);
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
        // Setup payload
        var payload = {
            deviceID: this.deviceID
        }

        // Place request
        return this.duplex.send('/device/pair', payload);
    }

    unpair() {
        // Method to unpair a device from the user ID
        // Setup payload
        var payload = {
            deviceID: this.deviceID
        }

        // Place request
        return this.duplex.send('/device/unpair', payload);
    }

    get(path) {
        // Method to request a particular device's details
        // Setup payload
        var payload = {
            deviceID: this.deviceID,
            path: path
        }

        // Place request
        return this.duplex.send('/device/get', payload);
    }

    set(path, data) {
        // Method to update a particular device's name
        // Setup payload
        var payload = {
            deviceID: this.deviceID,
            path: path,
            data: data
        }

        // Place request
        return this.duplex.send('/device/set', payload);
    }

    on(event, callback) {
        // Method to get updates whenever device name or data gets a change
        // Setup payload
        var payload = {
            event: event,
            deviceID: this.deviceID
        }

        // Place request
        return this.duplex.subscribe(event, payload, callback);
    }

    data() {
        // Operation is required to be performed on a device data
        return new data({post: this.post, duplex: this.duplex}, this.deviceID);
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
        // Setup payload
        var payload = {
            filter: filter
        }

        // Place request
        return this.duplex.send('/devices/get', payload);
    }

    count(filter) {
        // Method to count all online devices paired to user ID
        // Setup payload
        var payload = {
            filter: filter
        }

        // Place request
        return this.duplex.send('/devices/count', payload);
    }

    on(callback) {
        // Method to get updates whenever a devices
        // paired or unpaired
        // Setup payload
        var payload = {
            event: "devices"
        }

        // Place request
        return this.duplex.subscribe("devices", payload, callback);
    }

    device(deviceID) {
        // Operation is required to be performed on a device
        return new device({post: this.post, duplex: this.duplex}, deviceID);
    }
}
export default devices;