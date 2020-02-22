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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _src_auth_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/auth.apollo */ \"./src/auth.apollo.js\");\n/* harmony import */ var _src_storage_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/storage.apollo */ \"./src/storage.apollo.js\");\n\r\n\r\n// The main config object to stores the\r\n// base urls of the Grandeur Server\r\nconst config = {\r\n    url: \"https://api.grandeur.tech\",\r\n    node: \"wss://api.grandeur.tech\"\r\n}\r\n\r\n// Function that initializes \r\n// the object\r\nfunction init(apiKey) {\r\n    // Returns a Object with a refernce to\r\n    // Apollo Supported Classes\r\n    const apolloConfig = {...config, apiKey}\r\n\r\n    return {\r\n        auth: () => new _src_auth_apollo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](apolloConfig),\r\n        storage: () => new _src_storage_apollo__WEBPACK_IMPORTED_MODULE_1__[\"default\"](apolloConfig)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://apollo/./index.js?");

/***/ }),

/***/ "./src/auth.apollo.js":
/*!****************************!*\
  !*** ./src/auth.apollo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Apollo Authentication\r\n// This is one of the most important feature\r\n// that we will provide with our cloud and \r\n// it is the starting point of everything. As\r\n// in order to be able to access the other parts\r\n// of the SDK. It is important to first login a user\r\n// into the Application.\r\n\r\n// Class\r\nclass auth {\r\n    // Constructor\r\n    constructor(config) {\r\n        // Configuration\r\n        this.config = config;\r\n    }\r\n\r\n    login(email, password) {\r\n        // This function sends \"login a user\" request with required data to the server\r\n        return this.post(\"loginwithemail\", {email: email, password: password});\r\n    }\r\n\r\n    sendCode(email, password, displayName, phone) {\r\n        // This function sends \"send Code\" request with provided data to the server\r\n        // First validate data\r\n        if (!displayName) {\r\n            // Invalid Name\r\n            return Promise.resolve({code: \"DATA-INVALID\", message: \"Name is required.\"});\r\n        }\r\n        else if (!email.match(/[\\w-]+@([\\w-]+\\.)+[\\w-]+/g)) {\r\n            // Invalid Email\r\n            return Promise.resolve({code: \"DATA-INVALID\", message: \"Please enter email in valid format.\"});\r\n        }\r\n        else if (!password.match(/^.{6,}$/g)) {\r\n            // Invalid Password\r\n            return Promise.resolve({code: \"DATA-INVALID\", message: \"Password is required to atleast 6 character long.\"});\r\n        }\r\n        else if (!phone.match(/^[+]\\d{0}[1-9]\\d{1,14}$/g)) {\r\n            // Invalid Phone\r\n            return Promise.resolve({code: \"DATA-INVALID\", message: \"Phone number is required to start with +<CountryCode> and cannot include spaces.\"});\r\n        }\r\n\r\n        // Else submit the request\r\n        return this.post(\"register\", {email: email, password: password, displayName: displayName, phone: phone, requiredConfirmation: true});\r\n    }\r\n\r\n    register(token, verificationCode) {\r\n        console.log(verificationCode);\r\n        // This function sends \"verify code and register\" request with registration data to the server\r\n        return this.post(\"register\", {token: token, verificationCode: verificationCode});\r\n    }\r\n\r\n    isAuthenticated() {\r\n        // This function sends \"check if a user's logged in\" request with required data to the server\r\n        return this.post(\"protectedpage\", {});\r\n    }\r\n\r\n    logout() {\r\n        // This function sends \"logout the user\" request to the server\r\n        return this.post(\"logout\", {});\r\n    }\r\n\r\n    post(path, data) {\r\n        // Get the URL\r\n        const url = this.config.url + \"/auth/\" + path + \"?apiKey=\" + this.config.apiKey;\r\n\r\n        // Return new Promise\r\n        return new Promise((resolve, reject) => {\r\n            // Send Request\r\n            fetch(url, {\r\n                method: \"POST\", // Request is of Type Post\r\n                mode: \"cors\",   // Cross Origin is the Type\r\n                body: JSON.stringify(data), // Data\r\n                credentials: \"include\", // Do Send the Credentials\r\n                SameSite: 'none',\r\n                headers: {\r\n                \"Content-Type\": \"application/json\"    // JSON data type\r\n                }\r\n            })\r\n            .then (res => res.json())\r\n            .then (\r\n                (result) => {\r\n                    // Results\r\n                    resolve(result);\r\n                },\r\n                (error) => {\r\n                    // Erorr Happend\r\n                    reject(error);\r\n                }\r\n            );\r\n        });\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (auth);\n\n//# sourceURL=webpack://apollo/./src/auth.apollo.js?");

/***/ }),

/***/ "./src/storage.apollo.js":
/*!*******************************!*\
  !*** ./src/storage.apollo.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Apollo storage\r\n// This class provides\r\n// all the neccessery file storage functions\r\n// of Grandeur Apollo.\r\n// In order to use file storage features\r\n// you must include this file  \r\n\r\n// class declartion\r\nclass storage{\r\n\r\n    constructor(config) {\r\n          // Configuration\r\n          this.config = config;\r\n    }\r\n    uploadFile(data, callback) {\r\n        // Method to upload a file to the server's file system\r\n        this.post(\"uploadFile\", data, callback, \"form\");\r\n    }\r\n\r\n    getFileUrl(data, callback) {\r\n        // Method to fetch a file from the server's file system\r\n        this.post(\"getFileUrl\", data, callback);\r\n    }\r\n    \r\n    post(path, data, callback, format) {\r\n    \r\n        // This function will be utilized to post a data to a server\r\n        // specified through the path\r\n        var xhr = new XMLHttpRequest();\r\n        xhr.open(\"POST\", this.config.url + '/storage/' + path + '?apiKey=' + this.config.apiKey, true);\r\n\r\n        // Allow the Sessions / Cookies\r\n        xhr.withCredentials = true;\r\n\r\n        xhr.onload = function() {\r\n            // Call a function when the state changes.\r\n            try {\r\n                if (this.status == 200)\r\n                    // If request went successfully\r\n                    callback(JSON.parse(xhr.responseText), null);\r\n                else\r\n                    // If error happen\r\n                    callback(null, JSON.parse(xhr.responseText));\r\n            }\r\n            catch(err) {\r\n            }\r\n        }\r\n\r\n        xhr.onerror = function() {\r\n            // If request failed\r\n            callback(null, {code: \"ERR_CONNECTION_REFUSED\", message: \"Failed to Process the Request due to Internet Connectivity Problem.\"});\r\n        }\r\n\r\n        if(format === \"form\") {\r\n            // For uploading the file as multi-part form\r\n            // Send the request\r\n            xhr.send(data);\r\n        }\r\n        else {\r\n            // Send the proper header information along with the request\r\n            xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n            // Send the request\r\n            xhr.send(JSON.stringify(data));\r\n        }\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (storage);\n\n//# sourceURL=webpack://apollo/./src/storage.apollo.js?");

/***/ })

/******/ });