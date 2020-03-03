
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)
We are making it easier for you to build internet of things based smart products with our cloud platform and software development kit. [Let`s Sign Up] and create something amazing rightnow!
## JavaScript SDK
JavaScript SDK provides all the required features which can be used to communicate with **Grandeur Apollo** from the front-end of your application.
It has several modules i.e auth, device and storage.
### Get Started
To get started with **Apollo JavaScript SDK**, you first need to create a new **Apollo** project with a valid token which will be provided by Grandeur.
How to do that? Here is an example for you.
```java
var apolloProject = apollo.init("your token here");
// initalize's your project with your respected token.
```
Now you can access all the amazing features of Grandeur Cloud and can change the world!

- #### Auth
Auth provides a basic functionality to authenticate a user to **Grandeur Cloud**(Grandeur Apollo).
**Auth** can be used simply by calling **.auth()** of **apolloProject** created above.
We will see that in the examples below.

1. ##### register
Register a new user in a single step with this function.
In order to **register** you first have to use sendCode function. 
###### sendCode
**sendCode** authenticates a user with **one time code**, whenever this function is called a code has been sent to the specific user in order to **register** a new account. it returns a **token** will later on can be used to match with code sent to the user.
**sendCode** function requires email, password, display name and mobile number in order to work.
Here is a working example on how to use send code :
```java
var auth = apolloProject.auth();
auth().sendCode(email,password,displayName,mobile).then(res=>{
    console.log(res);
    // response will be printed on console.
    // response.token contains the token you have to pass to the register
	// function
});
```
Afterwards **register** can be called when you already have the token.

**Register** function needs a token which was returned by **sendCode**() and a code which is give by the user.
```java
var auth = apolloProject.auth();
auth().register(token,code).then(res=>{
    console.log(res);
    // response will be printed on console.
   });
```

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
2. ##### getUserDevices 
This function gets a **list of all the paired devices** with the** authenticated ID**.   
Here is a working example :
```java
var device=apolloProject.device();
device.getUserDevices().then(res => {
           console.log(res);
});
```


