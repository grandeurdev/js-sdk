// This is a handler class
// and it is used to send request
// to the server. Now you do not
// have to have a post function
// in every class.

// Imports
import totp from "totp-generator";
import { encode } from "hi-base32";
import fetchPonyfill from "fetch-ponyfill";

// Class
class post {

	constructor(config) {

		// Default configuration
		this.config = config;

		// Status of the handler
		this.status = "ACTIVE";

  	}

	dispose() {

		// Set the status to dispose
		this.status = "DISPOSED";

	}

	send(path, data, token) {

		// Function to send a post request to the server
		// console.trace(this.config);

		// Return new Promise
		return new Promise(async (resolve, reject) => {

			// If the object is disposed then reject
			if (this.status === "DISPOSED")
				
				return reject({
					code: "DISPOSED",
				});

			// Get the URL
			const url = `${this.config.url}${path ? path : "/"}?apiKey=${this.config.apiKey}`;

			// Setup cookie
			var cookie = "";

			// Get cookie
			cookie = token || this.config.token || "";

			// Set default headers
			var headers = {
				authorization: cookie,
			};

			// Stringify Data and attach to body
			var body = JSON.stringify(data);

			// Set Appropriate headers
			// to represent data type
			headers["content-type"] = "application/json";

			// Generate signature
			headers["gt-otp"] = totp(encode(this.config.secretKey));

			// const options = { Promise, XMLHttpRequest };

			const { fetch } = fetchPonyfill();

			// In a try catch
			try {
				// Send Request
				var res = await fetch(url, {

					method: "POST", // Request is of Type Post
					mode: "cors", // Cross Origin is the Type
					body: body, // Data
					credentials: "include", // Do Send the Credentials
					SameSite: "none",
					headers: headers,

				});

				// Then convert the response
				// to json
				res = await res.json();

				// Resolve
				resolve(res);
			} 
			catch (error) {

				// Error
				reject({
					code: "CONNECTION-REFUSED",
				});

			}

		});
	}
}

export default post;
