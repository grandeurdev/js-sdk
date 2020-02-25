// Apollo storage
// This class provides
// all the neccessery file storage functions
// of Grandeur Apollo.
// In order to use file storage features
// you must include this file  

// class declartion
class storage{
    // Constructor
    constructor(handlers) {
        // Configuration
        this.post = handlers.post
    }
    
    uploadFile(data) {
        // Method to upload a file to the server's file system
        return this.post.send("/storage/uploadFile", data, "file");
    }

    getFileUrl(data) {
        // Method to fetch a file from the server's file system
        return this.post.send("/storage/getFileUrl", data);
    }
}
export default storage;