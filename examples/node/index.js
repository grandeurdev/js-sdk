import grandeur from "grandeur-js";

const apiKey = "apiKey";
const secretKey = "secretKey";
const token = "token";

// Initialization of the project
var project = grandeur.init(apiKey, secretKey);

var deviceID = "deviceID";

// Authenticating the user via token
var res = await project.auth().token(token);

// Get reference to devices
var devices = project.devices();

// And get data
var res = await devices.device(deviceID).get("");

// Log to console
console.log(res);
