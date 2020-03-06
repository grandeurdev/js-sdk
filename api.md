
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)
We are making it easier for you to build internet of things based smart products with our cloud platform and software development kit. [Let`s Sign Up] and create something amazing rightnow!
## JavaScript SDK
JavaScript SDK provides all the required features which can be used to communicate with **Grandeur Apollo** from the front-end of your application.
It has several modules i.e auth, device and storage.
### Get Started
To get started with **Apollo JavaScript SDK**, you first need to add add a reference link to CDN file.
For example :
```java
<script src="https://xyz.com/grandeur.apollo.js">
// place this tag at the end of your body.
</script>
```
Now you can create a new **Apollo** project with a API-KEY which can be accessed after creating a new account at Grandeur Cloud Dashbaord.
How to do that? Here is an example for you.
```java
var apolloProject = apollo.init("YOUR-APIKEY-HERE");
// initalize's your project with your respected token.
```
Now you can access all the amazing features of Grandeur Cloud and can change the world!

- #### Auth
Auth provides a basic functionality to `authenticate` a user to **Grandeur Cloud**(Grandeur Apollo).
**Auth** can be used simply by calling `.auth()` of **apolloProject** created above.
```java
var auth = apolloProject.auth();
// creates an auth object which can
// be used further.
```
We will see more in the examples below.
1. ##### register
Register a new user in a single step with this function.
In order to **register** you first have to use sendCode function. 
###### sendCode
**sendCode** authenticates a user with **one time code**, whenever this function is called a code has been sent to the specific user in order to **register** a new account. it returns a **token** will later on can be used to match with code sent to the user.
**sendCode** function requires email, password, display name and mobile number in order to work.
Here is a working example on how to use send code :
<table>
<tr>
<th> Code </th>
<th> Description </th>
</tr>
<tr>
<td>

```java
auth.sendCode(email,password,displayName,mobile).
then(res=>{
    // response can be fetched here.
    // response codes are given below.
});
```

</td>
<td>

```java
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
<td><pre>PHONE-CODE-SENT</pre></td>
<td>Verification code is successfully sent to the phone number.</td>
</tr>
<tr>
<td><pre>PHONE-CODE-SENDING-FAILED</pre></td>
<td>Verification code could not be sent to the phone number.</td>
</tr>
<tr>
<td><pre>AUTH-ACCOUNT-DUPLICATE</pre></td>
<td>Email is already registered with our server.</td>
</tr>
<tr>
<td><pre>AUTH-ACCOUNT-DUPLICATE</pre></td>
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

```java
auth.register(token,code).then(res=>{
    console.log(res);
    // response can be fetched here.
    // response codes are given below
   });
```
</td>
<td>

```java
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
<td><pre>AUTH-ACCOUNT-REGISTERED</pre></td>
<td>User Account is successfully created.</td>
</tr>
<tr>
<td><pre>AUTH-ACCOUNT-REGISTRATION-FAILED</pre></td>
<td>User's new account could not be created.</td>
</tr>
</table>

2. ##### login
Loging in the user is the basic functionality of authentication so we made
it easier for you.
In order to **login** you just have to pass email and password to the login() function. Here is a working example for you :

```java
var auth = apolloProject.auth();
auth.login(email,password).then(res=>{
    console.log(res);
    // response will be printed on console that If user
	// logged in or not with the response code.
});
```
Login function returns a promise which can be used accordingly.

3. ##### isAuthenticated
This function is used to check if a user is authorized or not. It returns a respose with user profile if user is authorized and if user is not authorized it returns a response with a code **user-unauthorized**
How to do that? Here it is : 
```java
var auth = apolloProject.auth();
auth.isAuthenticated().then(res=>{
    console.log(res);
    // response will be printed on console that If user
	// logged in or not with the response code.
});
```
4. ##### logout
This simple function is called whenever user needed to be logged out.
This function returns a **simple response** with the code **AUTH-ACCOUNT-LOGGEDOUT**.
```java
var auth = apolloProject.auth();
auth.logout().then(res=>{
          if(res.code == "AUTH-ACCOUNT-LOGGEDOUT" ) {
              // Sucessfully Logged Out
			  console.log(res);
          }
});
```
- #### Device
Device module provides all of the device features i.e if you want to pair or unpair a device, you need to add device module to your application.
**Device** can be used simply by calling **.device()** of **apolloProject** created above.
We will see that in the examples below.

1. ##### pairDevice 
This function is simply used to pair a device to **Grandeur Cloud (Grandeur Apollo)**. It asks for a **device ID** and send a request to the server to pair that specific device.  
Here is a working example :
```java
var device=apolloProject.device();
device.pairDevice(deviceID).then(res => {
          console.log(res); 
}); 
```
2. ##### unpairDevice 
This function is simply used to unpair a device to **Grandeur Cloud (Grandeur Apollo)**. It asks for a **device ID** and send a request to the server to pair that specific device.  
Here is a working example :
```java
var device=apolloProject.device();
device.unpairDevice(deviceID).then(res => {
          console.log(res); 
}); 
```
3. ##### getUserDevices 
This function returns a **list of all the paired devices** with the current** authenticated ID**.   
Here is a working example :
```java
var device=apolloProject.device();
device.getUserDevices().then(res => {
           console.log(res);
});
```
4. ##### getOnlineDevicesCount 
This function returns a **list of all the online devices** with the current** authenticated ID**.   
Here is a working example :
```java
var device=apolloProject.device();
device.getOnlineDevicesCount().then(res => {
           console.log(res);
});
```
5. ##### getDeviceSummary 
This function asks for a **device ID** and returns a payload which includes data summary of that specific device.
Here is a working example :
```java
var device=apolloProject.device();
device.getDeviceSummary(deviceID).then(res => {
           console.log(res);
});
```
6. ##### getDeviceParms 
This function asks for a **device ID** and returns the payload which includes all the parameters of that specific device.
Here is a working example :
```java
var device=apolloProject.device();
device.getDeviceParms(deviceID).then(res => {
           console.log(res);
});
```
7. ##### setDeviceSummary 
This function asks for a **device ID** and a **JSON object** which includes summary parameters.
Here is a working example :
```java
var device=apolloProject.device();
var summary = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceSummary(deviceID, summary).then(res => {
           console.log(res);
});
```
8. ##### setDeviceParms 
This function asks for a **device ID** and a **JSON object** which includes device parameters.
Here is a working example :
```java
var device = apolloProject.device();
var params = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceParms(deviceID, params).then(res => {
           console.log(res);
});
```
9. ##### setDeviceName 
This function asks for a **device ID** and **a new name** and then it sets a new name for that specific device.
Here is a working example :
```java
var device = apolloProject.device();
var newName = "aNewTempName";
device.setDeviceName(deviceID, newName).then(res => {
           console.log(res);
});
```
9. ##### getDeviceStatus 
This function asks for a **device ID** and it returns a payload which the current device status of that specific device.
Here is a working example :
```java
var device = apolloProject.device();
device.getDeviceStatus(deviceID).then(res => {
           console.log(res);
});
```
- #### Storage
This module is used to access all the storage features of **Grandeur Cloud** i.e to upload or download a file.

1. ##### uploadFile 
This function asks for a **file** and **file name** and uploads that file to the server.
Here is a working example :
```java
var files=apolloProject.storage();
files.uploadFile(file, filename).then(res => {
           console.log(res);
});
```
2. ##### getFileUrl 
This function asks for a **file name** and gets that file from the server if that file exists.
Here is a working example :
```java
var files=apolloProject.storage();
files.uploadFile(file, filename).then(res => {
           console.log(res);
});
```
