
# Grandeur

[![NPM](https://img.shields.io/npm/v/grandeur-js.svg)](https://www.npmjs.com/package/grandeur-js) 
[![Downloads/week](https://img.shields.io/npm/dw/grandeur-js.svg)](https://npmjs.org/package/grandeur-js.svg)
[![License](https://img.shields.io/npm/l/grandeur-js.svg)](https://github.com/grandeurtech/js-sdk/blob/master/package.json)

Building a smart (IoT) product is an art. It is about unifying the physical world with the digital one. When you connect a hardware to the web, magic happens. But it involves development across an immense technology stack. You need to develop your hardware, your apps to monitor/control your hardware and a server backend to manage both. Then if you are (somehow) done with the development, there comes the hardest part; you will have to scale it all as your userbase gonna grow.

We can understand this because we have been there. 

Introducing Grandeur; A backend as a service (BaaS) platform for IoT. We have designed this platform so that you do not have to worry about the backend of your next big thing and you could focus on what matters the most; your hardware and apps. It is designed specifically to accelerate your IoT product development and push your product to market in weeks rather than in months or years.

# JavaScript SDK
Grandeur can resolve all the problems that you could face in building a smart (IoT) product. Like you can authenticate users, manage devices, can store files in storage, can save data in database, host static website with builtin hosting. All it requires the integration of our platform in your technology stack.

By this time you would be like okay, we got it why Grandeur is building this platform and yeah it is super great and super useful. But how we can integrate it into our apps? So here is the answer. We have built this amazing JavaScript SDK to make the integration process of Grandeur in web apps a lot simpler. So now all you have to do is to follow the [get started](#get-started) guidelines to quickly start building your solution. 

Now to get a deep insight into our SDK and platform capabilities, you can follow the [documentation](#documentation) or get to understand the core concepts simply dive into [ecosystem](#grandeur-ecosystem) section.

- [Get Started](#get-started)
- [Example](#example)
- [Grandeur Ecosystem](#grandeur-ecosystem)
    * [Why use Grandeur as a developer?](#why-use-grandeur-cloud-as-a-developer)
    * [A brief case study](#a-brief-case-study)
    * [Concepts](#concepts)
        + [Projects](#projects)
        + [SDK](#sdk)
        + [Users and Administrator](#users-and-administrator)
        + [Devices Registry](#devices-registry)
- [Documentation](#documentation)
    * [init](#init)
    * [isConnected](#isConnected)
    * [onConnection](#onConnection)
    * [auth](#auth)
        + [register](#authregisteremail-password-displayName-phone)
        + [login](#authloginemail-password)
        + [isAuthenticated](#authisauthenticated)
        + [logout](#authlogout)
        + [updateProfile](#authupdateProfiledisplayName-displayPicture-phone)
        + [forgotPassword](#authforgotPasswordemail)
        + [changePassword](#authchangePasswordpassword)
    * [devices](#devices)
        + [get](#devicesgetfilter)
        + [count](#devicescountfilter)
        + [on](#devicesoncallback)
        + [device](#devicesdevicedeviceID)
            + [pair](#devicepair)
            + [unpair](#deviceunpair)
            + [get](#devicegetpath)
            + [set](#devicesetpath-value)
            + [on](#deviceonpath-callback)
            + [data](#devicedatagetpath)
                + [get](#devicedatagetpath)
                + [set](#devicedatasetpath-value)
                + [on](#devicedataonpath-callback)
    * [datastore](#datastore)
        + [collection](#datastorecollectionname)
            + [insert](#collectioninsertdocuments)
            + [delete](#collectiondeletefilter)
            + [update](#collectionupdatefilter-update)
            + [search](#collectionsearchfilter-projection-npage)
        + [list](#datastorelistnpage)
        + [drop](#datastoredropname)


# Get Started
Let us get to the point straight. You are all motivated and ready to dive in. So quickly go to [Grandeur](https://console.grandeur.dev/), create a new project or select a project to get the API key.

Then just simply drop the link of JavaScript SDK in a script tag inside your web app using our [CDN](https://unpkg.com/grandeur-js). 

```html
<!-- Drop the Link of CDN in your Web App -->
<script src="https://unpkg.com/grandeur-js"></script>
```
This will give you access to the global ` Grandeur ` object, through which you can initialize the SDK and get a reference to your project as shown below 

```javascript
// With global Grandeur object,
// you can simply initialize the SDK 
// with your API key and get reference 
// to your project
var project = grandeur.init("API-KEY", "SECRET-KEY");
```

Go change the world. You can now access all the amazing features of Grandeur with the reference object of your project that you just got.  Take a look at the [example](#example) to learn how to quickly build an app to get a list of devices paired to the user account.

In the end, it is important to note it comes with CORS protection in it by default. So to start communicating with the cloud platform, simply visit [settings](https://console.grandeur.dev/settings) page at cloud dashboard and whitelist the domain that your web app is using (if you are testing it locally and haven't deployed it to a domain yet, just add localhost:[port] to the allowed domains list but don't forget to remove it from a list before shipping you app in production).

# Example
Checkout the [getting started](https://www.hackster.io/amna-mir/quick-start-on-grandeur-f72555) project on our [community hub](https://www.hackster.io/grandeur) at hackster.

# Grandeur Ecosystem
The purpose behind writing is to tell you what is the thought process and psychology behind the Grandeur Platform. We believe that the first important step toward choosing a platform for your product and company is to understand how the developer designed the system. So we wanted to write about it in detail. We wanted to document how you can use this platform effectively to make your life as a developer or founder a bit simpler. So in this section, we will first illustrate why to use Grandeur as a developer, then we will present a brief case study and finally, we will write about the concepts.

## Why use Grandeur as a developer?
* It is simple to [get started](#get-started). Just create a project at the cloud dashboard and simply get a reference to your project using our SDK.
* No need to mix and match various services because it is a single spot solution for all of your needs. It has built-in support for authenticating users and device registration. You can access all the features like authentication, file storage, database and device registry from a single SDK.
* Simple pricing. [Start free](https://cloud.granduer.tech/register) and then pay as you go based on resource consumption. Checkout [pricing](https://grandeur.tech/pricing) to get more details.

## A brief case study
Suppose you are a clean tech startup and want to radicalize the home appliances market to make them more eco and user friendly. You analyzed the market, did user interviews and realized that the real problem is in the air conditioner market. Every year we produce millions of new air conditioners but the problem is that there are so many old and inefficient are already there in the market installed in our homes and offices. This is creating a big mess because firstly such an old air conditioner consumes a huge chunk of power and major cause of emissions. Nothing can be done because upgrading each single one of them is not just feasible at all economically, but in the end, it is impacting both the users and the ecosystem.
 
To resolve this issue, you decided to build an electronic solution that could be used as an extension with the old air conditioner installed in our homes. So that we could control the power consumption without an upgrade. Then you realized that you will have to provide your users with some form of interface, through which the interaction could be made. You decided to make it smart. You wanted your users to see how this new extension has saved them a lot of money by cutting down the power consumption. You also wanted your users to manually control this new extension like they should have control over how much they wanted to save. This all could be achieved IoT. You decided to build a companion app for your device.

That is where the problem started. You are a hardware startup in the end and your expertise is in building amazing electronics technology. Now you gotta deal with few more things as well. You will have to build your app and figure out how to establish the communication between hardware and app (backend of your system). You decided to hire more engineers, but you know how much of them you will have to hire? To give you an idea, you need 8+ engineers just to do backend, Like one for database, one for networking, one for API development, one for dev ops and about four for building SDK (one for each platform android, ios, web, and hardware). This makes it a package of $8000+ just to figure out the backend of your system and you haven't yet validated your product. That is bad and now you don't know what to do about it.

Then one day the sun of fate shown. You discovered a platform termed as `Grandeur`, which could just solve all of your problems. You wanted to authenticate your users, it had the auth feature in it. You needed a online storage space to store your user's profile picture, it came with builtin support for storage. You needed a database to store power consumption logs so that your users could see how much they have saved, it provided a cloud datastore service. You wanted to build a communication bridge between the hardware and the software, thank god, it's SDK was available for all the stacks like arduino, web, and mobile.

So you simply registered for the platform, created a project and started integrating your apps and hardware with the SDK. Then finally you registered your products to the platform before making them available for sale (because the platform comes with built-in security features and only allows only registered products to communicate). Your apps are now live on the store. People loved you built. You made an early entry into the market and now adding a dent to the universe.

That is the story of the team `SolDrive`. Check out their [website](https://sol-drive.com) right now and explore how are they transforming the world with Grandeur.
 
## Concepts
In this subsection, we will explore the Grandeur Platform in detail. We will see how it all works in depth. So let's get started

### Projects
To start working with Grandeur, you got to first create a new project. Project is like a workspace. We store, communicate and handle data with reference to your project. You cannot share data between two projects. `Your project works like a namespace`.

You get a an API key after creating a new project. An API key is a unique identifier of your project. You are required to provide your API key to our SDKs. Our SDK sends us your API key with every request and that is what we utilize to understand in which namespace we are supposed to execute your request. Checkout [sdk](#sdk) section in concepts to read more about it.

Our pricing applies separately to each project. So you will get free tier on every project and then you will pay for each project separately regarding what you consume.

### SDK
You use our SDK to communicate with our platform. It acts like an interface that gives you easy access to integrate our platform in your stack. Like in the case of web apps, simply drop in the link of JS SDK CDN in your codebase and then you can call functions to add features into your stack.

To start working with the SDK, you got to first include it in your code. In case of JS SDK, you can use the CDN link and for react you can download our package from NPM. Then you are required to init the SDK with API key and access. After initialization you will get the reference to your project, with which you can access all the features of Grandeur depending upon the platform. Like in case of hardware SDK, you can access features limited to the device only with authentication token. While in case of app SKDs, you can access all the features after authentication.

### Users and Administrator
In each project you can register users either through the app SDKs or through the [dashboard](https://console.grandeur.dev/accounts). You can create user to delegate the access. This means, you can provide these credentials to end users or end users can directly register themselves through your app to access features of Grandeur. This way you can build an auth layer in your apps. 

So if you are building an app with which users can control their air conditioners over web. Then they will be first required to register an account to pair devices and access data.

### Devices Registry
We have created a special datastructure in our platform to help you with connecting devices to our platform. In order to connect a hardware to our platform, you are first required to register it through our [dashboard](https://console.grandeur.dev/accounts). After registration, we provide you with a unique device id and access token. With the device id and access token, you can connect your hardware to our platform with help of our hardware SDKs.

Each of your hardware should have a unique id. You should never use same id for multiple devices because our platform automatically detects and terminates multiple connections based on a single id. You can use the device id to refer the device in the app SDKS. For instance in order to pair a device to a user, you will provide the device id to the pair function.

Each device comes with a privileged and sandboxed storage space in which you can store data specific to it in JSON format. For instance, if you have build a power meter, then the hardware can read the voltage, current and power with sensors and store it in the space. Then the app can access the data using the device id and can display or consume it in any way.

The device is very special entities and we have powered it with data driven interface. This means you can subscribe to device events from both app and hardware end. You can subscribe to changes of device meta data like device name and status. Similarly you can place event listeners on device data.

# Documentation
In this section, we will present references to each and every feature that our SDK supports. We have divided our SDK in group of functions called classes. Each class represents a feature of Grandeur. So in this section, we will also document that how can you use each and every function of Grandeur SDK.

## init
First and foremost thing that you are required to do in order to access our platform is initialization. When you drop in the link of the CDN in your app, we create a global object accessible through JS. This object can be then utilized to init the SDK with your API key and access credential. Upon init, the SDK returns you a reference to your project, through which you can access all the features of Grandeur. To understand it in depth please refer to [Projects](#projects) topic in the concepts section. To generate secret key and token please visit [settings](https://console.grandeur.dev/settings) page.

This is how you can init the SDK and can get a reference to your project

```javascript
// Get reference to the project by initializing the SDK
// with your API key
var project = grandeur.init("API-KEY", "SECRET-KEY");
```

## isConnected
Once you init the SDK and get reference to the project, the SDK tries to establish a persistent connection to the cloud platform. Establishing this persistent connection is the key because this allows us to do realtime communication with the server. Almost all of the SDK features are based on this realtime channel. This is why we have added this function, which can be utilized to verify either we are connected to the server or not. 

You can use this function as illustrated below

```javascript
// If the SDK is connected
if (project.isConnected()) {
  // Do something here 
}
else {
  // SDK is not connected
  // generate an alert here 
}
```

## onConnection
This methods let to keep track of the persistent connection that the SDK tries to establish with the cloud. As mentioned earlier, the persistent connection is the key because this allows us to do realtime communication with the server. Almost all of the SDK features are based on this realtime channel. This is why we have added this function, which can be utilized to verify either we are connected to the server or not. 

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| callback | function | a valid JS function which will be called whenever connection status changes|

This method returns the following codes in the response to the promise

* CONNECTED

  connection has been established

* DISCONNECTED

  SDK got disconnected from the server

It is important to note that the update will be directly sent without a response code. So for example if a client gets connected, you will received `CONNECTED` in the argument of callback.

The use of this method has been illustrated in the example below

```javascript
// Subscribe to the connection status
project.onConnection((status) => {
  // This callback gets fired
  // whenever the connection status
  // changes
  switch(status) {
    case "CONNECTED": 
      // SDK connected 
      console.log("Client is connected with the server");
  }
});
```

## auth
This class provides access to the auth feature of Grandeur. Simply get a reference to the auth class by calling `auth()` method with the project object. This is illustrated as below

```javascript
// Get reference to the auth class
// by calling the auth method
var auth = project.auth();
```

Now once you got the reference to the auth class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### auth.register(email, password, displayName, phone)
This method allows you to add new users to your project through SDK. To create a new user account, simply provide the user email, password, display name and phone number as an argument to this function. Unlike dashboard, where you can create a user account without validation by just filling user details in a form, registering a new user account with SDK is little bit different. Because instead of directly registering the new user, we first verify that either the user is genuine to protect you from bogus users. So when you execute this function, we automatically send a verification code to the phone number provided in the argument and returns you a promise.

With this promise, you can access the confirmation method. So you can get the verification code from user through an input tag in html and validate the user by providing it to the confirmation method. On successful validation, we return you a success message and register the user automatically.

Register function accepts the following arguments

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| email       | string      | a valid email address       |
| password    | string      | should be minimum six character long |
| displayName | string      | cannot include digits or special characters |
| phone       | string      | should start with country code and <br>cannot include spaces e.g. +923336335233 |

Register method returns the following code in form of promise

* PHONE-CODE-SENT

  verification code sent to phone number <br>and you use the confirmation method returned <br>in the response of promise to verify the user.

* PHONE-NUMBER-INVALID 

  provided phone number format is invalid

* DATA-INVALID 

  data format is invalid

* AUTH-ACCOUNT-DUPLICATE 

  email is associated to another account

* PHONE-CODE-SENDING-FAILED

  failed to send the verification code


#### confirm(code)
Once you submit the register request, we validate the data and send a code to the provided phone number. We do this to validate the user as a built in security mechanism. This is where we also return you a callback so that you could send us a confirmation request after promoting user about the code.

This function receives a single argument as illustrated below

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| code        | string      | six digit long numeric code |

Upon execution, this method returns the following code in form of promise

* AUTH-ACCOUNT-REGISTERED  

  user account has been created successfully 

* PHONE-CODE-INVALID 

  verification code is invalid

* PHONE-CODE-VERIFICATION-FAILED 

  failed to verify the verification code

* AUTH-ACCOUNT-REGISTRATION-FAILED

  failed to register the account

Account registration has been illustrated in the example below

```javascript
// Variable to hold the confirmRegistration
// method so that it could be used afterwards
var confirm = null;

// Get user data from the inputs and
// Submit request to the server
auth.register(email, password, displayName, phone).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirm = res.confirm;
  }
})

// After getting response from registration request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirm(code).then((res) => {
  // Got the response
  // Checkout the response code
  switch(res.code) {
    case "AUTH-ACCOUNT-REGISTRATION":
        // Account has been created successfully
  }
});
```

### auth.login(email, password)
This method allows you to login a user into his account. Simply provide the user email and password in the argument and execute method. The SDK will automatically obtain the auth token from the server. It is important to note that nearly all the methods of this SDK requires a user to be authenticated first. 


Login function accepts the following arguments

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| email       | string      | a valid email address       |
| password    | string      | should be minimum six character long |

Upon execution, this method returns the following code in form of promise

* AUTH-ACCOUNT-LOGGEDIN  

  user account has been authenticated successfully

* DATA-INVALID 

  data format is invalid

* AUTH-ACCOUNT-INVALID-EMAIL

  email is not associated with any account

* AUTH-ACCOUNT-INVALID-PASSWORD 

  password is invalid

* AUTH-ACCOUNT-ALREADY-LOGGEDIN 

  an account is already logged in 

* AUTH-ACCOUNT-LOGIN-FAILED  

  failed to log the user into the account

Login feature application has been illustrated in the example below

```javascript
// Get email and password from inputs
// and submit the request to the server
auth.login(email,password).then((res) => {
    // Handle response
});
```

### auth.isAuthenticated()
Often times, it is required to verify that a user account is authenticated into the application or not. This functionality can be achieved through this method. It returns a response with user profile details if user is authorized. 

The response codes are as below

* AUTH-AUTHORIZED

  user is authenticated

* AUTH-UNAUTHORIZED 

  user is not not authenticated

This is how you can use it in your application

```javascript
// Send request to the to server to check
// if user is authenticated or not
auth.isAuthenticated().then((res) => {
    // Handle the response
    switch(res.code) {
      case "AUTH-AUTHORIZED": 
        // User is authroized
        // log the user profile
        console.log(res.userProfile);
    }
});
```

### auth.logout()
This method comes handy because along with logging the user in, it is also required to logout a user when required. It serves as the most basic and important feature. 

This method returns the following codes upon execution

* AUTH-ACCOUNT-LOGGEDOUT

  user has been logged out of his account

* AUTH-UNAUTHORIZED
  
  user is not authenticated

* AUTH-ACCOUNT-LOGOUT-FAILED

  logout operation failed

This is how you can use this method in your application

```javascript
// Send the request to server to logout
// the authenticated user
auth.logout().then((res) => {
    // Handle response
});
```

### auth.updateProfile(displayName, displayPicture, phone)
A user profile gets automatically created whenever you register a new user account. This makes it really easy for you as a developer to handle data specific to user. Like you can setup display picture of a user. Which allows you present a unique experience to each user. This is why we have added this method with which you can update the profile of a authenticated user. 

Update profile function accepts the following arguments

| Name           | Type        | Description |
| :------------- | :---------- | :--------------------- |
| displayName    | string      | can only contains alphabets      |
| displayPicture | string      | should be a valid url |
| phone          | string      | should start with country code and <br>cannot include spaces e.g. +923336335233 |

All the arguments are required. It is important to note that if you execute this method with an updated phone number or in other words if a user tried to update the phone number associated with the account, then we validate the new number first by automatically sending a verification code and will return you a confirmation method in response.

Update profile method returns the following code in form of promise

* PHONE-CODE-SENT

  verification code sent to phone number <br>and you use the confirmation method returned <br>in the response of promise to verify the user.

* PHONE-NUMBER-INVALID 

  provided phone number format is invalid

* DATA-INVALID 

  data format is invalid

* AUTH-PROFILE-UPDATED

  profile has been updated

* AUTH-PROFILE-UPTODATE

  data isn't modified

* AUTH-PROFILE-UPDATE-FAILED

  failed to update the profile


#### confirm(code)
We are very particular about the phone number associated with the profile. This is why we validate the phone number whenever a user try to update it. As a result, we return you a confirm function so that you could proceed with the update profile operation after prompting the user about the verification code.

This function receives a single argument as illustrated below

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| code        | string      | six digit long numeric code |

Upon execution, this method returns the following code in form of promise

* AUTH-PROFILE-UPDATED

  profile has been updated

* PHONE-CODE-INVALID 

  verification code is invalid

* PHONE-CODE-VERIFICATION-FAILED 

  failed to verify the verification code

* AUTH-PROFILE-UPDATE-FAILED

  failed to update the profile

Use of updateProfile method has been illustrated in the example below

```javascript
// Variable to hold the confirmProfileUpdate
// method so that it could be used afterwards
var confirm = null;

// Get user data from the inputs and
// Submit request to the server
auth.updateProfile(displayName, displayPicture, phone).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirm = res.confirm;
      break;
    case "AUTH-PROFILE-UPDATED":
      // Profile has been updated
  }
})

// After getting response from update profile request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirm(code).then((res) => {
  // Got the response
  switch(res.code) {
    case "AUTH-PROFILE-UPDATED":
        // Profile has been updated
  }
});
```

### auth.forgotPassword(email)
A rather very important feature is to add forgot password option into your app. This method allows you to update the password of a user account if the user is not authenticated. We validate a user with phone authentication in this case. So just prompt user about the email account associated with the account, we will automatically send the verification code the phone number associated with the profile and after which you can submit a confirmation request.

Forgot password function accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| email | string      | a valid email address associated with profile of the user|

This method returns the following code in form of promise

* PHONE-CODE-SENT

  verification code sent to phone number <br>and you use the confirmation method returned <br>in the response of promise to verify the user.

* DATA-INVALID 

  data format is invalid

* AUTH-ACCOUNT-ALREADY-LOGGEDIN

  a user is already logged in

* PHONE-CODE-SENDING-FAILED

  failed to send code to phone number


#### confirm(code)
After submitting forgot password request, we send a verification code to the phone number associated with user's accounts. As a result, we also return you a confirm function, so that you could proceed with the forgot password operation after prompting the user about the verification code and a new password.

This function receives a single argument as illustrated below

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| code        | string      | six digit long numeric code |
| password    | string      | should be at least six character long |

Upon execution, this method returns the following code in form of promise

* AUTH-PROFILE-UPDATED

  password has been updated

* PHONE-CODE-INVALID 

  verification code is invalid

* PHONE-CODE-VERIFICATION-FAILED 

  failed to verify the verification code

* DATA-INVALID 

  data format is invalid

* AUTH-PROFILE-UPDATE-FAILED

  failed to update the profile

Use of forgotPassword method has been illustrated in the example below

```javascript
// Variable to hold the confirmForgotPassword
// method so that it could be used afterwards
var confirm = null;

// Get user data from the inputs and
// Submit request to the server
auth.forgotPassword(email).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirm = res.confirm;
  }
})

// After getting response from forgot password request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirm(code).then((res) => {
  // Got the response
  switch(res.code) {
    case "AUTH-PROFILE-UPDATED":
        // Password has been updated
  }
});
```

### auth.changePassword(password)
This method is very similar to the forgot password feature. But unlike forgot password, here it is important for a user to be logged into his account first. To ensure the security of a user account, we send a verification code to the phone number associated with user account and return you a confirmation method.

Change password function accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| password | string      | required to be minimum six character long |

This method returns the following code in form of promise

* PHONE-CODE-SENT

  verification code sent to phone number <br>and you use the confirmation method returned <br>in the response of promise to verify the user.

* DATA-INVALID 

  data format is invalid

* AUTH-UNAUTHORIZED

  user is required to be logged in

* PHONE-CODE-SENDING-FAILED

  failed to send code to phone number


#### confirm(code)
After submitting change password request, we send a verification code to the phone number associated with user's accounts. As a result, we also return you a confirmation function, so that you could proceed with the change password operation after prompting the user about the verification code.

This function receives a single argument as illustrated below

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| code        | string      | six digit long numeric code |

Upon execution, this method returns the following code in form of promise

* AUTH-PROFILE-UPDATED

  password has been updated

* PHONE-CODE-INVALID 

  verification code is invalid

* PHONE-CODE-VERIFICATION-FAILED 

  failed to verify the verification code

* AUTH-PROFILE-UPDATE-FAILED

  failed to update the profile

Use of changePassword method has been illustrated in the example below

```javascript
// Variable to hold the confirmChangePassword
// method so that it could be used afterwards
var confirm = null;

// Get user data from the inputs and
// Submit request to the server
auth.changePassword(password).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirm = res.confirm;
  }
})

// After getting response from change password request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirm(code).then((res) => {
  // Got the response
  switch(res.code) {
    case "AUTH-PROFILE-UPDATED":
        // Password has been updated
  }
});
```

## devices
This class provides access to the features associated to device. Simply get a reference to the device class by calling `devices()` method with the project object. This is illustrated as below

```javascript
// Get reference to the devices class
// by calling the device method
var devices = project.devices();
```

Now once you got the reference to the devices class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### devices.get(filter)
This method comes in handy whenever you need a list of all the devices paired to a user account. 

This function receives a single argument with which you can filter the result

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| filter        | string      | can be offline, online or empty to get disconnected, connected or all devices paired to an account |

Upon execution, this method returns the following code in form of promise

* DEVICES-LIST-FETCHED

  list of paired devices has been fetched

* DEVICES-LIST-FETCHING-FAILED

  failed to fetch the list of paird devices

Use of getUserDevices method has been illustrated in the example below

```javascript
// Submit request to the server
devices.get().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICES-LIST-FETCHED": 
      // Devices list has been fetched
      console.log(res.devices);
  }
})
```

### devices.count(filter)
This methods returns the total number of online, offline or all devices paired to a user account. 

This function receives a single argument with which you can filter the result

| Name        | Type        | Description |
| :---------- | :---------- | :--------------------- |
| filter        | string      | can be offline, online or empty to get disconnected, connected or all devices paired to an account |

Upon execution, this method returns the following code in form of promise

* DEVICES-COUNT-FETCHED

  count of devices has been fetched

* DEVICES-COUNT-FETCH-FAILED

  failed to fetch the count of devices

Use of count method has been illustrated in the example below

```javascript
// Submit request to the server
devices.count().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICES-COUNT-FETCHED": 
      // Number of online devices has been fetched
      console.log(res.nDevices);
  }
})
```

### devices.on(callback)
The best thing about Grandeur is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed event will occur. 

This methods allows you to subscribe to event related to devices list update. An event will be fired whenever a device gets paired or unpaired to a user account. 

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| callback | function | a valid JS function which will be called whenever the subscribed event gets fired |

This method returns the following codes in the response to the promise

* TOPIC-SUBSCRIBED

  event has been subscribed

It is important to note that the update will be directly sent without a response code. So for example whenever a new device will be paired, entire list will be sent as the argument in form an array.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var listener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the devices list update event of a device
devices.on(onUpdate).then((res) => {
  // Call to onDevicesList returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      listener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
listener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```
### devices.device(deviceID)
From the devices class, you can get reference to a device class by calling this function. Then you can perform various operations on a device using the device reference.

```javascript
// Get reference to the devices class
// by calling the device method
var devices = devices.device(deviceID);
```

#### device.pair() 
As documented earlier in [devices](#devices-registry) topic of concepts section that it is compulsory to pair a device with a user account before getting access to its data. Pairing feature is similar to claiming ownership over a device. When you send us a pairing request, we first verify that the device isn't paired to another account.

This method returns the following codes in response 

* DEVICE-PAIRED

  device paired successfully and access token returned

* DEVICE-ALREADY-PAIRED

  device is already paired to another account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of pair method has been illustrated in the example below

```javascript
// Submit request to the server
device.pair().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-PAIRED": 
      // Transfer the token to the device
      console.log(res);
  }
})
```  

#### device.unpair()
This method allows you to unpair a device from a user account. It simply declares that the user account no longer owns the device. In other words, it makes the device available for other users to claim. 

This method returns the following codes in response 

* DEVICE-UNPAIRED

  device paired successfully and access token returned

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of unpairDevice method has been illustrated in the example below

```javascript
// Submit request to the server
device.unpair().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-UNPAIRED": 
      // Device got unpaired with the user account
  }
})
```

#### device.get(path)
This method returns the meta data of a device like device name, product id, device id and state.

You can provide a filter to this method to return a get a single key instead of all the keys.

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path | function | can be name of key, like you can use 'status' to get the current status of device |

This method returns the following codes in response 

* DEVICE-DETAILS-FETCHED

  details has been fetched

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of get method has been illustrated in the example below 

```javascript
// Submit request to the server
device.get().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-DETAILS-FETCHED": 
      // Device details has been fetched
      console.log(res.device);
  }
})
```

#### device.set(path, value)
You can also change few fields of the device data. For example the name of the device can be changed from the SDK.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path | string | can be name of key, like you can use 'name' to set the name of the device |
| value | string | you can provide a valid value for the field that you want to update |

This method returns the following codes in response 

* DEVICE-DETAILS-UPDATED

  details has been updated

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of set method has been illustrated in the example below 

```javascript
// Submit request to the server
device.set("name", "Living Room Lamp").then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-NAME-UPDATED": 
      // Device name has been updated
  }
})
```

#### device.on(path, callback)
You can also attach a listener to device meta data. For example you can subscribe to updates on device name to automatically receive update whenever the name of device will be updated.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path  | string      | an be name of key, like you can use 'status' to subscribe to status updates of device |
| callback | function | a valid JS function which will be called whenever the subscribed event gets fired |

This method returns the following codes in the response to the promise

* TOPIC-SUBSCRIBED

  event has been subscribed

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

It is important to note that the update will be directly sent without a response code. So for example if a client updates the name of device to `New Name` then it will be received as it is in the argument of callback.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var listener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the device meta data update event of a device
device.on("name", onUpdate).then((res) => {
  // Call to onDeviceSummary returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      listener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
listener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```

#### device.data().get(path)
Each device comes with a privileged space in which you can save data. Like suppose you have build a power meter, then you can store the voltage, current and power measured by the device in this space. This data can be be set by a device and retrived by the app to be consumed/displayed to end user. 

This storage space is sanboxed, so only the paired users can request or update the data. You can store the data in json format and can also get/set individual key by specifying the path in dot notation. 

For instance if you have stored `{voltage: { vpp: 10, vrms: 7}}, current: 1}`, then you can access the current and vpp by providing `current` and `voltage.vpp` respectively in the path argument.

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path | string | can be empty or a path to a key in dot notation |

This method returns the following codes in response 

* DEVICE-DATA-FETCHED

  data has been fetched

* PATH-INVALID

  the key is undefined

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of get method has been illustrated in the example below 

```javascript
// Submit request to the server
device.data().get().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-DATA-FETCHED": 
      // Device data has been fetched
      console.log(res.data);
  }
})
```

#### device.data().set(path, value)
Just like get, you can also set the data of the device in similar way.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path | string |can be empty or a path to a key in dot notation |
| value | string | you can provide a valid value for the field that you want to update |

This method returns the following codes in response 

* DEVICE-DATA-UPDATED

  details has been updated

* DEVICE-DATA-UPDATE-FAILED

  happens when you set value to parent.child and parent is also not an object

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of set method has been illustrated in the example below 

```javascript
// Submit request to the server
device.data().set("voltage").then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-DATA-UPDATED": 
      // Device data has been updated
      console.log(res.update, res.path);
  }
})
```

#### device.data().on(path, callback)
You can also attach a listener to device data. For example if you `{voltage: { vpp: 10, vrms: 7}}, current: 1}` is stored then you can subscribe to updates on either vpp and current by providing `voltage.vpp` and `current` in path field respectively. You can subscribe to root by providing empty path.

It is important to note that it works like pattern subscription. So if you subscribed to `voltage` then you can also get an update when `voltage.vpp` will get an update. It is like the events on childs propagates to parent.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| path  | string      | an be empty or a path to a key in dot notation |
| callback | function | a valid JS function which will be called whenever the subscribed event gets fired |

This method returns the following codes in the response to the promise

* TOPIC-SUBSCRIBED

  event has been subscribed

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

The update will be directly sent. So for example if a client updates the vpp of device to `20` then you can get the same either you have subscribed to vpp or to the voltage. An additional path variable will also be provided to give you a context that where the update was originally occurred. For instace, in above example, the path will be `voltage.vpp` for event handlers on both voltage and vpp.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var listener = null;

// Function to be passed as a callback
var onUpdate = (update, path) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the data update event of a device
device.data().on("voltage", onUpdate).then((res) => {
  // Call to onDeviceSummary returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      listener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
listener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```

## datastore
Data storage is the basic requirement of a data driven application or device. We have build this feature in order to enable users to store large amount of data like logs of devices. To access this feature simply get a reference to the storage class by calling `datastore()` method with the project object. This is illustrated as below

```javascript
// Get reference to the datastore class
// by calling the datastore method
var datastore = project.datastore();
```

Now once you got the reference to the datastore class, you can simply use all the features by calling the respective methods. 

Datastore of Grandeur is based on no-sql/document based database model. So you can store documents (as knonw as records in sql) into various collections (as known as tables in sql). The document is based on JSON datastructure. Methods of this class are documented in following sections

### datastore.collection(name)
From the datastore class, you can get a reference to a collection in order to execute a query or insert new documents into it. 

```javascript
// Get reference to a collection 
var collection = datastore.collection(name);
```

It is important to note here that it is not required for a collection to pre exist in order to get reference to it. A collection automatically gets created when you insert first document into it. So you will get an error only if you queried a collection which don't contains any document. You can execute following operations on a collection

#### collection.insert(documents)
This method can be used to insert a json object/document into a collection. It accepts an array of json objects (so you can insert one or many documents into a collection with single function call). It returns the ids of inserted documents in response (we automatically assign a unique id to each document before actually inserting it into the datastore - primary key). It accepts following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| documents | array | an array of json objects |

This method returns following codes

* DATA-INVALID

  empty array is provided or collection name wasn't specified while getting the reference

* DATASTORE-DOCUMENTS-INSERTED

  documents has been inserted successfully

* DATASTORE-DOCUMENTS-INSERTION-FAILED

  failed to insert the documents into the collection

The usage of this method is illustrated in the example below

```javascript
// Define an array of json objects
var documents = [{
  voltage: 20,
  current: 2
}]

// Insert document into a collection
collection.insert(documents).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-INSERTED": 
      // Methods returns the unique ids of each
      // inserted document
      console.log(res.insertedIDs);
  }
});
```

#### collection.delete(filter)
This method can be used to delete a document from a collection. It accepts a json object which specifies the match condition and returns the count of total deleted documents. It accepts following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| filter | object | a json object which specifies the match condition of documens |

It is important to note here that running this function without specifying the match condition will result in deletion of all the documents of a collection.

This method returns following codes

* DATA-INVALID

  collection name wasn't specified while getting the reference

* DATASTORE-DOCUMENTS-NOT-FOUND

  not even a single document qualified the match condition so delete count is zero

* DATASTORE-DOCUMENTS-DELETED

  deleted the matched documents

* DATASTORE-DOCUMENTS-DELETION-FAILED

  failed to delete the documents

The usage of this method is illustrated in the example below

```javascript
// This method can be used in many ways

// Case: delete a specific document by providing
// the document id, you can use this on other 
// attributes as well
collection.delete({documentID: "id"}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-DELETED": 
      // Method returns the count
      // should be exactly 1 here
      console.log(res.deletedCount);
  }
});

// Case: delete multiple but specific documents
// Define an array of ids of documents required to
// be deleted, you can use this on other 
// attributes as well
var documentIDs = ["1", "2", "3"];

// Run operation with $in operator
collection.delete({documentID: {$in: documentIDs}}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-DELETED": 
      // Method returns the count
      // should match the length of the array
      console.log(res.deletedCount);
  }
});

// Case: delete in range
// Run operation with $lt and $gt operator on attributes
collection.delete({voltage: {$lt: 25, $gt: 30}}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-DELETED": 
      // Method returns the count
      console.log(res.deletedCount);
  }
});

// Case: delete all
// Run operation with $in operator
collection.delete().then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-DELETED": 
      // Method returns the count
      console.log(res.deletedCount);
  }
});
```

#### collection.update(filter, update)
This method can be used to update a document in a collection. It accepts a json object which specifies the match condition and returns the count of total updated documents. It accepts following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| filter | object | a json object which specifies the match condition of documens |
| update | object | a json object which specifies new values of attributes |

It is important to note here that running this function without specifying the match condition will update all the documents of a collection. This method don't overwrites the matched documents entirely but instead only replaces the matched attributes in a document with new values or adds new attributes (if none matched). In other words, if a matched document got structure similar to

```javascript
{
  voltage: 20,
  current: 2
}
```

and you run this method with update 

```javascript
{
  voltage: 30,
  power: 60
}
```

then the document will be updated to

```javascript
{
  voltage: 30,
  current: 2,
  power: 60
}
```

This method returns following codes

* DATA-INVALID

  collection name wasn't specified while getting the reference

* DATASTORE-DOCUMENTS-NOT-FOUND

  not even a single document qualified the match condition

* DATASTORE-DOCUMENTS-UPDATED

  updated the matched documents

* DATASTORE-DOCUMENTS-UPDATE-FAILED

  failed to update the documents

The usage of this method is illustrated in the example below

```javascript
// Define an update
var update = {
  voltage: 30,
  power: 60
}

// This method can be used in many ways

// Case: update a specific document by providing
// the document id, you can use this on other 
// attributes as well
collection.update({documentID: "id"}, update).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-UPDATED": 
      // Method returns the count
      // should be exactly 1 here
      console.log(res.modifiedCount);
  }
});

// Case: update multiple but specific documents
// Define an array of ids of documents required to
// be updated, you can use this on other 
// attributes as well
var documentIDs = ["1", "2", "3"];

// Run operation with $in operator
collection.update({documentID: {$in: documentIDs}}, update).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-UPDATED": : 
      // Method returns the count
      // should match the length of the array
      console.log(res.modifiedCount);
  }
});

// Case: update in range
// Run operation with $lt and $gt operator on attributes
collection.update({voltage: {$lt: 25, $gt: 30}}, update).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-UPDATED": 
      // Method returns the count
      console.log(res.modifiedCount);
  }
});
```

#### collection.search(filter, projection, nPage)
This method can be used to query documents in a collection. It accepts a match condition and fetches the documents. It accepts following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| filter | object | a json object which specifies the match condition of documents |
| projection | object | condition to specify the fields of a document to be returned or opted out |
| nPage | integer | this method returns paginated result |

It is important to note here that the method is subjected to rate limiting so maximum 20 results will be returned and then you can use page number argument of the method to get the ramining. So if you have 25 documents in a collection then calling `collection.search()` will return first 20 while calling `collection.search({}, undefined, 1)` will return the remaining 5 documents. Then it is also important to note that projection condition cannot be a empty object to instead pass `undefined` if you don't want to project out fields in matched documents. Whereas the filter can be an empty object in which case all the documents will be returned.

This method returns following codes

* DATA-INVALID

  collection name wasn't specified while getting the reference

* DATASTORE-DOCUMENTS-FETCHED

  returned the matched documents

* DATASTORE-DOCUMENTS-FETCH-FAILED

  failed to search the documents

The usage of this method is illustrated in the example below

```javascript
// This method can be used in many ways

// Case: fetch a specific document by providing
// the document id, you can use this on other 
// attributes as well
collection.search({documentID: "id"}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-FETCHED": 
      // Method returns documents
      console.log(res.documents);
  }
});

// Case: fetch multiple but specific documents
// Define an array of ids of documents. 
// you can use this on other attributes as well
var documentIDs = ["1", "2", "3"];

// Run operation with $in operator
collection.search({documentID: {$in: documentIDs}}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-FETCHED": : 
      // Method returns documents
      console.log(res.documents);
  }
});

// Case: search in range
// Run operation with $lt and $gt operator on attributes
collection.search({voltage: {$lt: 25, $gt: 30}}).then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-FETCHED": 
      // Method returns documents
      console.log(res.documents);
  }
});

// Case: fetch all documents by running an empty search
collection.search().then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-FETCHED": 
      // Method returns documents
      console.log(res.documents);
  }
});

// Case: you can specify what fields of a documents to be returned and what not to be returned by projection condition
collection.search({}, {name: 0}).then((res) => {
  // Got response from server
  // documents will contain all fields except name
  switch(res.code) {
    case "DATASTORE-DOCUMENTS-FETCHED": 
      // Method returns documents
      console.log(res.documents);
  }
});
```

### datastore.list(nPage)
This method returns the list of collections in the datastore of your project. This method accpets the following input arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| nPage | integer | this method returns paginated result |

It is important to note here that the method is subjected to rate limiting so maximum 20 results will be returned and then you can use page number argument of the method to get the ramining. So if you have 25 collections then calling `datastore.listCollections()` will return first 20 while calling `datastore.listCollections(1)` will return the remaining 5 collections.

This method returns the following codes.

* DATASTORE-COLLECTIONS-FETCHED

  list has been fetched

* DATASTORE-COLLECTIONS-FETCH-FAILED

  failed to get the list due to an error

The usage of this method is illustrated in the example below

```javascript
// Get the list of collections
datastore.list().then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-COLLECTIONS-FETCHED": 
      // List has been returned
      console.log(res.collections);
  }
});
```

### datastore.drop(name)
This method deletes a collections and all of its documents from the datastore of your project. This method accpets the following input arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| collection | strong | name of the collection which is required to be dropped |

It is important to note here that the method deletes all the documents associated with a collection.

This method returns the following codes.

* DATASTORE-COLLECTION-DROPPED

  collection has been dropped

* DATASTORE-COLLECTION-NOT-FOUND

  collection name is invalid

* DATASTORE-COLLECTION-DROPPING-FAILED

  failed to delete the collection due to an error

The usage of this method is illustrated in the example below

```javascript
// Get the list of collections
datastore.drop("logs").then((res) => {
  // Got response from server
  switch(res.code) {
    case "DATASTORE-COLLECTION-DROPPED": 
      // Collection has been dropped
  }
});
```