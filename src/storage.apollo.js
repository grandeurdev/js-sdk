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
        
        // Setup data 
        var data = new FormData();
        data.append('file', file);
        data.append('filename', filename);

        // Post request
        return this.post.send("/storage/uploadFile", data, "file").then((res) => {
            console.log(res);
        });
    }

    getFileUrl(filename) {
        // Method to fetch a file from the server's file system
        return this.post.send("/storage/getFileUrl", {filename: filename}).then((res) => {
            console.log(res);
        });
    }
}
export default storage;