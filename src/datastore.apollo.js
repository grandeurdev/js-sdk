// Datastore
// A namespace where users
// could store data related to their
// devices and app

// Collection interface
class collection{
    // Constructor
    constructor(handlers, name) {
        // Configuration
        this.post = handlers.post;
        this.duplex = handlers.duplex;
        this.collection = name;
    }

    insert(documents) {
        // Method to insert documents to datastore
        return this.duplex.send( {
            header: {
                task: "insertDocumentsDatastore"
            },
            payload: {
                collection: this.collection,
                documents: documents
            }
        });
    }

    delete(filter) {
        // Method to delete documents from datastore
        return this.duplex.send( {
            header: {
                task: "deleteDocumentsDatastore"
            },
            payload: {
                collection: this.collection,
                filter: filter
            }
        });
    }

    search(filter, projection) {
        // Method to search documents from datastore
        return this.duplex.send( {
            header: {
                task: "searchDocumentsDatastore"
            },
            payload: {
                collection: this.collection,
                filter: filter,
                projection: projection
            }
        });
    }
}

// Datastore class
class datastore{
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
        return new collection({post: this.post, duplex: this.duplex}, name);
    }

    listCollections() {
        // Method to list all collections
        return this.duplex.send( {
            header: {
                task: "listCollectionsDatastore"
            }
        });
    }

    dropCollection(name) {
        // Method to drop a collection
        return this.duplex.send( {
            header: {
                task: "dropCollectionDatastore"
            },
            payload: {
                collectionName: name
            }
        });
    }
}

export default datastore;