// main.js

// Initialize the SDK and get
// a reference to the project
var apolloProject = apollo.init("ck412ssij0007xr239uos8jfk");

// Function to login user
loginUser = async () => {
  // Create Loader
  var loading = await startLoading("Submitting Request");

  // Get email and password
  // from the form
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  // Get reference to the auth class
  var auth = apolloProject.auth();

  // Use try and catch block in order to 
  // use async await otherwise promises are also supported
  try {
    // Submit request
    var res = await auth.login(email, password);

    // Dismiss the Loader
    loading.dismiss();

    // Clear the form
    document.getElementById("login-form").reset();

    // Generate an alert
    switch(res.code) {
      case "AUTH-ACCOUNT-LOGGEDIN": 
        // User Authenticated
        toast("User has logged in to the account.")
        break;

      case "DATA-INVALID": 
        // Logging failed due
        // to invalid data
        toast("User data is invalid.");
        break;

      case "AUTH-ACCOUNT-ALREADY-LOGGEDIN":
        // A user account is already authenticated
        toast("Please logout the already loggedin user.");
        break;

    }
  }
  catch(err) {
    // Error usually got generated when
    // we are not connected to the internet
    // Create a Toast
    toast("Failed to authenticate the user due to connectivity issue.");
  }
}

// Function to list devices paired to a
// user account
listPairedDevices = async () => {
  // Get reference to the auth class
  var device = apolloProject.device();

  // Use try and catch block in order to 
  // use async await otherwise promises are also supported
  try {
    // Submit request
    var res = await device.getUserDevices();

    // Generate an alert
    switch(res.code) {
      case "DEVICES-LIST-FETCHED":  
        // List has been fetched
        // update UI
        var list = "";

        // Loop over devices
        for (device of res.devices) {
          // Add element
          list += `<ion-item><ion-label>${device.name}</ion-label></ion-item>`
        }

        // Render
        document.getElementById("devices-list").innerHTML = list;
        break;

      default: 
        // Fetch failed
        toast("Failed to fetch the list of devices.");
        break;

    }
  }
  catch(err) {
    // Error usually got generated when
    // we are not connected to the internet
    toast("Failed to fetch the devices list due to connectivity issue.");
  }
}

// Function to logout user
logout = async () => {
  // Create Loader
  var loading = await startLoading("Submitting Request");

  // Get reference to the auth class
  var auth = apolloProject.auth();

  // Use try and catch block in order to 
  // use async await otherwise promises are also supported
  try {
    // Submit request
    var res = await auth.logout();

    // Dismiss Loading
    loading.dismiss();

    // Generate an alert
    switch(res.code) {
      case "AUTH-ACCOUNT-LOGGEDOUT": 
        // User Authenticated
        toast("User has Logged out");
        break;

      case "AUTH-UNAUTHORIZED": 
        // User is not authenticated
        toast("User is not authenticated.");
    }
  }
  catch(err) {
    // Error usually got generated when
    // we are not connected to the internet
    toast("Failed to logout the user");
  }
}

// Function to clear list of paired devices
clearListPairedDevices = () => {
  // Clear list
  document.getElementById("devices-list").innerHTML = "";
}

// Function to create a Toast
toast = async (message) => {
  // Create a new toast
  const toast = document.createElement('ion-toast');

  // Set message and duration
  toast.message = message;
  toast.duration = 2000;

  // Append
  document.body.appendChild(toast);

  // Present
  await toast.present();
}

// Function to present loader
startLoading = async (message) => {
  // Create a new Loader
  const loading = document.createElement('ion-loading');

  // Set message
  loading.message = message;

  // Present Loader
  document.body.appendChild(loading);
  await loading.present();

  // return handler
  return loading;
}