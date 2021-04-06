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
        this.post = handlers.post
    }

    async login(email, password) {
        // This function sends "login a user" request with required data to the server
        // Submit the request and wait for request to be processed
        var res = await this.post.send("/auth/login", {email: email, password: password});

        // then if the login process completed successfully
        if (res.code === "AUTH-ACCOUNT-LOGGEDIN") {
            // Then we will set the token to the local storage
            localStorage.setItem(`grandeur-auth-${this.post.config.apiKey}`, res.token);
        }

        // Resolve promise
        return res;
    }

    async register(email, password, displayName, phone) {
        // This function sends "register" request with provided data to the server
        // submit the request
        try {
            // Get the response
            var res = await this.post.send("/auth/register", {email: email, password: password, displayName: displayName, phone: phone});
            
            // and return a confirmation function if token sent
            if (res.code === "PHONE-CODE-SENT")
                return {
                    code: res.code,
                    message: res.message,

                    // Append confirm function
                    confirm : async (verificationCode) => {
                        // Confirmation function will get the token from the response object received
                        // earlier as a result of register request with user data and will get code from
                        // the user via the argument and then using the post handler function will submit
                        // the request again
                        var response = await this.post.send("/auth/register", {token: res.token, verificationCode: verificationCode});

                        // Check for response code
                        if (response.code === "AUTH-ACCOUNT-REGISTERED") {
                            // Then we will set the token to the local storage
                            localStorage.setItem(`grandeur-auth-${this.post.config.apiKey}`, response.token);
                        }

                        // Resolve promise
                        return response;
                    }
                }
            else
                return res;
        }
        catch (err) {
            // Got an error then just throw it
            throw err;
        }
    }

    async updateProfile(displayName, displayPicture, phone) {
        // This function sends "updateProfile" request with provided data to the server
        // submit the request
        try {
            // Get the response
            var res = await this.post.send("/auth/updateProfile", {displayName: displayName, phone: phone, displayPicture: displayPicture});
            
            // and return a confirmation function if token sent
            if (res.code === "PHONE-CODE-SENT")
                return {
                    code: res.code,
                    message: res.message,

                    // Append confirm function
                    confirm : (verificationCode) => {
                        // Confirmation function will get the token from the response object received
                        // earlier as a result of register request with user data and will get code from
                        // the user via the argument and then using the post handler function will submit
                        // the request again
                        return this.post.send("/auth/updateProfile", {token: res.token, verificationCode: verificationCode});
                    }
                }
            else
                return res;
        }
        catch (err) {
            // Got an error then just throw it
            throw err;
        }
    }

    async forgotPassword(email) {
        // This function sends "forgotPassword" request with provided data to the server
        // submit the request
        try {
            // Get the response
            var res = await this.post.send("/auth/forgotPassword", {email: email});
            
            // and return a confirmation function if token sent
            if (res.code === "PHONE-CODE-SENT")
                return {
                    code: res.code,
                    message: res.message,

                    // Append confirm function
                    confirm : (verificationCode, password) => {
                        // Confirmation function will get the token from the response object received
                        // earlier as a result of register request with user data and will get code from
                        // the user via the argument and then using the post handler function will submit
                        // the request again
                        return this.post.send("/auth/forgotPassword", {token: res.token, verificationCode: verificationCode, password: password});
                    }
                }
            else
                return res;
        }
        catch (err) {
            // Got an error then just throw it
            throw err;
        }
    }

    async changePassword(password) {
        // This function sends "changePassword" request with provided data to the server
        // submit the request
        try {
            // Get the response
            var res = await this.post.send("/auth/changePassword", {password: password});
            
            // and return a confirmation function if token sent
            if (res.code === "PHONE-CODE-SENT")
                return {
                    code: res.code,
                    message: res.message,

                    // Append confirm function
                    confirm : (verificationCode) => {
                        // Confirmation function will get the token from the response object received
                        // earlier as a result of register request with user data and will get code from
                        // the user via the argument and then using the post handler function will submit
                        // the request again
                        return this.post.send("/auth/changePassword", {token: res.token, verificationCode: verificationCode});
                    }
                }
            else
                return res;
        }
        catch (err) {
            // Got an error then just throw it
            throw err;
        }
    }

    isAuthenticated() {
        // This function sends "check if a user's logged in" request with required data to the server
        return this.post.send("/auth/protectedpage", {});
    }

    ping() {
        // This function sends "check if a user's logged in" request with required data to the server
        return this.post.send("/auth/ping", {});
    }

    logout() {
        // This function sends "logout the user" request to the server
        return this.post.send("/auth/logout", {});
    }

    async oauth(integrationID) {
        // This function redirects the client to OAuth redirect
        const res = await this.post.send("/auth/getOAuthUrl", {integrationID: integrationID});

        // Redirect if request has been processed successfully
        if (res.redirectUrl)
            window.location = res.redirectUrl;
        
        // Otherwise send response
        else return res;
    }

    oauthAccessToken(integrationID) {
        // This function to get oauth token
        return this.post.send("/auth/getOAuthToken", {integrationID: integrationID});
    }
}

export default auth;