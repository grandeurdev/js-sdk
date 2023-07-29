
// Class to get and set the profile of currently logged in user
class user {

	// Constructor
	constructor(handlers) {

		// Configuration
		this.post = handlers.post;
		this.duplex = handlers.duplex;
	  
	}
  
	get() {

		// Method to get the profile of current user
		// Place request
		return this.post.send("/auth/ping", { });

	}

	set(path, data) {

		// Method to let developers update the user profile
		return this.post.send("/auth/user/set", { path, data })

	}
  
	
  }
  export default user;