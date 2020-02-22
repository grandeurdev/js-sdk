// Apollo storage
// This class provides
// all the neccessery file storage functions
// of Grandeur Apollo.
// In order to use file storage features
// you must include this file  

// class declartion
class storage{

    constructor(config) {
          // Configuration
          this.config = config;
    }
    uploadFile(data, callback) {
        // Method to upload a file to the server's file system
        this.post("uploadFile", data, callback, "form");
    }

    getFileUrl(data, callback) {
        // Method to fetch a file from the server's file system
        this.post("getFileUrl", data, callback);
    }
    
    post(path, data, callback, format) {
    
        // This function will be utilized to post a data to a server
        // specified through the path
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.config.url + '/storage/' + path + '?apiKey=' + this.config.apiKey, true);

        // Allow the Sessions / Cookies
        xhr.withCredentials = true;

        xhr.onload = function() {
            // Call a function when the state changes.
            try {
                if (this.status == 200)
                    // If request went successfully
                    callback(JSON.parse(xhr.responseText), null);
                else
                    // If error happen
                    callback(null, JSON.parse(xhr.responseText));
            }
            catch(err) {
            }
        }

        xhr.onerror = function() {
            // If request failed
            callback(null, {code: "ERR_CONNECTION_REFUSED", message: "Failed to Process the Request due to Internet Connectivity Problem."});
        }

        if(format === "form") {
            // For uploading the file as multi-part form
            // Send the request
            xhr.send(data);
        }
        else {
            // Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");
            // Send the request
            xhr.send(JSON.stringify(data));
        }
    }
}
export default storage;