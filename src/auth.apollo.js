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

    login(email, password) {
        // This function sends "login a user" request with required data to the server
        return this.post.send("/auth/loginwithemail", {email: email, password: password});
    }

    sendCode(email, password, displayName, phone) {
        // This function sends "send Code" request with provided data to the server
        // First validate data
        if (!displayName) {
            // Invalid Name
            return Promise.resolve({code: "DATA-INVALID", message: "Name is required."});
        }
        else if (!email.match(/[\w-]+@([\w-]+\.)+[\w-]+/g)) {
            // Invalid Email
            return Promise.resolve({code: "DATA-INVALID", message: "Please enter email in valid format."});
        }
        else if (!password.match(/^.{6,}$/g)) {
            // Invalid Password
            return Promise.resolve({code: "DATA-INVALID", message: "Password is required to atleast 6 character long."});
        }
        else if (!phone.match(/^[+]\d{0}[1-9]\d{1,14}$/g)) {
            // Invalid Phone
            return Promise.resolve({code: "DATA-INVALID", message: "Phone number is required to start with +<CountryCode> and cannot include spaces."});
        }

        // Else submit the request
        return this.post.send("/auth/register", {email: email, password: password, displayName: displayName, phone: phone, requiredConfirmation: true});
    }

    register(token, verificationCode) {
        console.log(verificationCode);
        // This function sends "verify code and register" request with registration data to the server
        return this.post.send("/auth/register", {token: token, verificationCode: verificationCode});
    }

    isAuthenticated() {
        // This function sends "check if a user's logged in" request with required data to the server
        return this.post.send("/auth/protectedpage", {});
    }

    logout() {
        // This function sends "logout the user" request to the server
        return this.post.send("/auth/logout", {});
    }
}

export default auth;