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
      path: path,
    };

    // Place request
    return this.duplex.send("/device/data/get", payload);
  }

  set(path, data) {
    // Method to count all online devices paired to user ID
    // Setup payload
    var payload = {
      deviceID: this.deviceID,
      path: path,
      data: data,
    };

    // Place request
    return this.duplex.send("/device/data/set", payload);
  }

  on(path, callback) {
    // Method to get updates whenever a devices data changes
    // Setup payload
    var payload = {
      event: "data",
      path: path,
      deviceID: this.deviceID,
    };

    // Place request
    return this.duplex.subscribe("data", payload, callback);
  }
}

class stream {
  // Constructor
  constructor(handlers, deviceID, query) {
    // Configuration
    this.post = handlers.post;
    this.duplex = handlers.duplex;

    // Store the deviceID and query
    this.deviceID = deviceID;
    this.query = query;
  }

  get(path) {
    // Push path property to the 'query' array
    this.query.push({
      path: path
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  to(condition) {
    // Method to add "to" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "to",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  from(condition) {
    // Method to add "from" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "from",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  gt(condition) {
    // Method to add "gt" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "gt",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  lt(condition) {
    // Method to add "lt" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "lt",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  gte(condition) {
    // Method to add "gte" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "gte",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  lte(condition) {
    // Method to add "lte" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "lte",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  eq(condition) {
    // Method to add "eq" filter to
    // the query and return a new pipeline
    this.query.push({
      type: "eq",
      condition: condition,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  sort(specs) {
    // Method to add sort stage to
    // the query and return a new stream
    this.query.push({
      type: "sort",
      specs: specs,
    });

    // Return a new instance of the 'stream' class
    return new stream({ post: this.post, duplex: this.duplex }, this.deviceID, this.query);
  }

  execute(nPage) {
    // Method to finally send request
    // to execute the stream
    // Setup payload
    var payload = {
      deviceID: this.deviceID,
      nPage: nPage,
      query: this.query,
    };

    // Place request
    return this.duplex.send("/device/data/stream", payload);
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
      deviceID: this.deviceID,
    };

    // Place request
    return this.duplex.send("/device/pair", payload);
  }

  unpair() {
    // Method to unpair a device from the user ID
    // Setup payload
    var payload = {
      deviceID: this.deviceID,
    };

    // Place request
    return this.duplex.send("/device/unpair", payload);
  }

  get(path) {
    // Method to request a particular device's details
    // Setup payload
    var payload = {
      deviceID: this.deviceID,
      path: path,
    };

    // Place request
    return this.duplex.send("/device/get", payload);
  }

  set(path, data) {
    // Method to update a particular device's name
    // Setup payload
    var payload = {
      deviceID: this.deviceID,
      path: path,
      data: data,
    };

    // Place request
    return this.duplex.send("/device/set", payload);
  }

  on(event, callback) {
    // Method to get updates whenever device name or data gets a change
    // Setup payload
    var payload = {
      event: event,
      deviceID: this.deviceID,
    };

    // Place request
    return this.duplex.subscribe(event, payload, callback);
  }

  data() {
    // Operation is required to be performed on a device data
    return new data({ post: this.post, duplex: this.duplex }, this.deviceID);
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
      filter: filter,
    };

    // Place request
    return this.duplex.send("/devices/get", payload);
  }

  count(filter) {
    // Method to count all online devices paired to user ID
    // Setup payload
    var payload = {
      filter: filter,
    };

    // Place request
    return this.duplex.send("/devices/count", payload);
  }

  on(callback) {
    // Method to get updates whenever a devices
    // paired or unpaired
    // Setup payload
    var payload = {
      event: "devices",
    };

    // Place request
    return this.duplex.subscribe("devices", payload, callback);
  }

  device(deviceID) {
    // Operation is required to be performed on a device
    return new device({ post: this.post, duplex: this.duplex }, deviceID);
  }

  stream(deviceID) {
    // Operation is required to be performed on a device
    return new stream({ post: this.post, duplex: this.duplex }, deviceID, []);
  }

}
export default devices;
