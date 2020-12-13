// main.js

// Initialize the SDK and get
// a reference to the project
var project = grandeur.init("ck412ssij0007xr239uos8jfk");

// Variable to store state and deviseID
var deviceState = 0;
var deviceID = "ck73ngond000338tkbzhlfx4r";

// Function to login user
var loginUser = async () => {
  // Create Loader
  var loading = await startLoading("Submitting Request");

  // Get email and password
  // from the form
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  // Get reference to the auth class
  var auth = project.auth();

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
    console.log(err);
    toast("Failed to authenticate the user due to connectivity issue.");
  }
}

// Function to toggle state of a device paired to a
// user account
var toggleDeviceState = async () => {
  // Get reference to the auth class
  var device = project.device();

  // Use try and catch block in order to 
  // use async await otherwise promises are also supported
  try {
    // Update device state
    deviceState = deviceState == 1? 0: 1;

    // Set parameters
    var res = await device.setDeviceParms(deviceID, {state: deviceState});

    // Generate an alert
    switch(res.code) {
      case "DEVICE-PARMS-UPDATED":  
        // Updated the parms
        // now also update the UI
        document.getElementById("toggleButton").checked = deviceState == 1? true: false;
        break;

      default: 
        // Fetch failed
        toast("Failed to update the device state");
    }
  }
  catch(err) {
    // Error usually got generated when
    // we are not connected to the internet
    // Log the error to the console
    console.log(err);

    // Generate an alert
    toast("Failed to update the device state due to connectivity issue.");
  }
}

// Function to logout user
var logout = async () => {
  // Create Loader
  var loading = await startLoading("Submitting Request");

  // Get reference to the auth class
  var auth = project.auth();

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

// Function to get device state
var getDeviceState = async () => {

  // Check if the Grandeur is connected
  if (project.isConnected()) {
    // Get reference to device class
    var device = project.device();

    // Then get parameters from server
    var res = await device.getDeviceParms(deviceID);

    // Verify that the device state is returned
    switch(res.code) {
      case "DEVICE-PARMS-FETCHED":
          // Store the state into the variable
          // after toggling
          deviceState = res.deviceParms.state == 1? 1: 0;

          // Update UI
          document.getElementById("toggleButton").checked = deviceState == 1? true: false;
          break; 
      
      default: {
          // In case of an error while fetching the state
          // simply generate an error
          toast("Failed to update the device state");
          return;
      }
    }
  }
  else {
    // Grandeur is not connected
  
    // Try agin in a while
    setTimeout(function() {
      getDeviceState();
    }, 2000);
  }
}

// Function to create a Toast
var toast = async (message) => {
  // Create a new toast
  const ionToast = document.createElement('ion-toast');

  // Set message and duration
  ionToast.message = message;
  ionToast.duration = 2000;

  // Append
  document.body.appendChild(ionToast);

  // Present
  await ionToast.present();
}

// Function to present loader
var startLoading = async (message) => {
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

// Sync with server on app restart
getDeviceState();