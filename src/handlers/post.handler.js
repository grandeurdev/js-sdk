// This is a handler class 
// and it is used to send request 
// to the server. Now you do not
// have to have a post function 
// in every class.

// Class
class post{
    constructor(config){
        // Default configuration
         this.config = config;
    }
    
    send(path, data, type) {
        // Get the URL
        const url = this.config.url + path + '?apiKey=' + this.config.apiKey;
        //Set default headers
        var headers={};

        // If data type to be sent is JSON
        if(type !== 'file'){
            // Stringify Data
            data=JSON.stringify(data);

            // Set Appropriate headers
            headers={
                'Content-Type': 'application/json'    // JSON data type
            };
        }
        // Return new Promise
        return new Promise((resolve, reject) => {
            // Send Request
            fetch(url, {
                method: 'POST', // Request is of Type Post
                mode: 'cors',   // Cross Origin is the Type
                body: data, // Data
                credentials: 'include', // Do Send the Credentials
                SameSite: 'none',
                headers: headers
            })
            .then (res => res.json())
            .then (
                (result) => {
                    // Results
                    resolve(result);
                },
                (error) => {
                    // Error Happened
                    reject(error);
                }
            );
        });
    }
}
export default post;