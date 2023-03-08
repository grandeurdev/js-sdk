/**
 * @file: main.js
 * Initialize the SDK and get
 * a reference to the project
 */

var project = grandeur.init(
  "grandeurlemun7a206ln0jfy719ce9bn",
  "8476d264831a131260b344f78b2604b4764c96798906e54bee2054ed9460a29a"
);

/** Device ID */
var deviceID = "devicelemun7sb06lp0jfy43k32een";

/**
 * This function uses the sdk to validate
 * that if the user is authenticated or not
 */
async function start() {
  /** Use sdk auth class to check auth status */
  var res = await project.auth().isAuthenticated();

  /** Then if the user isn't authorized then show the login screen */
  if (res.code === "AUTH-UNAUTHORIZED") {
    return displayLogin();
  }

  /** Display device screen */
  displayDevice();
}

/** Listener on login form button to authenticate a user */
document.getElementById("submitLogin").addEventListener("click", async () => {
  /** Get email and password from inputs */
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  /** Display laoder */
  displayLoader();

  /** Use the sdk auth class to login the user */
  var res = await project.auth().login(email, password);

  /** If the operation was successful */
  if (res.code === "AUTH-ACCOUNT-LOGGEDIN") {
    /** Reset the login page */
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    /** Display device screen */
    return displayDevice();
  }

  /** otherwise display the login screen again */
  displayLogin();
});

/** Add event handler on logout icon */
document.getElementById("logout").addEventListener("click", async () => {
  /** Show the loader */
  displayLoader();

  /** and use the auth class of sdk to logout the user */
  await project.auth().logout();

  /** Then call start again */
  start();
});

/** Function to show laoder screen */
function displayLoader() {
  /** Display loader */
  document.getElementById("loader").style.display = "flex";

  /** Hide login screen */
  document.getElementById("login").style.display = "none";

  /** Hide device screen */
  document.getElementById("device").style.display = "none";
  document.getElementById("device-button").style.display = "none";
}

/** Function to show login screen */
function displayLogin() {
  /** Hide loader */
  document.getElementById("loader").style.display = "none";

  /** Display login screen */
  document.getElementById("login").style.display = "flex";
}

/** Function to show device screen */
async function displayDevice() {
  /** Hide loader */
  document.getElementById("loader").style.display = "none";

  /** Display button screen */
  document.getElementById("device").style.display = "flex";

  /** Start loader on deivce */
  document.getElementById("device-loading").style.display = "block";

  /** Use sdk devices class */
  var devices = project.devices();

  console.log(
    await devices
      .device(deviceID)
      .data()
      .on("led", (path, res) => {
        console.log(path, res);
      })
  );

  /** Get device name */
  var { device } = await devices.device(deviceID).get("name");

  /** And get device data */
  var { data } = await devices.device(deviceID).data().get("led");

  /** Set device name */
  document.getElementById("device-name").innerHTML = device.name;

  /** Set button style */
  document
    .getElementById("device-button-state")
    .setAttribute("stroke", data ? "#74C365" : "#556382");
  document
    .getElementById("device-button-state")
    .setAttribute("data-state", data);

  // Display button
  document.getElementById("device-loading").style.display = "none";
  document.getElementById("device-button").style.display = "block";

  /** Then also subscribe to the state update event of the device */
  devices
    .device(deviceID)
    .data()
    .on("led", (path, state) => {
      /** Update ui */
      document
        .getElementById("device-button-state")
        .setAttribute("stroke", state ? "#74C365" : "#556382");
      document
        .getElementById("device-button-state")
        .setAttribute("data-state", state);
    });
}

/** Function to update the state of a device */
async function updateState() {
  /** Create new state */
  var newState =
    document
      .getElementById("device-button-state")
      .getAttribute("data-state") === "1"
      ? 0
      : 1;

  /** Use the devices class of sdk to report the upgrade */
  await project.devices().device(deviceID).data().set("led", newState);
}

/** Start the app */
start();
