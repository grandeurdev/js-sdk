var apollo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _src_auth_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/auth.apollo */ \"./src/auth.apollo.js\");\n/* harmony import */ var _src_storage_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/storage.apollo */ \"./src/storage.apollo.js\");\n/* harmony import */ var _src_device_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/device.apollo */ \"./src/device.apollo.js\");\n/* harmony import */ var _src_handlers_post_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/handlers/post.handler */ \"./src/handlers/post.handler.js\");\n/* harmony import */ var _src_handlers_duplex_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/handlers/duplex.handler */ \"./src/handlers/duplex.handler.js\");\n// Support classes\n\n\n\n\n// Handlers\n\n\n\n// The main config object to stores the\n// base urls of the Grandeur Server\nconst config = {\n    url: \"https://api.grandeur.tech\",\n    node: \"wss://api.grandeur.tech\"\n}\n\n// Function that initializes \n// the object\nfunction init(apiKey) {\n    // Returns a Object with a refernce to\n    // Apollo Supported Classes\n    const apolloConfig = {...config, apiKey}\n\n    // Post Handler\n    const postHandler = new _src_handlers_post_handler__WEBPACK_IMPORTED_MODULE_3__[\"default\"](apolloConfig);\n\n    // Duplex Handler\n    const duplexHandler = new _src_handlers_duplex_handler__WEBPACK_IMPORTED_MODULE_4__[\"default\"](apolloConfig);\n    \n    // Handlers\n    const handlers = {\n        post: postHandler,\n        duplex: duplexHandler\n    };\n\n    // Initialize the Connection\n    // to the Server\n    duplexHandler.init(new _src_auth_apollo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](handlers));\n\n    // Return reference to the classes\n    return {\n        // Helper Method\n        isConnected: () => handlers.duplex.status === \"CONNECTED\",\n\n        // Classes\n        auth: () => new _src_auth_apollo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](handlers),\n        storage: () => new _src_storage_apollo__WEBPACK_IMPORTED_MODULE_1__[\"default\"](handlers),\n        device: () => new _src_device_apollo__WEBPACK_IMPORTED_MODULE_2__[\"default\"](handlers)\n    }\n}\n\n\n\n//# sourceURL=webpack://apollo/./index.js?");

/***/ }),

/***/ "./src/auth.apollo.js":
/*!****************************!*\
  !*** ./src/auth.apollo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Apollo Authentication\n// This is one of the most important feature\n// that we will provide with our cloud and \n// it is the starting point of everything. As\n// in order to be able to access the other parts\n// of the SDK. It is important to first login a user\n// into the Application.\n\n// Class\nclass auth {\n    // Constructor\n    constructor(handlers) {\n        // Configuration\n        this.post = handlers.post\n    }\n\n    login(email, password) {\n        // This function sends \"login a user\" request with required data to the server\n        return this.post.send(\"/auth/loginwithemail\", {email: email, password: password});\n    }\n\n    async register(email, password, displayName, phone) {\n        // This function sends \"register\" request with provided data to the server\n        // submit the request\n        try {\n            // Get the response\n            var res = await this.post.send(\"/auth/register\", {email: email, password: password, displayName: displayName, phone: phone});\n            \n            // and return a confirmation function if token sent\n            if (res.code === \"PHONE-CODE-SENT\")\n                return {\n                    code: res.code,\n                    message: res.message,\n\n                    // Append confirm function\n                    confirm : (verificationCode) => {\n                        // Confirmation function will get the token from the response object received\n                        // earlier as a result of register request with user data and will get code from\n                        // the user via the argument and then using the post handler function will submit\n                        // the request again\n                        return this.post.send(\"/auth/register\", {token: res.token, verificationCode: verificationCode});\n                    }\n                }\n            else\n                return res;\n        }\n        catch (err) {\n            // Got an error then just throw it\n            throw err;\n        }\n    }\n\n    async updateProfile(displayName, displayPicture, phone) {\n        // This function sends \"updateProfile\" request with provided data to the server\n        // submit the request\n        try {\n            // Get the response\n            var res = await this.post.send(\"/auth/updateProfile\", {displayName: displayName, phone: phone, displayPicture: displayPicture});\n            \n            // and return a confirmation function if token sent\n            if (res.code === \"PHONE-CODE-SENT\")\n                return {\n                    code: res.code,\n                    message: res.message,\n\n                    // Append confirm function\n                    confirm : (verificationCode) => {\n                        // Confirmation function will get the token from the response object received\n                        // earlier as a result of register request with user data and will get code from\n                        // the user via the argument and then using the post handler function will submit\n                        // the request again\n                        return this.post.send(\"/auth/updateProfile\", {token: res.token, verificationCode: verificationCode});\n                    }\n                }\n            else\n                return res;\n        }\n        catch (err) {\n            // Got an error then just throw it\n            throw err;\n        }\n    }\n\n    async forgotPassword(email) {\n        // This function sends \"forgotPassword\" request with provided data to the server\n        // submit the request\n        try {\n            // Get the response\n            var res = await this.post.send(\"/auth/forgotPassword\", {email: email});\n            \n            // and return a confirmation function if token sent\n            if (res.code === \"PHONE-CODE-SENT\")\n                return {\n                    code: res.code,\n                    message: res.message,\n\n                    // Append confirm function\n                    confirm : (verificationCode, password) => {\n                        // Confirmation function will get the token from the response object received\n                        // earlier as a result of register request with user data and will get code from\n                        // the user via the argument and then using the post handler function will submit\n                        // the request again\n                        return this.post.send(\"/auth/forgotPassword\", {token: res.token, verificationCode: verificationCode, password: password});\n                    }\n                }\n            else\n                return res;\n        }\n        catch (err) {\n            // Got an error then just throw it\n            throw err;\n        }\n    }\n\n    async changePassword(password) {\n        // This function sends \"changePassword\" request with provided data to the server\n        // submit the request\n        try {\n            // Get the response\n            var res = await this.post.send(\"/auth/changePassword\", {password: password});\n            \n            // and return a confirmation function if token sent\n            if (res.code === \"PHONE-CODE-SENT\")\n                return {\n                    code: res.code,\n                    message: res.message,\n\n                    // Append confirm function\n                    confirm : (verificationCode) => {\n                        // Confirmation function will get the token from the response object received\n                        // earlier as a result of register request with user data and will get code from\n                        // the user via the argument and then using the post handler function will submit\n                        // the request again\n                        return this.post.send(\"/auth/changePassword\", {token: res.token, verificationCode: verificationCode});\n                    }\n                }\n            else\n                return res;\n        }\n        catch (err) {\n            // Got an error then just throw it\n            throw err;\n        }\n    }\n\n    isAuthenticated() {\n        // This function sends \"check if a user's logged in\" request with required data to the server\n        return this.post.send(\"/auth/protectedpage\", {});\n    }\n\n    logout() {\n        // This function sends \"logout the user\" request to the server\n        return this.post.send(\"/auth/logout\", {});\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (auth);\n\n//# sourceURL=webpack://apollo/./src/auth.apollo.js?");

/***/ }),

/***/ "./src/device.apollo.js":
/*!******************************!*\
  !*** ./src/device.apollo.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This class is used to\n// get the required device \n// features of Grandeur Apollo i.e\n// To pair device\n\n//Class\nclass device{\n    // Constructor\n    constructor(handlers) {\n        // Configuration\n        this.post = handlers.post;\n        this.duplex = handlers.duplex;\n    }\n\n    pairDevice(deviceID) {\n        // Method to send request for pairing a device with this User ID\n        return this.post.send(\"/devices/pairDevice\", {deviceID: deviceID});\n    }\n\n    unpairDevice(deviceID) {\n        // Method to unpair a device from the user ID\n        return this.duplex.send( {\n            header: {\n                task: \"unpairDevice\"\n            },\n            payload: {\n                deviceID: deviceID\n            }\n        });\n    }\n\n    getUserDevices() {\n        // Method to list all devices paired to user ID\n        return this.duplex.send( {\n            header: {    \n                task: 'getUserDevices'\n            }\n        });\n    }\n\n    getOnlineDevicesCount() {\n        // Method to count all online devices paired to user ID\n        return this.duplex.send( {\n            header: {    \n                task: 'getOnlineDevicesCount'\n            }\n        });\n    }\n\n    getDeviceSummary(deviceID) {\n        // Method to request a particular device's summary\n        return this.duplex.send( {\n            header: {    \n                task: 'getDeviceSummary'\n            },\n            payload: {\n                deviceID: deviceID\n            }\n        });\n    }\n\n    getDeviceParms(deviceID) {\n        // Method to request a particular device's parms\n        return this.duplex.send( {\n            header: {    \n                task: 'getDeviceParms'\n            },\n            payload: {\n                deviceID: deviceID\n            }\n        });\n    }\n\n    setDeviceSummary(deviceID, summary) {\n        // Method to update a particular device's summary\n        return this.duplex.send( {\n            header: {    \n                task: 'setDeviceSummary'\n            },\n            payload: {\n                deviceID: deviceID,\n                summary: summary\n            }\n        });\n    }\n\n    setDeviceParms(deviceID, parms) {\n        // Method to update a particular device's parms\n        return this.duplex.send( {\n            header: {    \n                task: 'setDeviceParms'\n            },\n            payload: {\n                deviceID: deviceID,\n                parms: parms\n            }\n        });\n\n    }\n\n    getDeviceDetails(deviceID) {\n        // Method to request a particular device's details\n        return this.duplex.send( {\n            header: {    \n                task: 'getDeviceDetails'\n            },\n            payload: {\n                deviceID: deviceID\n            }\n        });\n    }\n\n    setDeviceName(deviceID, deviceName) {\n        // Method to update a particular device's name\n        return this.duplex.send( {\n            header: {    \n                task: 'setDeviceName'\n            },\n            payload: {\n                deviceID: deviceID,\n                deviceName: deviceName\n            }\n        });\n    }\n\n    getDeviceStatus(deviceID) {\n        // Method to request a particular device's online status\n        return this.duplex.send( {\n            header: {    \n                task: 'getDeviceStatus'\n            },\n            payload: {\n                deviceID: deviceID\n            }\n        });\n    }\n\n    onDeviceSummaryUpdated(deviceID, callback) {\n        // Method to get updates whenever summary of a \n        // device gets updated\n        return this.duplex.subscribeTopic(\"setDeviceSummary\", callback, deviceID);\n    }\n\n    onDeviceParmUpdated(deviceID, callback) {\n        // Method to get updates whenever parms of a \n        // device gets updated\n        return this.duplex.subscribeTopic(\"setDeviceParms\", callback, deviceID);\n    }\n\n    onDeviceNameUpdated(deviceID, callback) {\n        // Method to get updates whenever name of a \n        // device gets updated\n        return this.duplex.subscribeTopic(\"setDeviceName\", callback, deviceID);\n    }\n\n    onDeviceStatusUpdated(deviceID, callback) {\n        // Method to get updates whenever status of a \n        // device gets updated\n        return this.duplex.subscribeTopic(\"setDeviceStatus\", callback, deviceID);\n    }\n\n    onDevicesListUpdated(callback) {\n        // Method to get updates whenever a devices\n        // paired or unpaired\n        return this.duplex.subscribeTopic(\"setDevicesList\", callback);\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (device);\n\n//# sourceURL=webpack://apollo/./src/device.apollo.js?");

/***/ }),

/***/ "./src/handlers/duplex.handler.js":
/*!****************************************!*\
  !*** ./src/handlers/duplex.handler.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This is the most important class \n// of Grandeur Cloud. This \n// handles the real time connectivity.\n\n// Class\nclass duplex {\n    // Constructor\n    constructor(config){\n        // Server URL to send upgrade requests\n        this.node = config.node + \"?apiKey=\" + config.apiKey;\n        \n        // Event queue object to handle callbacks\n        // on Response\n        this.eventQueue = { };\n\n        // User subscriptions object to handle\n        // user subscriptions\n        this.subscriptions = {};\n        \n        // To check the status of Connection\n        this.status = \"DISCONNECTED\";\n\n        // Error response to be returned \n        // in case of default error\n        this.errResponse = {\n            code: \"ERR-CONNECTION-REFUSED\",\n            message: \"Apollo is not connected to server. Check internet connection.\"\n        }\n\n        // Setup list for events\n        this.otherEvents = [\"setDevicesList\"];\n        this.deviceEvents = [\"setDeviceSummary\", \"setDeviceParms\", \"setDeviceName\", \"setDeviceStatus\"];\n    }\n\n    // To initialize the connection\n    async init(auth) {\n        // Before starting the connection\n        // verify that either the user is authenticated\n        // or not using the auth object provided in args\n        // Start the Connection\n\n        try {\n            var res = await auth.isAuthenticated();\n\n            // Got the response\n            switch(res.code) {\n                case \"AUTH-AUTHORIZED\": \n                    // User is authenticated\n                    // so try to connect to the duplex\n                    this.ws  = new WebSocket(this.node , \"node\");\n                    break;\n\n                case \"AUTH-UNAUTHORIZED\": \n                    // User is not Authenticated\n                    // try to reconnect after some time\n                    this.reconnect(auth);  \n                    \n                    // Setup error response\n                    this.errResponse = {\n                        code: \"AUTH-UNAUTHORIZED\",\n                        message: \"You are not authenticated to the server.\"\n                    }\n                    return; \n            }\n        }\n        catch(err) {\n            // Internet connectivity issue\n            // so try to reconnect in a while\n            this.reconnect(auth);\n\n            // Setup default error\n            this.errResponse = {\n                code: \"ERR-CONNECTION-REFUSED\",\n                message: \"Apollo is not connected to server. Check internet connection.\"\n            }\n            return;\n        }\n        \n        // When connection opened with the server\n        this.ws.onopen = () => {\n            // Set status to connected\n            this.status = \"CONNECTED\";\n\n            // Start Ping\n            this.ping = setInterval(() => {\n                // Send packet to server\n                var packet = {header: {id: 'ping', task: 'ping'},payload:{}};\n                this.ws.send(JSON.stringify(packet));\n            }, 25000)\n        }\n\n        // When connection closed with the server\n        this.ws.onclose = () => {\n            // Set the status to disconnected\n            this.status = \"DISCONNECTED\";\n\n            // Clear ping\n            clearInterval(this.ping);\n\n            // Retry connection after a while\n            this.reconnect(auth)\n\n            // Setup default error\n            this.errResponse = {\n                code: \"ERR-CONNECTION-REFUSED\",\n                message: \"Apollo is not connected to server. Check internet connection.\"\n            }\n        }\n\n        this.ws.onmessage = (message) => {\n            // When a message is received from the server on duplex\n            var data = JSON.parse(message.data);\n            \n            // Raise user event\n            if (data.header.task === \"update\") {\n                // Got an update a subscribed topic\n                if (this.deviceEvents.includes(data.payload.event)) {\n                    // If event is of device type\n                    if (this.subscriptions[`${data.payload.event}/${data.payload.deviceID}`]) {\n                        // Handler is defined for the event type\n                        // so execute the callback\n                        this.subscriptions[`${data.payload.event}/${data.payload.deviceID}`](data.payload.update);\n                    }\n                }\n                else {\n                    // otherwise\n                    if (this.subscriptions[data.payload.event]) {\n                        // Handler is defined for the event type\n                        // so execute the callback\n                        this.subscriptions[data.payload.event](data.payload.update);\n                    }\n                }\n            }\n            else {\n                // Got response for a task\n                if(this.eventQueue[data.header.id]){\n                    // All messages other than subscription are passed to the event queue\n                    this.eventQueue[data.header.id].resolve(data.payload);\n    \n                    // Deleting the callback function from event queue\n                    delete this.eventQueue[data.header.id];\n                }\n            }\n        }\n    }\n\n    reconnect(auth) {\n        // This function will call the\n        // init event again with the auth\n        // object after certain time\n\n        setTimeout(() => {\n            // Call init again\n            this.init(auth);\n        }, 5000);\n    }\n\n    send(packet) {\n        // Create promise \n        return new Promise((resolve, reject) => {\n            // If Connected to the server\n            if (this.status === \"CONNECTED\") {\n                // Generate unique ID for the request\n                var id = Date.now();\n\n                // Append ID to header\n                packet.header.id = id;\n\n                // Save promise in the event queue\n                // so that event could be raised whenever\n                // response will be received in the onmessage\n                this.eventQueue[id] = {\n                    resolve: resolve,\n                    reject: reject\n                }\n\n                // Send packet\n                this.ws.send(JSON.stringify(packet));\n            }\n            else {\n                // Otherwise return a rejection\n                reject(this.errResponse);\n            }\n        });\n    }\n\n    async subscribeTopic(event, callback, deviceID) {\n        // Method to subscribe to a particular device's data\n        // Verify that the event is valid\n        if (!(this.deviceEvents.includes(event) || this.otherEvents.includes(event))) {\n            // If the event is invalid\n            // then return an error through callback\n            callback({\n                code: \"TOPIC-INVALID\", \n                message: \"The specified topic seems invalid.\"\n            });\n\n            return;\n        }\n\n        // Verify that if it is a device event\n        // then device id is provided\n        if (this.deviceEvents.includes(event) && !deviceID) {\n            // device id is not specified\n            callback({\n                code: \"DATA-INVALID\", \n                message: \"Device ID is required.\"\n            });\n\n            return;\n        }\n\n        // Packet\n        var packet = {\n            header: {\n                task: 'subscribeTopic'\n            }, \n            payload: {\n                event: event,\n                deviceID: deviceID\n            }\n        };\n\n        // Send response in try catch\n        try {\n            // Send the request\n            var res = await this.send(packet);\n \n            // Add callback to subscriptions queue\n            // depending upon type of event\n\n            if (this.deviceEvents.includes(event)) {\n                // If event is of device type\n                this.subscriptions[`${event}/${deviceID}`] = callback;\n            }\n            else {\n                // otherwise\n                this.subscriptions[event] = callback;\n            }\n            \n            // Return the response\n            return {\n                ...res, \n                clear: () => {\n                    // Packet\n                    var packet = {\n                        header: {\n                            task: 'unsubscribeTopic'\n                        }, \n                        payload: {\n                            event: event,\n                            deviceID: deviceID\n                        }\n                    };\n\n                    // Send request\n                    return this.send(packet);\n                }\n            }\n        }\n        catch(error) {\n            // Failed to send the request\n            // return an error in the callback\n            throw error;\n        }\n    }\n\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (duplex);\n\n//# sourceURL=webpack://apollo/./src/handlers/duplex.handler.js?");

/***/ }),

/***/ "./src/handlers/post.handler.js":
/*!**************************************!*\
  !*** ./src/handlers/post.handler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This is a handler class \n// and it is used to send request \n// to the server. Now you do not\n// have to have a post function \n// in every class.\n\n// Class\nclass post{\n    constructor(config){\n        // Default configuration\n         this.config = config;\n    }\n    \n    send(path, data, type) {\n        // Get the URL\n        const url = this.config.url + path + '?apiKey=' + this.config.apiKey;\n        //Set default headers\n        var headers={};\n\n        // If data type to be sent is JSON\n        if(type !== 'file'){\n            // Stringify Data\n            data=JSON.stringify(data);\n\n            // Set Appropriate headers\n            headers={\n                'Content-Type': 'application/json'    // JSON data type\n            };\n        }\n        // Return new Promise\n        return new Promise((resolve, reject) => {\n            // Send Request\n            fetch(url, {\n                method: 'POST', // Request is of Type Post\n                mode: 'cors',   // Cross Origin is the Type\n                body: data, // Data\n                credentials: 'include', // Do Send the Credentials\n                SameSite: 'none',\n                headers: headers\n            })\n            .then (res => res.json())\n            .then (\n                (result) => {\n                    // Results\n                    resolve(result);\n                },\n                (error) => {\n                    // Error Happened\n                    reject({\n                        code: \"ERR-CONNECTION-REFUSED\",\n                        message: \"Failed to connect to the server. Check internet connection.\"\n                    });\n                }\n            );\n        });\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (post);\n\n//# sourceURL=webpack://apollo/./src/handlers/post.handler.js?");

/***/ }),

/***/ "./src/storage.apollo.js":
/*!*******************************!*\
  !*** ./src/storage.apollo.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Apollo storage\n// This class provides\n// all the neccessery file storage functions\n// of Grandeur Apollo.\n// In order to use file storage features\n// you must include this file  \n\n// class declartion\nclass storage{\n    // Constructor\n    constructor(handlers) {\n        // Configuration\n        this.post = handlers.post\n    }\n    \n    uploadFile(file, filename) {\n        // Method to upload a file to the server's file system\n        \n        // Setup data \n        var data = new FormData();\n        data.append('file', file);\n        data.append('filename', filename);\n\n        // Post request\n        return this.post.send(\"/storage/uploadFile\", data, \"file\").then((res) => {\n            console.log(res);\n        });\n    }\n\n    getFileUrl(filename) {\n        // Method to fetch a file from the server's file system\n        return this.post.send(\"/storage/getFileUrl\", {filename: filename}).then((res) => {\n            console.log(res);\n        });\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (storage);\n\n//# sourceURL=webpack://apollo/./src/storage.apollo.js?");

/***/ })

/******/ });