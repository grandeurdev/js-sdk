import grandeur from "grandeur-js";

var project = grandeur.init("grandeurlesd86lu7mgj0jjpb3uw0cbb", "80a923adb1ab257fd51d388a34fe5e03351bd44c2e239bc621d2b064846b43c0");

var deviceID = "devicelesd875d7mgp0jjp6wic58io";

let email = "ahmadbutt4260@gmail.com";
let password = "pakistan606";

var res = await project.auth().login(email, password);

var devices = project.devices();

// console.log(process.env);
//
// console.log(await devices.device(deviceID).get(""));

// project.onConnection((update) => console.log(update));

console.log(res);
