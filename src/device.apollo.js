// This class is used to
// get the required device 
// features of Grandeur Apollo i.e
// To pair device

//Class
class device{
     // Constructor
     constructor(handlers) {
        // Configuration
        this.post = handlers.post
    }

    pairDevice(data) {
        // Method to send request for pairing a device with this User ID
        return this.post.send("/devices/pairDevice", data);
    }
    
}
export default device;