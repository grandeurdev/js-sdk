// This is a handler class 
// and it is used to send request 
// to the server. Now you do not
// have to have a post function 
// in every class.

// Imports
import createHmac from 'createhmac-chaintor';

// Class
class post{
    constructor(config){
        // Default configuration
        this.config = config;

        // Status of the handler
        this.status = "ACTIVE";
    }
    
    generateSignature(path, url, headers, body) {
        // Function to generate the signature of request
        // Start with path and generate normalized
        const canonicalPath = encodeURI(path);

        // Then normalize the query
        const canonicalQuery = encodeURIComponent(url.split("?")[1]);

        // Then normalize the headers
        // only one we need
        const requiredHeaders = ['gt-date', 'gt-access-token', 'content-type']

        // Convert each header into canonical form and then
        // form the overall headers string
        const canonicalHeaders = requiredHeaders.reduce((accumulator, name) => {
            // Get value and trim spaces
            var value = headers[name].replace(/\s/g, '');

            // Return accumulated
            return `${accumulator}${name}:${value}`
        }, "");

        // Convert the body in the canocial form
        const canonicalBody = encodeURIComponent(JSON.stringify(body));

        // Build the sign string
        const signString = `${canonicalPath}\n${canonicalQuery}\n${canonicalHeaders}\n${canonicalBody}`;

        // Generate signature
        const signature = createHmac('sha256', this.config.accessKey).update(signString).digest('hex');

        // Return
        return signature;
    }

    toFormData(obj, form, namespace) {
        // Create a new form if form isn't
        // provided
        var fd = form || new FormData();
        
        // Current key
        var formKey;
        
        // Loop over object properties
        for(var property in obj) {
            // If the value at the property is defined
            if(obj.hasOwnProperty(property) && obj[property]) {
                // Resolve the case when this call
                // was recurssive, means it was called by toFromData
                // to resolve nested objects
                if (namespace) {
                    // Attach namespace
                    formKey = namespace + '[' + property + ']';
                } else {
                    // Or key
                    formKey = property;
                }
                
                // If the property is an object, but not a File, use recursivity.
                if (obj[property] instanceof Date) {
                    // Handle date and append
                    fd.append(formKey, obj[property].toISOString());
                }
                else if (typeof obj[property] === 'object') {
                    // Recurssion to solve nested objects
                    this.toFormData(obj[property], fd, formKey);
                } else { 
                    // If it is a string
                    fd.append(formKey, obj[property]);
                }
            }
        }
        
        // Return form
        return fd;
    }

    dispose() {
        // Set the status to dispose
        this.status = "DISPOSED";
    }

    send(path, data, attachments, token) {
        // Function to send a post request to the server

        // Return new Promise
        return new Promise(async (resolve, reject) => {
            // If the object is disposed then reject
            if (this.status === "DISPOSED") return reject({
                code: "DISPOSED"
            });

            // Get the URL
            const url = `${this.config.url}${path? path: "/"}?apiKey=${this.config.apiKey}`;

            // Setup cookie
            var cookie = "";

            // Get cookie
            if (typeof window !== "undefined") cookie = token || localStorage.getItem(`grandeur-auth-${this.config.apiKey}`) || "";

            // Set default headers
            var headers = {
                'gt-date': Date.now().toString(),
                'gt-access-token': this.config.accessToken,
                'authorization': cookie
            };

            var body = "";

            // If there isn't anything in the attachment
            // means the request is raw json
            if(!attachments){
                // Stringify Data and attach to body
                body = JSON.stringify(data);

                // Set Appropriate headers
                // to represent data type
                headers['content-type'] = 'application/json'

                // Generate signature
                headers['gt-signature'] = this.generateSignature(path, url, headers, data);
            }
            else {
                // Create a new form data
                body = new FormData();

                // Append files
                attachments.forEach(file => {
                    // Push
                    body.append("files", file);
                });

                // Then append data
                body = this.toFormData(data, body);

                // Set Appropriate headers to 
                // represent data type
                headers['content-type'] = 'multipart/form-data'

                // Generate signature
                headers['gt-signature'] = this.generateSignature(path, url, headers, data);

                // Remove the content type
                delete headers['content-type'];
            }

            // In a try catch
            try {
                // Send Request
                var res = await fetch(url, {
                    method: 'POST', // Request is of Type Post
                    mode: 'cors',   // Cross Origin is the Type
                    body: body, // Data
                    credentials: 'include', // Do Send the Credentials
                    SameSite: 'none',
                    headers: headers
                });

                // Then convert the response
                // to json
                res = await res.json();

                // Resolve
                resolve(res);
            } catch (error) {
                // Error
                reject({
                    code: "CONNECTION-REFUSED"
                });
            };
        });
    }
}
export default post;