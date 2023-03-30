import grandeur from "grandeur-js";

var project = grandeur.init("grandeurlesd86lu7mgj0jjpb3uw0cbb", "80a923adb1ab257fd51d388a34fe5e03351bd44c2e239bc621d2b064846b43c0");

var deviceID = "devicelesd875d7mgp0jjp6wic58io";

// let email = "ahmadbutt4260@gmail.com";
// let password = "pakistan606";

var res = await project.auth().token("7ac7e18b7ecd7440fb70db6b731a736274ca0f976add7f697296d07d5f8376c4");

// var res = await project.auth().login(email, password);

// var res = await project.auth().register(email, password, "displayName", "phone");

var devices = project.devices();

// console.log(process.env);

// project.onConnection((update) => console.log(update));

// console.log(res);
console.log(await devices.device(deviceID).get(""));