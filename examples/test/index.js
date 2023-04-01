import grandeur from "grandeur-js";

const apiKey = "grandeurlemun7a206ln0jfy719ce9bn";
const secretKey = "8476d264831a131260b344f78b2604b4764c96798906e54bee2054ed9460a29a";
const token = "67f8e78dd380a3c41395159440775a344d437a8400dcb7f3790528431ec17195";

// Initialization of the project
var project = grandeur.init(apiKey, secretKey);

var deviceID = "devicelemun7sb06lp0jfy43k32een";

// Authenticating the user via token
var res = await project.auth().token(token);

var devices = project.devices();

if (res.code === "AUTH-AUTHORIZED") {
	// To get Device Data
	await devices.device(deviceID).get("");

	// To Set Device Data
	await project
		.devices()
		.device(deviceID)
		.data()
		.set("");
}
