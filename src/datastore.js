// Datastore
// A namespace where users
// could store data related to their
// devices and app

// Pipeline interface
class pipeline {
  // Constructor
  constructor(handlers, name, index, query) {
    // Configuration
    this.post = handlers.post;
    this.duplex = handlers.duplex;

    // Store the collection name and query
    this.collection = name;
    this.index = index;
    this.query = query;
  }

  match(filter) {
    // Method to add match stage to
    // the query and return a new pipeline
    this.query.push({
      type: "match",
      filter: filter,
    });

    // Return a new pipeline
    return new pipeline({ post: this.post, duplex: this.duplex }, this.collection, this.index, this.query);
  }

  project(specs) {
    // Method to add project stage to
    // the query and return a new pipeline
    this.query.push({
      type: "project",
      specs: specs,
    });

    // Return a new pipeline
    return new pipeline({ post: this.post, duplex: this.duplex }, this.collection, this.index, this.query);
  }

  group(condition, fields) {
    // Method to add group stage to
    // the query and return a new pipeline
    this.query.push({
      type: "group",
      condition: condition,
      fields: fields,
    });

    // Return a new pipeline
    return new pipeline({ post: this.post, duplex: this.duplex }, this.collection, this.index, this.query);
  }

  sort(specs) {
    // Method to add sort stage to
    // the query and return a new pipeline
    this.query.push({
      type: "sort",
      specs: specs,
    });

    // Return a new pipeline
    return new pipeline({ post: this.post, duplex: this.duplex }, this.collection, this.index, this.query);
  }

  execute(nPage) {
    // Method to finally send request
    // to execute the pipeline
    // Setup payload
    var payload = {
      collection: this.collection,
      index: this.index,
      pipeline: this.query,
      nPage: nPage,
    };

    // Place request
    return this.duplex.send("/datastore/pipeline", payload);
  }
}

// Collection interface
class collection {
  // Constructor
  constructor(handlers, name) {
    // Configuration
    this.post = handlers.post;
    this.duplex = handlers.duplex;
    this.collection = name;
  }

  insert(documents) {
    // Method to insert documents to datastore
    // Setup payload
    var payload = {
      collection: this.collection,
      documents: documents,
    };

    // Place request
    return this.duplex.send("/datastore/insert", payload);
  }

  delete(filter) {
    // Method to delete documents from datastore
    // Setup payload
    var payload = {
      collection: this.collection,
      filter: filter,
    };

    // Place request
    return this.duplex.send("/datastore/delete", payload);
  }

  update(filter, update) {
    // Method to delete documents from datastore
    // Setup payload
    var payload = {
      collection: this.collection,
      filter: filter,
      update: update,
    };

    // Place request
    return this.duplex.send("/datastore/update", payload);
  }

  search(filter, projection, nPage) {
    // Method to search documents from datastore
    // Based on pipeline so create a new one
    var searchPipeline = new pipeline({ post: this.post, duplex: this.duplex }, this.collection, {}, []).match(filter);

    // Add projection if provided
    if (projection) searchPipeline = searchPipeline.project(projection);

    // Execute
    return searchPipeline.execute(nPage);
  }

  pipeline(index) {
    // Method to setup a pipeline
    // which will allow the users to stage
    // different quaries togehter and execute together
    return new pipeline({ post: this.post, duplex: this.duplex }, this.collection, index, []);
  }
}

// Datastore class
class datastore {
  // Constructor
  constructor(handlers) {
    // Configuration
    this.post = handlers.post;
    this.duplex = handlers.duplex;
  }

  collection(name) {
    // Default method to get
    // reference to a collection by passing in
    // collection name and handlers
    return new collection({ post: this.post, duplex: this.duplex }, name);
  }

  list(nPage) {
    // Method to list all collections
    // Setup payload
    var payload = {
      nPage: nPage,
    };

    // Place request
    return this.duplex.send("/datastore/list", payload);
  }

  drop(name) {
    // Method to drop a collection
    // Setup payload
    var payload = {
      collection: name,
    };

    // Place request
    return this.duplex.send("/datastore/drop", payload);
  }
}

export default datastore;
