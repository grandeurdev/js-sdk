// Apollo Authentication
// This is one of the most important feature
// that we will provide with our cloud and
// it is the starting point of everything. As
// in order to be able to access the other parts
// of the SDK. It is important to first login a user
// into the Application.

// Class
class auth {

	// Constructor
	constructor(handlers) {

		// Configuration
		this.post = handlers.post;
		this.duplex = handlers.duplex;
		
	}

	async login(email, { password, passwordless = true, create = true } = { }) {

		if (typeof window === "undefined")

			// Not supported warning
			return console.warn("The login feature is not available in node. Get auth token from Grandeur Dashboard and use the token() function.");

		// This function sends "login a user" request with required data to the server
		// Submit the request and wait for request to be processed
		var res = await this.post.send("/auth/login", { email: email, password: password, options: { passwordless, create } });

		// then if the login process completed successfully
		if (res.code === "AUTH-ACCOUNT-LOGGEDIN") {

			// Then we will set the token to the local storage
			if (typeof window !== "undefined") localStorage.setItem(`grandeur-auth-${this.post.config.apiKey}`, res.token);

			// Update the configuration
			this.post.config.token = res.token;

		}

		// But in case it was a passwordless login
		// where we are required to resolve the otp
		if (res.code === "CODE-SENT") {

			// We will return the response with a confirm function
			return {

				code: "CODE-SENT",

				// Function will take tehe token from user and attempt to confirm email
				confirm: async (code) => {

					// Take code and token
					var response = await this.post.send("/auth/login", { token: res.token, code: code, options: { passwordless, create }});

					// Check for response code
					if (response.code === "AUTH-ACCOUNT-LOGGEDIN") {

						// Set the token in localstorage for future use
						if (typeof window !== "undefined") localStorage.setItem(`grandeur-auth-${this.post.config.apiKey}`, response.token);

						// Load configuration
						this.post.config.token = response.token;

					}

					// Resolve promise
					return response;

				}

			}

		}

		// Resolve promise
		return res;

	}

	async register(email, password) {

		if (typeof window === "undefined")

			// Not supported warning
			return console.warn("The login feature is not available in node. Get auth token from Grandeur Dashboard and use the token() function.");

		// This function sends "register" request with provided data to the server
		// submit the request

		// Get the response
		var res = await this.post.send("/auth/register", { email: email, password: password });

		// and return a confirmation function if token sent
		if (res.code === "CODE-SENT")
		
			return {
				code: res.code,

				// Function will take tehe token from user and attempt to confirm email
				confirm: async (code) => {

					// Take code and token
					var response = await this.post.send("/auth/register", { token: res.token, code: code });

					// Check for response code
					if (response.code === "AUTH-ACCOUNT-REGISTERED") {

						// Set the token in localstorage for future use
						if (typeof window !== "undefined") localStorage.setItem(`grandeur-auth-${this.post.config.apiKey}`, response.token);

						// Load configuration
						this.post.config.token = response.token;

					}

					// Resolve promise
					return response;

				}
			}
			
		return res;
	}

	async reset(email) {

		// This function sends reset request with provided data to the server
		// submit the request

		// Get the response
		var res = await this.post.send("/auth/reset", { email: email });

		// and return a confirmation function if token sent
		if (res.code === "CODE-SENT")

			return {

				code: "CODE-SENT",

				// Append confirm function
				confirm: (code, password) => {
					
					// Send request
					return this.post.send("/auth/reset", { token: res.token, code: code, password: password });
				},
			}
		
		
		return res;
	}

	ping() {
		// This function sends "check if a user's logged in" request with required data to the server
		return this.post.send("/auth/ping", {});
	}

	logout() {
		// This function sends "logout the user" request to the server
		return this.post.send("/auth/logout", {});
	}

	async token(token) {

		// And run this in try catch
		// Send ping request to the server with this token
		var res = await this.post.send("/auth/ping", {}, token);

		// If the token is valid
		if (res.code === "AUTH-AUTHORIZED") {
			// Update configuration
			this.post.config.token = token;

			// And technically, we should reconnect
			this.duplex.reconnect();

			// Return response
			return res;
		}

		// Or return error
		throw {
			code: "TOKEN-INVALID",
		};
	}
}

export default auth;
