
# Grandeur Cloud

[![NPM](https://img.shields.io/npm/v/@grandeurcloud/apollo.svg)](https://www.npmjs.com/package/@grandeurcloud/apollo) 
[![Downloads/week](https://img.shields.io/npm/dw/@grandeurcloud/apollo.svg)](https://npmjs.org/package/@grandeurcloud/apollo)
[![License](https://img.shields.io/npm/l/@grandeurcloud/apollo.svg)](https://github.com/grandeurtech/grandeurcloud-js-sdk/blob/master/package.json)

Building a smart (IoT) product is an art. It is about unifying the physical world with the digital one. When you connect a hardware to the web, magic happens. But it involves development across a huge technology stack (you need to develop your hardware, your apps to monitor/control your hardware and a server backend to manage both) to make such products work in production. Then if you are (somehow) done with the development, there comes the hardest part; you will have to scale it all as your userbase gonna grow.

We can understand this because we have been there. 

Introducing Grandeur Cloud; A backend as a service (BaaS) platform for IoT. We have designed this platform so that you do not have to worry about the backend of your next big thing and you could focus on what matters the most; your hardware and apps. It is designed specifically to accelerate your IoT product development and push your product to market in weeks rather than in months or years.

# JavaScript SDK
Grandeur Cloud can resolve all the problems that you could face in building a smart (IoT) product. Like you can authenticate users, can store files in storage, can save data in database, host static website with builtin hosting and can subscribe to events from hardware and app to do realtime communication with the cloud platform. All it requires the integration of our platform in your technology stack.

By this time you would be like okay, we got it why Grandeur is building this platform and yeah it is super great and super useful. But how we can integrate it into our apps? So here is the answer. We have built this amazing JavaScript SDK to make the integration process of Grandeur Cloud in web apps a lot simpler. So now all you have to do is to follow the [get started](#get-started) guidelines to quickly start building your solution. 

Now to get a deep insight into our SDK and platform capabilities, you can follow the [documentation](#documentation) or get to understand the core concepts simply dive into [ecosystem](#grandeur-ecosystem) section.

- [Get Started](#get-started)
- [Example](#example)
- [Grandeur Ecosystem](#grandeur-ecosystem)
    * [Why use Grandeur Cloud as a developer?](#why-use-grandeur-cloud-as-a-developer)
    * [A brief case study](#a-brief-case-study)
    * [Concepts](#concepts)
        + [Projects](#projects)
        + [SDK](#sdk)
        + [Users and Administrator](#users-and-administrator)
        + [Devices Registry](#devices-registry)
        + [Authentication and Access](#authentication-and-access)
        + [Networking](#networking)
        + [Allowed Origins](#allowed-origins)
- [Documentation](#documentation)
    * [init](#init)
    * [isConnected](#isConnected)
    * [onConnection](#onConnection)
    * [auth](#auth)
        + [register](#register)
        + [login](#login)
        + [isAuthenticated](#isAuthenticated)
        + [logout](#logout)
        + [updateProfile](#updateProfile)
        + [forgotPassword](#forgotPassword)
        + [changePassword](#changePassword)
    * [devices](#devices)
        + [list](#list)
        + [onlineCount](#onlineCount)
        + [onList](#onList)
        + [device](#device)
            + [pair](#pair)
            + [unpair](#unpair)
            + [getSummary](#getSummary)
            + [getParms](#getParms)
            + [setSummary](#setSummary)
            + [setParms](#setParms)
            + [getDetails](#getDetails)
            + [getName](#getName)
            + [getStatus](#getStatus)
            + [onSummary](#onSummary)
            + [onParms](#onParms)
            + [onName](#onName)
            + [onStatus](#onStatus)
    * [storage](#storage)
        + [uploadFile](#uploadFile)
        + [getFileUrl](#getFileUrl)


# Get Started
Let us get to the point straight. You are all motivated and ready to dive in. So quickly go to [Grandeur Cloud](https://cloud.grandeur.tech/), create a new project or select a project to get the API key.

![Select a project at Grandeur Cloud Dashboard](/images/select-project.JPG)

Then just simply drop the link of JavaScript SDK in a script tag inside your web app using our [CDN](https://unpkg.com/@grandeurcloud/apollo). 

```html
<!-- Drop the Link of CDN in your Web App -->
<script src="https://unpkg.com/@grandeurcloud/apollo"></script>
```
This will give you access to the global ` Apollo ` object, through which you can initialize the SDK and get a reference to your project as shown below 

```javascript
// With global Apollo object,
// you can simply initialize the SDK 
// with your API key and get reference 
// to your project
var apolloProject = apollo.init("YOUR-APIKEY", "ACCESS-KEY", "ACCESS-TOKEN");
```

Go change the world. You can now access all the amazing features of Grandeur Cloud with the reference object of your project that you just got.  Take a look at the [example](#example) to learn how to quickly build an app to get a list of devices paired to the user account.

In the end, it is important to note it comes with CORS protection in it by default. So to start communicating with the cloud platform, simply visit [settings](https://cloud.grandeur.tech/settings) page at cloud dashboard and whitelist the domain that your web app is using (if you are testing it locally and haven't deployed it to a domain yet, just add localhost:[port] to the allowed domains list but don't forget to remove it from a list before shipping you app in production).

# Example
Now when you know how to get started with Grandeur Cloud, it is time to dive into bit depth. In this example, we will be building a web app to toggle the state of a device paired to a user account. So start building and follow the steps

1. Start a new Project
  
    To take a start first create a new project by visiting the cloud dashboard. Note the API key and create a new directory (we will call it `workspace` from now own) in your local system.

2. Create the index page of the app

    Now once you are done with creating your workspace, create a new file in it and name it to `index.html` and open it in any editor of your choice. Add the following code to it and save it.

    ```html
    <!-- Index.html -->
    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>
      </head>
      
      <!-- Body -->
      <body>
        <!-- Heading -->
        <h1>First Grandeur App</h1>
      </body>
    </html>  
    ```

    This is a quite basic HTML page. We have just added a heading to the body and custom title of the page. So now to open the page in the browser we will have to run a local server. We can do this easily with `Node.js` by installing a package called `http-server` (to learn more about it check out this [tutorial](https://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server)). So now simply open a command prompt in your workspace and run the command as shown below

    ```
    $ http-server

    Starting up http-server, serving ./
    Available on:
      http://192.168.0.5:8080
      http://127.0.0.1:8080
    Hit CTRL-C to stop the server
    ```

    and now you can navigate to `localhost:8080` in your browser to access the page that you just created.

3. Get reference to the project in the app
    
    After creating the file just drop in the link to of the CDN in the app header. Then create a new file `main.js` and open it in any editor of your choice. Finally include the `main.js` file in `index.html` and get a reference to the project by initializing the SDK inside the js file that we just added to the workspace. So the updated code is as below

    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://unpkg.com/@grandeurcloud/apollo"></script>
      </head>
      
      <!-- Body -->
      <body>
        <!-- Heading -->
        <h1>First Grandeur App</h1>

        <!-- Script -->
        <script src="./main.js"></script>
      </body>
    </html>  
    ```

    ```javascript
    // main.js

    // Initialize the SDK and get
    // a reference to the project
    var apolloProject = apollo.init("YOUR-APIKEY", "ACCESS-KEY", "ACCESS-TOKEN");
    ```
    
    You can get your accessKey and accessToken from security section of the [settings](https://cloud.grandeur.tech/settings) page.

    At this step, you will probably also have to allow the domain `localhost:8080` in the cross-origin access policy. You can do this by visiting [settings](https://cloud.grandeur.tech/settings) page at the cloud dashboard. Without following this step, your application will not be allowed to communicate to the cloud.

4. Authenticate a user

    Now is the time to add magic to the app. The first step is to add a user to your project through [accounts](https://https://cloud.grandeur.tech/accounts) page of dashboard application. Then to authentication feature to app, we will have to add a form and on form submit we will call a JS function where we will send a request to the cloud platform. The updated code is as below

    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://unpkg.com/@grandeurcloud/apollo"></script>
      </head>
      
      <!-- Body -->
      <body>
        <!-- Heading -->
        <h1>First Grandeur App</h1>

        <!-- Description -->
        <p>Login with the form below and then you can list the devices paired to your account.</p>

        <!-- Login Form -->
        <form onSubmit="loginUser(); return false;">
          <!-- Email -->
          <input type="email" name="email" id="email" placeholder="Email" required/>

          <!-- Password -->
          <input type="password" name="password" id="password" placeholder="Password" required/>

          <!-- Submit -->
          <input type="submit" value="Login" />
        </form>

        <!-- Script -->
        <script src="./main.js"></script>
      </body>
    </html>  
    ```

    ```javascript
    // main.js
    
    // Initialize the SDK and get
    // a reference to the project
    var apolloProject = apollo.init("YOUR-APIKEY", "ACCESS-KEY", "ACCESS-TOKEN");

    // Function to login user
    var loginUser = async () => {
      // Get email and password
      // from the form
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      
      // Get reference to the auth class
      var auth = apolloProject.auth();

      // Use try and catch block in order to 
      // use async await otherwise promises are also supported
      try {
        // Submit request
        var res = await auth.login(email, password);

        // Got the response to login request
        // so log it in console
        console.log(res);

        // Generate an alert
        switch(res.code) {
          case "AUTH-ACCOUNT-LOGGEDIN": 
            // User Authenticated
            alert("Success: User Authenticated");
            break;

          case "DATA-INVALID": 
            // Logging failed due
            // to invalid data
            alert("Error: Email or Password is invalid");
        }
      }
      catch(err) {
        // Error usually got generated when
        // we are not connected to the internet
        // Log the error to the console
        console.log(err);

        // Generate an alert
        alert("Error: Failed to authenticate the user");
      }
    }
    ```
5. Register a new device

    To configure the state of a device, the first step is to register one (If you already have a device in your project and it is paired to a user account then you can skip this step). To do this, create a new model first and then register a new device (a model is like a template which defines the schema with which the device database will be initialized on device registration). Eventually, pair the newly registered device with a user account. This all can be done through [devices](https://cloud.grandeur.tech/devices) of the dashboard application. 

6. Add list all paired devices and logout button

    Now when we are done registering a new device to our project, it is time to implement the update device state and logout feature. So where the former feature will allow a user to the state parameter of a device paired to the user account, the later feature will ultimately allow him to log out of his account. For this purpose, we will first add two buttons to the index page and then we will link them to the JS functions. Before moving on, it is important to decide where should the data saved in the device namespace, either in the Summary or the Parms (a device database can store/classify data in two objects by default)? This question answered in [devices registry](#devices-registry) topic of the concepts section. So we will be store the state in the parameter object. So now in the `toggleDeviceState()` function, we will first query the server about the current state and then we will send a request to update the state. The updated code is as below
    
    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://unpkg.com/@grandeurcloud/apollo"></script>
      </head>
      
      <!-- Body -->
      <body>
        <!-- Heading -->
        <h1>First Grandeur App</h1>

        <!-- Description -->
        <p>Login with the form below and then you can list the devices paired to your account.</p>

        <!-- Login Form -->
        <form onsubmit="loginUser(); return false;">
          <!-- Email -->
          <input type="email" name="email" id="email" placeholder="Email" required/>

          <!-- Password -->
          <input type="password" name="password" id="password" placeholder="Password" required/>

          <!-- Submit -->
          <input type="submit" value="Login" />
        </form>

        <!-- Update Button -->
        <button onclick="toggleDeviceState();">Toggle Device State</button>

        <!-- Logout Button -->
        <button onclick="logout();">Logout</button>

        <!-- Script -->
        <script src="./main.js"></script>
      </body>
    </html>  
    ```

    ```javascript
    // main.js

    // Device ID and state
    var deviceID = "YOUR-DEVICE-ID";
    var deviceState = null;
    
    // Initialize the SDK and get
    // a reference to the project
    var apolloProject = apollo.init("YOUR-APIKEY", "ACCESS-KEY", "ACCESS-TOKEN");
    
    // Function to login user
    var loginUser = async () => {
      // Get email and password
      // from the form
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      
      // Get reference to the auth class
      var auth = apolloProject.auth();

      // Use try and catch block in order to 
      // use async await otherwise promises are also supported
      try {
        // Submit request
        var res = await auth.login(email, password);

        // Got the response to login request
        // so log it in console
        console.log(res);

        // Generate an alert
        switch(res.code) {
          case "AUTH-ACCOUNT-LOGGEDIN": 
            // User Authenticated
            alert("Success: User Authenticated");
            break;

          case "DATA-INVALID": 
            // Logging failed due
            // to invalid data
            alert("Error: Email or Password is invalid");
        }
      }
      catch(err) {
        // Error usually got generated when
        // we are not connected to the internet
        // Log the error to the console
        console.log(err);

        // Generate an alert
        alert("Error: Failed to authenticate the user");
      }
    }

    // Function to toggle state of a device paired to a
    // user account
    var toggleDeviceState = async () => {
      // Get reference to the auth class
      var devices = apolloProject.devices();

      // Use try and catch block in order to 
      // use async await otherwise promises are also supported
      try {
        // Get parameters first
        var res = await devices.device(deviceID).getParms();
        
        // Got the response to request
        // so log it in console
        console.log(res);
        
        // Verify that the device parameters are returned
        switch(res.code) {
            case "DEVICE-PARMS-FETCHED":
                // Store the state into the variable
                // after toggling
                deviceState = res.deviceParms.state == 1? 0: 1;
                break; 
            
            default: {
                // In case of an error while fetching the state
                // simply generate an error
                alert("Error: Failed to update the state of the device");
                return;
            }
        }

        // Set parameters
        var res = await devices.device(deviceID).setParms({state: deviceState});

        // Got the response to request
        // so log it in console
        console.log(res);

        // Generate an alert
        switch(res.code) {
          case "DEVICE-PARMS-UPDATED":  
            // Updated the parms
            // now update them
            alert(`SUCCESS: State is now ${deviceState == 1? "ON": "OFF"}`);
            break;

          default: 
            // Fetch failed
            alert("Error: Failed to get device parms");
        }
      }
      catch(err) {
        // Error usually got generated when
        // we are not connected to the internet
        // Log the error to the console
        console.log(err);

        // Generate an alert
        alert("Error: Failed to toggle device state");
      }
    }

    // Function to logout user
    var logout = async () => {
      // Get reference to the auth class
      var auth = apolloProject.auth();

      // Use try and catch block in order to 
      // use async await otherwise promises are also supported
      try {
        // Submit request
        var res = await auth.logout();

        // Got the response to login request
        // so log it in console
        console.log(res);

        // Generate an alert
        switch(res.code) {
          case "AUTH-ACCOUNT-LOGGEDOUT": 
            // User Authenticated
            alert("Success: User Logged out");
            break;

          case "AUTH-UNAUTHORIZED": 
            // User is not authenticated
            alert("Error: User is not authenticated.");
        }
      }
      catch(err) {
        // Error usually got generated when
        // we are not connected to the internet
        // Log the error to the console
        console.log(err);

        // Generate an alert
        alert("Error: Failed to logout the user");
      }
    }
    ```
7. Supercharge your app with CSS

    A good app is one that provides a rich experience to the users. So, in the end, we can add some colors to our app with open source frameworks like `Bootstrap`. We are using `Ionic` here which is another famous UI framework (and is kind of cool). So here is how the final UI now looks like
    
    ![First Grandeur App](/images/demo.png)

8. Make it live and rock the world

    Time has come to make our creation available live. Traditionally to do this you will have to pay for hosting services separately. We have resolved this problem as well for you. So push your app to a code collaboration platform like `Github`. Then visit [hosting](https://cloud.grandeur.tech/hosting) page at the cloud dashboard. Finally, enable the hosting by providing in the link of your repo and done. We will automatically fetch your app from the source and will make it live on domain `YOUR-PROJECT-NAME.hosting.cloud.grandeur.tech`.
    
# Grandeur Ecosystem
The purpose behind writing is to tell you what is the thought process and psychology behind the Grandeur Cloud Platform. We believe that the first important step toward choosing a platform for your product and company is to understand how the developer designed the system. So we wanted to write about it in detail. We wanted to document how you can use this platform effectively to make your life as a developer or founder a bit simpler. So in this section, we will first illustrate why to use Grandeur Cloud as a developer, then we will present a brief case study and finally, we will write about the concepts.

## Why use Grandeur Cloud as a developer?
* It is simple to [get started](#get-started). Just create a project at the cloud dashboard and simply get a reference to your project using our SDK.
* No need to mix and match various services because it is a single spot solution for all of your needs. It has built-in support for authenticating users and device registration. You can access all the features like authentication, file storage, database and device registry from a single SDK.
* Simple pricing. [Start free](https://cloud.granduer.tech/register) and then pay as you go based on resource consumption. Checkout [pricing](https://grandeur.tech/pricing) to get more details.

## A brief case study
Suppose you are a clean tech startup and want to radicalize the home appliances market to make them more eco and user friendly. You analyzed the market, did user interviews and realized that the real problem is in the air conditioner market. Every year we produce millions of new air conditioners but the problem is that there are so many old and inefficient are already there in the market installed in our homes and offices. This is creating a big mess because firstly such an old air conditioner consumes a huge chunk of power and major cause of emissions. Nothing can be done because upgrading each single one of them is not just feasible at all economically, but in the end, it is impacting both the users and the ecosystem.
 
To resolve this issue, you decided to build an electronic solution that could be used as an extension with the old air conditioner installed in our homes. So that we could control the power consumption without an upgrade. Then you realized that you will have to provide your users with some form of interface, through which the interaction could be made. You decided to make it smart. You wanted your users to see how this new extension has saved them a lot of money by cutting down the power consumption. You also wanted your users to manually control this new extension like they should have control over how much they wanted to save. This all could be achieved IoT. You decided to build a companion app for your device.

That is where the problem started. You are a hardware startup in the end and your expertise is in building amazing electronics technology. Now you gotta deal with few more things as well. You will have to build your app and figure out how to establish the communication between hardware and app (backend of your system). You decided to hire more engineers, but you know how much of them you will have to hire? To give you an idea, you need 8+ engineers just to do backend, Like one for database, one for networking, one for API development, one for dev ops and about four for building SDK (one for each platform android, ios, web, and hardware). This makes it a package of $8000+ just to figure out the backend of your system and you haven't yet validated your product. That is bad and now you don't know what to do about it.

Then one day the sun of fate shown. You discovered a platform termed as `Grandeur Cloud`, which could just solve all of your problems. You wanted to authenticate your users, it had the auth feature in it. You needed a online storage space to store your user's profile picture, it came with builtin support for storage. You needed a database to store power consumption logs so that your users could see how much they have saved, it provided a cloud datastore service. You wanted to build a communication bridge between the hardware and the software, thank god, it's SDK was available for all the stacks like arduino, web, and mobile.

So you simply registered for the platform, created a project and started integrating your apps and hardware with the SDK. Then finally you registered your products to the platform before making them available for sale (because the platform comes with built-in security features and only allows only registered products to communicate). Your apps are now live on the store. People loved you built. You made an early entry into the market and now adding a dent to the universe.

That is the story of the team `SolDrive`. Check out their [website](https://sol-drive.com) right now and explore how are they transforming the world with Grandeur Cloud.
 
## Concepts
In this subsection, we will explore the Grandeur Cloud Platform in detail. We will see how it all works in depth. So let's get started

### Projects
To start working with Grandeur Cloud, the first thing that you will have to do is to create a new project. Now, what is a project? Project is like a workspace and we store, communicate and display data regarding your project. While you can technically create an unlimited number of projects, but you cannot share data or resources of any sort between two projects. `Your project works like a namespace`. Like users registered to one project cannot log in to applications based on other projects. Similarly, devices registered to one project, cannot be shared with another project. 

When you create a project, we give you a project API key. An API key is a digital signature that identifies a project in our system, just like your identification card or your social security number identifies you as a citizen. To connect your apps or hardware to our network, that is what you should provide to our SDK. Our SDK sends us your API key with every request and that is what we utilize to understand what data are we supposed to update or return or in which namespace we are supposed to execute your request. Checkout [sdk](#sdk) section in concepts to read more about it.

In the end, it is important to note that our pricing applies separately to each project. So you will get free tier on every project and then you will pay for each project separately regarding what you consume in each namespace.

### SDK
You use our SDK to communicate with our cloud platform. We call our SDK `Apollo` and it acts like an interface that gives you easy access to integrate our platform in your stack. Like in the case of web apps, simply drop in the link of JS SDK CDN in your codebase and done. We have tried our best to make it coherent in between the platforms. So that you could work and collaborate seamlessly.

So that is how it works. You can the SDK global object by name and initialize it with an API key (plus a couple of more stuff in case of hardware SDK). As a result of initialization, you will get the reference to your project (in case of the app) or your device (in case of hardware), with which you can access all the features of Grandeur Cloud depending upon the scope. Like in case of device reference you can access features limited to the device only, while with project reference, you can access all the possible features after user authentication. Checkout [authentication and access](#authentication-and-access) section to get more insight into scope.

### Users and Administrator
This topic is about the relationship between you as an administrator and your users. We will describe who can access what so technically we are gonna start talking about the scope of access. You create a project and add resources to it like users and devices. So you own it all. You own the namespace of a project and only you can manage your project using your account credentials and our dashboard application. But in real-world settings, you want your apps to handle a part of your responsibilities. Like obviously you would like your users to automatically sign up. Then you would want your users to automatically access their devices and some data upon authentication. This means you will have to delegate some of your authorities to our SDK because in the end your apps are gonna communicate to our platform with SDK. You can do this by just giving our SDK your API key and configuring [allowed origins](#allowed-origins) setting through the dashboard.

But who are users? Users are just entities that you can either create through the dashboard or SDK. To be more precise, a user entity defines the scope of access of a person who is using your app. By default, a user is limited to access devices paired to his own account, but can access all of your files and datastore (at the moment - you cannot define fine grain control of your files and data stored in storage and datastore respectively. While we are actively working on adding this support to our platform but currently it is very important to develop a data model in a way that the privacy of users could be protected.). This way a user can request the device logs or his profile picture from our platform upon authentication but cannot access devices paired to another user accounts. But we mean by accessing devices? To read more about it, check out [devices registry](#devices-registry) topic.

### Devices Registry
Just like users, devices are entities which essentially defines the scope of access. But unlike users, you can only register new devices through dashboard only. This is one of the key features of Grandeur Cloud. We wanted to resolve this issue. There are two types of solutions out there i) those are dealing with users part only e.g. firebase and ii) those are just dealing with devices registry part e.g. Google IoT Core. We wanted to combine best of both worlds. This is why at Grandeur Cloud, where on one hand we have added the authentication feature, then on the other hand we also maintains a devices registry for you. Where you can seamlessly register new entities and pair those entities to users.

Now how this entity defines the scope? `Devices are global entities`. Unlike user account entity, `no body owns a device` except an administrator. So a user can pair a device to his account or in order words say a user `can claim a device and access data` specific to it. But a user cannot delete or inherently modify a device. We designed this considering the real world relation that we develop with our things. So the devices entity in the end defines two things i) what a hardware can access in your namespace and ii) which hardware devices a user can control. Now this really matters a lot because that's the key. You obviously do not want your neighbors to control your air conditioner (that would be so horrible situation). That's what this entity has been designed for. So as mentioned earlier, this entity also limits what a hardware product can access in your namespace. So when you pair a device to an account, we generate an access token for you. Then you can provide this token to our hardware SDK in init in order to access the data (unlike app SDK, hardware SDK can access scope limited to a device only and you delegate a device access to hardware SDK by providing access token at the init. That is how you authenticate your products)

What do we mean by saying that a user can access data of devices paired to his own account only? We have made it simple for you. You won't have to handle data specific to your device yourself using datastore. We do this for you with devices registry. When you register a device to your registry, we create a new namespace for you where we save data in two objects i) `Parms` and ii) `Summary` specific to the device you just created. In other words, we maintain a special storage space where you can save data specific to device. It is like a secure contained spot and only accounts to which the device is paired can access it through the SDK, similarly, only the devices with access token of the namespace can access it through hardware SDK.

In the end, let's define what you can store in the two object i) Parms and ii) Summary. To be honest, we are very flexible in it. We just created two objects instead of a single one to help you develop understanding. Our approach is, Parms are like controllable state of a device and Summary is something that device wanted to log or display to apps. In other words, Parms are like the inputs and Summary is like the output of a device. So for example, consider an example where you have a smart light bulb. The parms can be utilized to control the bulb state, while in summary you can log that how much voltage is being consumed by the bulb or another sensor data. We defined this because we wanted to go a step forward. We wanted to help you in building a logic. But again, we are very flexible. So you can define what should be the initial schema of these two objects but we never monitor that either the schema is being followed or not.

### Authentication and Access
In last two sections, we have discussed in depth that what are the various access scopes and who can access what. This section will revisit this topic again to give you an overall picture of auth and access. Let's start with outlining the relationships. There are three kinds of entities i) projects ii) users and iii) devices. You create a project so own a project and can access all the possible features and data. You do this all by using our dashboard application. End goal is to provide access of the data and devices (that you are building) to your users. You can do this by using our SDK in your apps and hardware. But for this purpose, our SDK should also have access to your namespace. So technically, you can also delegate your access.

This is where the other two entities comes. We designed these two entities to give you fine grain control over what you are delegating and how are you granting access. Users got wider scope of access. A user entity can access devices data (paired to his account), can access the files you stored in storage and can also access the data you maintained in datastore. In other words, this entity allows you to delegate access of your project to your apps through our SDK in a controlled fashion. Or in another way, we can say that the piece of code that you have written in your apps can only make a request to our platform once a user authenticate. Now I believe that you can see the big picture here! You delegate actually delegate some authorities to your users. Now your users can request to authenticate (via our SDK). As a result we will generate an auth token that your hardware can then utilize to communicate to our platform. 

Now comes the devices entity. We designed this entity as a global resource. Your users can claim access to a device but cannot actually own it. Whenever a user claims a device, we first verify that an other user hasn't claimed the same device earlier and then generate an access token. The hardware SDK can use this access token to communicate to our platform and access data specific to the device only.

That is the whole picture. That is how we make sure that everyone is getting what they are allowed to access. That is how we grant you authority over your data and resources and keep in check that everything is working just the way you want them to work.

### Networking
Grandeur Cloud is a managed backend as a service platform. We tie it all up for you so you won't have to do it yourself. This is one of the pain points that you face when building your IoT products with services like Google Cloud Platform and AWS. You will have a mix and match services together and tie it all up yourself. But it is always a good practice to fully understand a platform before using it. Therefore we are writing about how the networking works with Grandeur Cloud.

We works with two communication channel in apps SDK i) http based REST API and ii) duplex based realtime API. We use the first REST API channel to do stuff like authentication and file upload, while the other realtime API for fast request transmission like device data requests etc. Realtime channel is really fast and designed to transfer packets to server and from server at transmission rate of 200ms. It is based on our custom protocol and we call it duplex. We don't allow unauthenticated connection over this channel so initially establish communication over REST till authentication.

In the hardware SDK, we use only a single channel; duplex based realtime API. Because of the fact that hardware uses access token to authenticate and which we provide very early on at init. So we do not need a separate channel for authentication and neither we are required to do heavy lifting like file upload. Because while duplex is very fast, it is reliable only for quick messages communication.

### Allowed Origins
This is another amazing topic and somehow related to access delegation in the end. As mentioned earlier in other sections that you can also access your project namespace using SDK by simply providing your API key to the SDK durning init. SDK returns a reference object to the project after initialization which can be then utilized to access the namespace. Which poses a security threat particularly in case of web apps but API key can be easily stolen. While in the end, you require a user to be authenticated first before making any request to platform, a hacker with stolen API key can still cause some damage. Like a hacker can register bogus users to your namespace or can create a copycat site for pishing. To handle this, we introduced cross origin request protection to our platform. 

So in order to establish communication from a website using the web SDK, you will have to first whitelist the domain name via [settings](https://cloud.grandeur.tech/settings) page in the dashboard application. You cannot even send a request from your localhost without first whitelisting it. Now at this point, it is important to note that whitelisting localhost in production application is not a good practice and should be avoided in order to protect your users.

# Documentation
In this section, we will present references to each and every feature that our SDK supports. We have divided our SDK in group of functions called classes. Each class represents a feature of Grandeur Cloud. So in this section, we will also document that how can you use each and every function of Grandeur Cloud SDK.

## init
First and foremost thing that you are required to do in order to access our platform is initialization. When you drop in the link of the CDN in your app, we create a global object accessible through JS. This object can be then utilized to init the SDK with your API key and access credential. Upon init, the SDK returns you a reference to your project, through which you can access all the features of Grandeur Cloud. To understand it in depth please refer to [Projects](#projects) topic in the concepts section. To generate access key and token please visit [settings](https://cloud.grandeur.tech/settings) page. It is important to note that access key is a secret so please store it with absolute care in your application code. 

This is how you can init the SDK and can get a reference to your project

```javascript
// Get reference to the project by initializing the SDK
// with your API key
var apolloProject = apollo.init("YOUR-APIKEY", "YOUR-ACCESS-KEY", "YOUR-ACCESS-TOKEN");
```

## isConnected
Once you init the SDK and get reference to the project, the SDK tries to establish a persistent connection to the cloud platform. Establishing this persistent connection is the key because this allows us to do realtime communication with the server. Almost all of the SDK features are based on this realtime channel. This is why we have added this function, which can be utilized to verify either we are connected to the server or not. 

You can use this function as illustrated below

```javascript
// If the SDK is connected
if (apolloProject.isConnected()) {
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
apolloProject.onConnection((status) => {
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
This class provides access to the auth feature of Grandeur Cloud. Simply get a reference to the auth class by calling `auth()` method with the project object. This is illustrated as below

```javascript
// Get reference to the auth class
// by calling the auth method
var auth = apolloProject.auth();
```

Now once you got the reference to the auth class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### register
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


#### confirmRegistration
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
var confirmRegistration = null;

// Get user data from the inputs and
// Submit request to the server
auth.register(email, password, displayName, phone).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirmRegistration = res.confirm;
  }
})

// After getting response from registration request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirmRegistration(code).then((res) => {
  // Got the response
  // Checkout the response code
  switch(res.code) {
    case "AUTH-ACCOUNT-REGISTRATION":
        // Account has been created successfully
  }
});
```

### login
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

### isAuthenticated
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

### logout
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

### updateProfile
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


#### confirmProfileUpdate
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
var confirmProfileUpdate = null;

// Get user data from the inputs and
// Submit request to the server
auth.updateProfile(displayName, displayPicture, phone).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirmProfileUpdate = res.confirm;
      break;
    case "AUTH-PROFILE-UPDATED":
      // Profile has been updated
  }
})

// After getting response from update profile request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirmProfileUpdate(code).then((res) => {
  // Got the response
  switch(res.code) {
    case "AUTH-PROFILE-UPDATED":
        // Profile has been updated
  }
});
```

### forgotPassword
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


#### confirmForgotPassword
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
var confirmForgotPassword = null;

// Get user data from the inputs and
// Submit request to the server
auth.forgotPassword(email).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirmForgotPassword = res.confirm;
  }
})

// After getting response from forgot password request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirmForgotPassword(code).then((res) => {
  // Got the response
  switch(res.code) {
    case "AUTH-PROFILE-UPDATED":
        // Password has been updated
  }
});
```

### changePassword
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


#### confirmChangePassword
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
var confirmChangePassword = null;

// Get user data from the inputs and
// Submit request to the server
auth.changePassword(password).then((res) => {
  // Got the response
  // So checkout the response code
  switch(res.code) {
    case "PHONE-CODE-SENT": 
      // Verification code has been sent
      confirmChangePassword = res.confirm;
  }
})

// After getting response from change password request
// Prompt the user about the verification code
// and submit it to server with the confirm 
// method
confirmChangePassword(code).then((res) => {
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
var devices = apolloProject.devices();
```

Now once you got the reference to the devices class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### list
This method comes in handy whenever you need a list of all the devices paired to a user account. 

This method do not accept anything in the argument and returns the following codes in response

* DEVICES-LIST-FETCHED

  list of paired devices has been fetched

* DEVICES-LIST-FETCHING-FAILED

  failed to fetch the list of paird devices

Use of getUserDevices method has been illustrated in the example below

```javascript
// Submit request to the server
devices.list().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICES-LIST-FETCHED": 
      // Devices list has been fetched
      console.log(res.devices);
  }
})
```

### onlineCount
This methods returns the number of online devices in the list of devices paired to a user account. Online devices are simply those devices which are connected to Grandeur Cloud at a moment.

This method do not accept anything in the argument and returns the following codes in response

* DEVICES-ONLINE-COUNT-FETCHED

  count of online devices has been fetched

* DEVICES-ONLINE-COUNT-FETCH-FAILED

  failed to fetch the count of online devices

Use of getOnlineDevicesCount method has been illustrated in the example below

```javascript
// Submit request to the server
devices.onlineCount().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICES-ONLINE-COUNT-FETCHED": 
      // Number of online devices has been fetched
      console.log(res.numberOfOnlineDevices);
  }
})
```

### onList
The best thing about Grandeur Cloud is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed even will occur. 

This methods allows you to subscribe to event related to devices list update and event will be fired whenever a device gets paired or unpaired to a user account. 

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| callback | function | a valid JS function which will be called whenever the subscribed event gets fired |

This method returns the following codes in the response to the promise

* TOPIC-SUBSCRIBED

  event has been subscribed

It is important to note that the update will be directly sent without a response code. So for example whenever a new device will be paird, entire list will be sent as the argument in form an array.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var devicesListEventListener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the devices list update event of a device
devices.onList(onUpdate).then((res) => {
  // Call to onDevicesList returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      devicesListEventListener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
devicesListEventListener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```
### device
From the devices class, you can get reference to a device class by calling this function. Then you can perform various operations on a device using the device reference.

```javascript
// Get reference to the devices class
// by calling the device method
var devices = devices.device(deviceID);
```

#### pair 
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

#### unpair
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

#### getSummary
As mentioned in [devices registry](#devices-registry) topic that with each device you can save data which will be private to the device only and accessible after pairing. We categorize the data associated with a device into two objects; summary and parameters. This methods allows you to get the summary object of a device data.

This method returns the following codes in response 

* DEVICE-SUMMARY-FETCHED

  summary object has been returned

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of getSumamry method has been illustrated in the example below 

```javascript
// Submit request to the server
device.getSummary().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-SUMMARY-FETCHED": 
      // Device summary has been fetched
      console.log(res.deviceSummary);
  }
})
```

#### getParms
As mentioned in [devices registry](#devices-registry) topic that with each device you can save data which will be private to the device only and accessible after pairing. We categorize the data associated with a device into two objects; summary and parameters. This methods allows you to get the parameters object of a device data.

This method returns the following codes in response 

* DEVICE-PARMS-FETCHED

  parameters object has been returned

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of getParms method has been illustrated in the example below 

```javascript
// Submit request to the server
device.getParms().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-PARMS-FETCHED": 
      // Device parameters has been fetched
      console.log(res.deviceParms);
  }
})
```

#### setSummary
As mentioned in [devices registry](#devices-registry) topic that with each device you can save data which will be private to the device only and accessible after pairing. We categorize the data associated with a device into two objects; summary and parameters. This methods allows you to set the summary object of a device data.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| summary | object   | a valid JSON object containing the data to be set as new summary |

This method returns the following codes in response 

* DEVICE-SUMMARY-UPDATED

  summary object has been updated

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of setSummary method has been illustrated in the example below 

```javascript
// Submit request to the server
device.setSumamry({voltage: 10}).then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-SUMMARY-UPDATED": 
      // Device summary has been updated
  }
})
```

#### setParms
As mentioned in [devices registry](#devices-registry) topic that with each device you can save data which will be private to the device only and accessible after pairing. We categorize the data associated with a device into two objects; summary and parameters. This methods allows you to set the parms object of a device data.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| parms | object   | a valid JSON object containing the data to be set as new parameters |

This method returns the following codes in response 

* DEVICE-PARMS-UPDATED

  parameters object has been updated

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of setParms method has been illustrated in the example below 

```javascript
// Submit request to the server
device.setParms({state: 1}).then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-PARMS-UPDATED": 
      // Device parameters has been updated
  }
})
```

#### getDetails
This method should be utilized whenever you need consolidated details regarding a device. It returns details like device name, status, summary and parameters in a single call.

This method returns the following codes in response 

* DEVICE-DETAILS-FETCHED

  details has been fetched

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of getDetails method has been illustrated in the example below 

```javascript
// Submit request to the server
device.getDetails().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-DETAILS-FETCHED": 
      // Device details has been fetched
      console.log(res.deviceDetails);
  }
})
```

#### setName
There is a name field associated with every device in the registry, it is meant to assist you in tagging your devices with a human friendly names to make management of the paired devices easy for your end users. This method allows you to set this name field of a device. 

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| name | string | a human friendly alphanumeric phrase |

This method returns the following codes in response 

* DEVICE-NAME-UPDATED

  name has been updated

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of setName method has been illustrated in the example below 

```javascript
// Submit request to the server
device.setName("Living Room Lamp").then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-NAME-UPDATED": 
      // Device name has been updated
  }
})
```

#### getStatus
Grandeur Cloud maintains state of each device paired to a user account. We keep track that either a device is connect to the server at a given moment. While [onlineCount](#onlineCount) method allows you to get count of total online devices, this method gives you the utility to query status of an individual device.

This method returns the following codes in response 

* DEVICE-STATUS-FETCHED

  status of the device has been returned

* DEVICE-NOT-PAIRED

  device is not paired to the account

* DEVICE-ID-INVALID

  device is not registered with this id

* DATA-INVALID

  device id is required

Use of getStatus method has been illustrated in the example below 

```javascript
// Submit request to the server
device.getStatus().then((res) => {
  // Got the response
  switch(res.code) {
    case "DEVICE-STATUS-FETCHED": 
      // Device status has been returned
      console.log(res.status);
  }
})
```

#### onSummary
The best thing about Grandeur Cloud is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed even will occur. 

This methods allows you to subscribe to a device's summary update event and it gets fired whenever a device's summary data object gets udpated either through the app or the device it self.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
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

It is important to note that the update will be directly sent without a response code. So for example if a client updates the summary to `{voltage: 10}` then it will be received as it is in the argument of callback.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var summaryEventListener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the summary update event of a device
device.onSummary(onUpdate).then((res) => {
  // Call to onDeviceSummary returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      summaryEventListener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
summaryEventListener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```

#### onParms
The best thing about Grandeur Cloud is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed even will occur. 

This methods allows you to subscribe to a device's parameters update event and it gets fired whenever a device's parameters data object gets udpated either through the app or the device it self.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
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

It is important to note that the update will be directly sent without a response code. So for example if a client updates the parameters to `{state: 1}` then it will be received as it is in the argument of callback.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var parmsEventListener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the parameters update event of a device
device.onParms(onUpdate).then((res) => {
  // Call to onDeviceParm returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      parmsEventListener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
parmsEventListener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```

#### onName
The best thing about Grandeur Cloud is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed even will occur. 

This methods allows you to subscribe to a device's name update event and it gets fired whenever a device's name gets udpated an app.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
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

It is important to note that the update will be directly sent without a response code. So for example if a client updates the name to `Living Room Lamp` then it will be received as it is in the argument of callback.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var nameEventListener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the name update event of a device
device.onName(onUpdate).then((res) => {
  // Call to onDeviceName returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      nameEventListener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
nameEventListener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```
#### onStatus
The best thing about Grandeur Cloud is the fact that it is event driven. Means you can subscribe to events and we will automatically send you an alert whenever the subscribed even will occur. 

This methods allows you to subscribe to a device's status update event and it gets fired whenever a device connects to the cloud.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
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

It is important to note that the update will be directly sent without a response code. So for example whenever the device will come online, the event will be fired and a boolean `true` will be received in argument of the callback and vice versa.

The call to this method also returns reference to a `clear` method with which you can unsubscribe to the event. It don't accept anything in the argument and returns the following code as a response to promise

* TOPIC-UNSUBSCRIBED

  event has been unsubscribed and update won't trigger the callback provided earlier

The use of this method has been illustrated in the example below

```javascript
// Variable to store clear method of subscribed event
var statusEventListener = null;

// Function to be passed as a callback
var onUpdate = (update) {
  // Will be called whenever the
  // event will be fired
  console.log(update);
};

// Subscribe to the status update event of a device
device.onStatus(onUpdate).then((res) => {
  // Call to onDeviceStatus returns the
  // clear method as a response to promise 
  switch(res.code) {
    case "TOPIC-SUBSCRIBED": 
      // Event has been subscribed
      statusEventListener = res;
  }
});
  

// Then in our code we can clear the event 
// listener whenever required with the clear method
statusEventListener.clear().then((res) => {
  // Got the response
  switch(res.code) {
    case "TOPIC-UNSUBSCRIBED": 
      // Event has been unsubscribed
  }
});
```

## storage
This class provides access to the features associated to built in object storage of Grandeur Cloud. Simply get a reference to the storage class by calling `storage()` method with the project object. This is illustrated as below

```javascript
// Get reference to the device class
// by calling the device method
var storage = apolloProject.storage();
```

Now once you got the reference to the storage class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### uploadFile 
This methods takes a file and upload it to the built in object storage associated with your project. It is important to note that with JS SDk the upload size is limited 50 MB. 

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| file | file object | a file object returned through classic DOM selector |
| fileName | string | optional name to be used on upload. The orignal file name will be utilized if not provided |

This method returns the following codes in the response to the promise

* STORAGE-FILE-UPLOADED

  file has been uplaoded

* STORAGE-FILE-EMPTY

  valid file object is not provided

* STORAGE-FILE-ALREADY-EXISTS

  a file already exists with the name

The usage of this method is illustrated in the example below

```html
<!-- Get file from user using input tag -->
<input type="file" id="file" name="file">
```

```javascript
// Then in JS use the classic
// DOM selector to get the file user selected
var file = document.getElementById("file").files[0];

// File name
var fileName = "displayPicture.jpg";

// Upload the file
files.uploadFile(file, fileName).then((res) => {
  // Got response from server
  switch(res.code) {
    case "STORAGE-FILE-UPLOADED": 
      // File has been uploaded
  }
});
```

### getFileUrl
This method can be utilized to get a public url of a file. With the public url, the file will be accessible through GET request, or in other words the file could be downloaded by visiting the url in browser or in the image tag of html.

It is important to note that the `getFileUrl` call generates a public url. Means the url could be utilized to access a file even when a user is not authenticated.

This method accepts the following arguments

| Name  | Type        | Description |
| :---- | :---------- | :--------------------- |
| fileName | string | provided on the file upload operation |

This method returns the following codes in the response to the promise

* STORAGE-FILE-URL-FETCHED

  file url has been fetched

* STORAGE-FILE-NOT-FOUND

  file not found with the provided name

The usage of this method is illustrated in the example below

```javascript
// Get the file url
files.getFileUrl("displayPicture.jpg").then((res) => {
  // Got response from server
  switch(res.code) {
    case "STORAGE-FILE-URL-FETCHED": 
      // File public url has been generated
      // open a new tab to download the file
      window.open(res.fileUrl);
  }
});
```