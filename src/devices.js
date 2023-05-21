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

  get(path) {
    if (path) {
      const send = (query, nPage) => {
        const payload = {
          deviceID: this.deviceID,
          path: path,
          nPage: nPage,
          query: query,
        };



        // Send the request and return a promise
        return this.duplex.send("/device/data/get", payload);
      }

      return new pipeline(send, [], 1);
    }
    else {

      // If no path is provided, perform the default get operation
      var payload = {
        deviceID: this.deviceID,
        path: path,
      };

      // Place the request and return the result
      return this.duplex.send("/device/data/get", payload);
    }
  }

  delete(path) {
    const send = (query, nPage) => {
      const payload = {
        deviceID: this.deviceID,
        path: path,
        nPage: nPage,
        query: query,
      };

      // Send the request and return a promise
      return this.duplex.send("/device/data/delete", payload);
    }

    return new pipeline(send, [], 1);
  }
}

class pipeline {
  // Constructor
  constructor(execute, query, nPage) {
    // Configuration
    this.query = query || [];
    this.nPage = nPage;
    this.execute = execute;
  }

  to(condition) {
    // Method to add "to" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "to", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  from(condition) {
    // Method to add "from" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "from", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  gt(condition) {
    // Method to add "gt" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "gt", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  lt(condition) {
    // Method to add "lt" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "lt", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  gte(condition) {
    // Method to add "gte" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "gte", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  lte(condition) {
    // Method to add "lte" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "lte", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  eq(condition) {
    // Method to add "eq" filter to the query and return a new pipeline
    const newQuery = [...this.query, { type: "eq", condition }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  sort(specs) {
    // Method to add sort stage to the query and return a new pipeline
    const newQuery = [...this.query, { type: "sort", specs }];
    return new pipeline(this.execute, newQuery, this.nPage);
  }

  page(nPage) {
    // Method to set the page number for pagination and return a new pipeline
    return new pipeline(this.execute, this.query, nPage);
  }

  then(onFulfilled, onRejected) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.execute(this.query, this.nPage);
        resolve(result);
        if (onFulfilled) {
          onFulfilled(result);
        }
      } catch (error) {
        reject(error);
        if (onRejected) {
          onRejected(error);
        }
      }
    });
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
}
export default devices;
