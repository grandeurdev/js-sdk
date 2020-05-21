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
    
    uploadFile(file, filename) {
        // Method to upload a file to the server's file system
        // Post request
        return this.post.send("/storage/uploadFile", {filename: filename}, [file]);
    }

    getFileUrl(filename) {
        // Method to fetch a file from the server's file system
        return this.post.send("/storage/getFileUrl", {filename: filename});
    }
}
export default storage;