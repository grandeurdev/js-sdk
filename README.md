
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)
We are making it easier for you to build internet of things based smart products with our cloud platform and software development kit. [Let`s Sign Up] and create something amazing rightnow!
### API DOCUMENTATION
####  1. JavaScript SDK
JavaScript SDK provides functions which will be used to communicate with **Grandeur Cloud** from the front-end of your application.
JavaScript SDK currently supports 3 modules.
1. ##### Auth
Auth module provides major authentication functionalities.
 -  `register` (This function sends verify code and register request with registration data to the server.
 -  `sendCode` (This function sends send code request with provided data to the server).
 -  `login` (This function sends login a user request with required data to the server).
 -  `isAuthenticated` (This function sends check if a user`s logged in request with required data to the server).
 -  `logout` (This function sends logout the user request to the server).

2. ##### Device
Device module provides all the device functionalities.

 -  `pairDevice` (Method to send request for pairing a device with this User ID).
 -  `unpairDevice` (Method to unpair a device from the user ID).
 -  `getUserDevices` (Method to list all devices paired to user ID).
 -  `getOnlineDevicesCount` (Method to count all online devices paired to user ID).
 -  `getDeviceSummary` (Method to request a particular device`s summary).
 -  `getDeviceParms` (Method to request a particular device`s parms).
 -  `setDeviceSummary` (Method to update a particular device`s summary).
 -  `setDeviceParms` (Method to update a particular device`s parms).
 -  `getDeviceDetails` (Method to request a particular device`s details).
 -  `setDeviceName` (Method to update a particular device`s name).
 -  `getDeviceStatus` (Method to request a particular device`s online status).

3. ###### Storage
Storage module provides basic storage functionalities.

 -  `pairDevice` (Method to upload a file to the server`s file system).
 -  `getFileUrl` (Method to fetch a file from the server`s file system).


### Get Started
To get started with **Apollo JavaScript SDK**, you first need to add add a reference link to CDN file.
For example :
```javascript
<script src="https://xyz.com/grandeur.apollo.js">
// place this tag at the end of your body.
</script>
```
Now you can create a new **Apollo** project with a API-KEY which can be accessed after creating a new account at Grandeur Cloud Dashbaord.
How to do that? Here is an example for you.
```javascript
var apolloProject = apollo.init("YOUR-APIKEY-HERE");
// initalize's your project with your respected token.
```
Now you can access all the amazing features of Grandeur Cloud and can change the world!

#### 
Auth provides a basic functionality to authenticate a user to **Grandeur Cloud**(Grandeur Apollo).
**Auth** can be used simply by calling `.auth()` of **apolloProject** created above.
```javascript
var auth = apolloProject.auth();
// creates an auth object which can
// be used further.
```
We will see more in the examples below.
##### register
Register a new user in a single step with this function.
In order to **register** you first have to use sendCode function. 
###### sendCode
`sendCode` authenticates a user with **one time code**, whenever this function is called a code has been sent to the specific user in order to **register** a new account. it returns a **token** will later on can be used to match with code sent to the user.
`sendCode` function requires email, password, display name and mobile number in order to work.
Here is a working example on how to use send code :
<table>
<tr>
<th> Code </th>
<th> Description </th>
</tr>
<tr>
<td>

```javascript
auth.sendCode(email,password,displayName,mobile).
then(res=>{
    // response can be fetched here.
    // response codes are given below.
});
```

</td>
<td>

```javascript
// sendCode() only accepts a valid email.
// valid : abc@xyz.com
// invalid : @.cij@aaa.c
// password have minumum 6 characters long.
// displayName can only have characters.
// mobile number must start with country code
// i.e +923331234567
// res.token contains token you need to verify
```

</td>
</tr>
</table>

**Response codes for `sendCode`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>PHONE-CODE-SENT</td>
<td>Verification code is successfully sent to the phone number.</td>
</tr>
<tr>
<td>PHONE-CODE-SENDING-FAILED</td>
<td>Verification code could not be sent to the phone number.</td>
</tr>
<tr>
<td>AUTH-ACCOUNT-DUPLICATE</td>
<td>Email is already registered with our server.</td>
</tr>
<tr>
<td>AUTH-ACCOUNT-DUPLICATE</td>
<td>A profile already exists with this email.</td>
</tr>
</table>

Afterwards **register** can be called when you already have the token.

**Register** function needs a token which was returned by **sendCode**() and a code which is give by the user.
<table>
<tr>
<th> Code </th>
<th> Description </th>
</tr>
<tr>
<td>

```javascript
var auth = apolloProject.auth();
auth.register(token,code).then(res=>{
    console.log(res);
    // response can be fetched here.
    // response codes are given below
   });
```
</td>
<td>

```javascript
// token must be valid (fetched previously by sendCode())
// code was sent to the user and collected from the
// user

```

</td>
</tr>
</table>

**Response codes for `register`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-REGISTERED</td>
<td>User Account is successfully created.</td>
</tr>
<tr>
<td>AUTH-ACCOUNT-REGISTRATION-FAILED</td>
<td>User's new account could not be created.</td>
</tr>
<tr>
<td>DATA-INVALID</td>
<td>Both email and password need to have a valid format.</td>
</tr>
</table>

#### Login

> login ( email: *string*, password: *string*) : returns *Promise*

Loging in the user is the basic functionality of authentication so we made
it easier for you.
In order to **login** you just have to pass email and password to the login() function. Here is a working example for you :

```javascript
var auth = apolloProject.auth();
auth.login(email,password).then(res=>{
    console.log(res);
    // response can be fetched here.
    // response codes are given below
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>email</td>
    <td><em>string</em></td>
    <td>a formatted email address</td>
  </tr>
  <tr>
    <td>password</td>
    <td><em>string</em></td>
    <td>minimum 6 characters long</td>
  </tr>
</table>

**Response codes for `login`** :
<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-LOGGEDIN</>
    <td>User is successfully logged into its account</td>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-LOGIN-FAILED</td>
    <td>User could not be logged into its account.</td>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-INVALID-PASSWORD</td>
    <td>Password entered by the user is incorrect.</td>
  </tr>
  <tr>
    <td>DATA-INVALID</td>
    <td>Both email and password need to have a valid format.</td>
  </tr>
</table>

#### Is Authenticated
> isAuthenticated ( ) : returns *Promise*

This function is used to check if a user is authorized or not. It returns a respose with user profile if user is authorized and if user is not authorized it returns a response with a code **user-unauthorized**
How to do that? Here it is : 
```javascript
var auth = apolloProject.auth();
auth.isAuthenticated().then(res=>{
    console.log(res);
     // response can be fetched here.
    // response codes are given below
});
```
**Response codes for `isAuthenticated`** :
<table>
 <tr>
  <th>Code</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>AUTH-AUTHORIZED</td>
  <td>Here's the user's data: (Data can be fetched from here) </td>
 </tr>
 <tr>
  <td>AUTH-UNAUTHORIZED</td>
  <td>You are not logged into your account.</td>
 </tr>
</table>


##### Logout
> logout ( ) : returns *Promise*

This simple function is called whenever user needed to be logged out.

```javascript
var auth = apolloProject.auth();
auth.logout().then(res=>{
        // response can be fetched here.
        // response codes are given below 
});
```

**Response codes for `logout`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-LOGGEDOUT</td>
<td>You are successfully Logged out of your account. </td>
</tr>
</table>

#### Device
Device module provides all of the device features i.e if you want to pair or unpair a device, you need to add device module to your application.
**Device** can be used simply by calling **.device()** of **apolloProject** created above.

```javascript
var device = apolloProject.device();
// creates a device object which can
// be used further.
```

We will see that in the examples below.

#### Pair Device 
> pairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to pair a device to **Grandeur Cloud**. It asks for a **device ID** and send a request to the server to pair that specific device.  
Here is a working example :

```javascript
var device = apolloProject.device();
device.pairDevice(deviceID).then(res => {
        // response can be fetched here.
        // response codes are given below 
}); 
```
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

**Response codes for `pairDevice`** :
<table>
 <tr>
  <th>Code</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>DEVICE-PAIRED</td>
  <td>Device is successfully paired with the user account. </td>
 </tr>
 <tr>
  <td>DEVICE-ALREADY-PAIRED</td>
  <td>Device is already paired. </td>
 </tr>
 <tr>
  <td>DEVICE-ID-INVALID</td>
  <td>Device ID is not registered with the project.</td>
 </tr>
 <tr>
  <td>DATA-INVALID</td>
  <td>Device ID is required for pairing it.</td>
 </tr>
</table>

#### Unpair Device 
> unpairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to unpair a device to **Grandeur Cloud (Grandeur Apollo)**. It asks for a **device ID** and send a request to the server to pair that specific device.  
Here is a working example :


```javascript
var device = apolloProject.device();
device.unpairDevice(deviceID).then(res => {
        // response can be fetched here.
        // response codes are given below.
}); 
```

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

**Response codes for `unpairDevice`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-UNPAIRED</td>
<td>Device is successfully unpaired with the user account. </td>
</tr>
<td>DEVICE-ID-INVALID</td>
<td>Device ID is not registered with the project.</td>
</tr>
<tr>
<td>DATA-INVALID</td>
<td>Device ID is required for pairing it.</td>
</tr>
</table>

#### Get User Devices 
> getUserDevices ( ) : returns *Promise*

This function returns a **list of all the paired devices** with the current** authenticated ID**.   
Here is a working example :
```javascript
var device = apolloProject.device();
device.getUserDevices().then(res => {
        // response can be fetched here.
        // response codes are given below.
});
```

**Response codes for `getUserDevices`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-LIST-FETCHED</td>
<td>List of requested devices is successfully fetched.</td>
</tr>
</table>

#### Get Online Devices Count 
> getOnlineDevicesCount ( ) : returns *Promise*

This function returns a **list of all the online devices** with the current **authenticated ID**.   
Here is a working example :

```javascript
var device = apolloProject.device();
device.getOnlineDevicesCount().then(res => {
        // response can be fetched here.
        // response codes are given below.
});
```

**Response codes for `getOnlineDevicesCount`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-ONLINE-COUNT-FETCHED</td>
<td>Number of online devices is successfully fetched.</td>
</tr>
</table>

#### Get Device Summary 
> getDeviceSummary( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns a payload which includes data summary of that specific device.
Here is a working example :
```javascript
var device = apolloProject.device();
device.getDeviceSummary(deviceID).then(res => {
        console.log(res);
        // response can be fetched here.
        // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

**Response codes for `getDeviceSummary`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-FETCHED</td>
<td>Summary for the device is successfully fetched.</td>
</tr>
</table>

#### Get Device Parms 
> getDeviceParms( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the parameters of that specific device.
Here is a working example :
```javascript
var device=apolloProject.device();
device.getDeviceParms(deviceID).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

**Response codes for `getDeviceParms`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-FETCHED</td>
<td>Parms for the device are successfully fetched.</td>
</tr>
</table>

#### Set Device Summary 
setDeviceSummary (deviceID : *string*, summary : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes summary parameters.
Here is a working example :
```javascript
var device=apolloProject.device();
var summary = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceSummary(deviceID, summary).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>summary</td>
    <td><em>JSON Object</em></td>
    <td>A JSON object with all the summary parameters needed to set.</td>
  </tr>
</table>

**Response codes for `setDeviceSummary`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-UPDATED</td>
<td>Summary for the device is successfully updated.</td>
</tr>
</table>

#### Set Device Parms 
setDeviceParms (deviceID : *string*, params : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes device parameters needed to set.
Here is a working example :
```javascript
var device = apolloProject.device();
var params = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceParms(deviceID, params).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>params</td>
    <td><em>JSON Object</em></td>
    <td>A JSON object with all the parameters needed to set with the values.</td>
  </tr>
</table>

**Response codes for `setDeviceParms`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-UPDATED</td>
<td>Parms for the device are successfully updated.</td>
</tr>
</table>


#### Get Device Details 
getDeviceDetails (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the details of that specific device.
Here is a working example :
```javascript
var device=apolloProject.device();
device.getDeviceDetails(deviceID).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
</table>

**Response codes for `getDeviceDetails`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-DETAILS-FETCHED</td>
<td>Details of the device are successfully fetched.</td>
</tr>
</table>

#### Set Device Name 
setDeviceName (deviceID : *string*, newName : *string*) : returns *Promise*

This function asks for a **device ID** and **a new name** and then it sets a new name for that specific device.
Here is a working example :
```javascript
var device = apolloProject.device();
var newName = "newDeviceName";
device.setDeviceName(deviceID, newName).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>newName</td>
    <td><em>string</em></td>
    <td>A new name for that device.</td>
  </tr>
</table>

**Response codes for `setDeviceName`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-NAME-UPDATED</td>
<td>Name of the device is successfully updated.</td>
</tr>
</table>

#### Get Device Status 
getDeviceStatus (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and it returns a payload which the current device status of that specific device.
Here is a working example :
```javascript
var device = apolloProject.device();
device.getDeviceStatus(deviceID).then(res => {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
**Parameters :**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
</table>

**Response codes for `getDeviceStatus`** :
<table>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-STATUS-FETCHED</td>
<td>Status of the device is successfully fetched.</td>
</tr>
</table>


#### Storage
This module is used to access all the storage features of **Grandeur Cloud** i.e to upload or download a file.

##### uploadFile 
This function asks for a **file** and **file name** and uploads that file to the server.
Here is a working example :
```javascript
var files=apolloProject.storage();
files.uploadFile(file, filename).then(res => {
           console.log(res);
});
```
##### getFileUrl 
This function asks for a **file name** and gets that file from the server if that file exists.
Here is a working example :
```javascript
var files=apolloProject.storage();
files.uploadFile(file, filename).then(res => {
           console.log(res);
});
```


[Let`s Sign Up]: https://cloud.grandeur.tech





