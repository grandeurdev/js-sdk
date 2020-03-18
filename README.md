
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)

Building a smart (IoT) product is an art, because it is about unifying the physical world with the digital one. When you connect a hardware to the web, magic happens. But it involves development operations to be carried out over a huge technology stack (you need your own hardware, your own apps and even your own backend) in order to make such products work over production. Then if you are (somehow) done with the development operations, there comes the hardest part; you are going to have to scale it all as your user base grows.

We can understand this, because we have been there. Introducing Grandeur Cloud; a backend as a service for IoT. We have designed this platform so that you do not have to worry about backend of your next big thing, so could focus on what matters the most; your hardware and apps. 

# JavaScript SDK
Grandeur Cloud can resolve all the problems that you could face in building a smart (IoT) product. Like you can authenticate users, can store files in storage, can save data in database, host static website with builtin hosting and can subscribe to events from hardware and app to do realtime communication with the cloud platform. All it requires the integration of our platform in your technology stack.

By this time you would be like okay, we got it why Grandeur is building this platform and yeah it is super great and super useful. But how we can integrate it in our apps? So here is the answer. We have built this amazing JavaScript SDK to make the integration process of Grandeur Cloud in web apps a lot more simpler. So now all you have to do is to follow the [get started](#get-started) gudelines to quickly start building your solution. 

Now in order to get deep insight into our SDK and platform capabilities you can follow the [documentation](#documentation) or to get to understand the core concepts simply dive into [ecosystem](#grandeur-ecosystem) section.

- [Get Started](#get-started)
- [Example](#example)
- [Grandeur Ecosystem](#grandeur-ecosystem)
    * [Why use Grandeur Cloud as a developer?](#why-use-grandeur-cloud-as-a-developer)
    * [A brief case study](#a-brief-case-study)
    * [Concepts](#concepts)
        + [Projects](#projects)
        + [SDK](#sdk)
        + [Users and Administrator](#users-and-administrator)
        + [Devices Registary](#devices-registary)
        + [Authentication and Access](#authentication-and-access)
        + [Networking](#networking)
        + [Allowed Origins](#allowed-origins)
- [Documentation](#documentation)
    * [init](#init)
    * [auth](#auth)
        + [register](#register)
        + [login](#login)
        + [isAuthenticated](#is-authenticated)
        + [logout](#logout)
    * [device](#device)
        + [pairDevice](#pair-device)
        + [unpairDevice](#unpair-device)
        + [getUserDevices](#get-user-devices)
        + [getOnlineDevicesCount](#get-online-devices-count)
        + [getDeviceSummary](#get-device-summary)
        + [getDeviceParms](#get-device-parms)
        + [setDeviceSummary](#set-device-summary)
        + [setDeviceParms](#set-device-parms)
        + [getDeviceDetails](#get-device-details)
        + [setDeviceName](#set-device-name)
        + [getDeviceStatus](#get-device-status)
    * [storage](#storage)
        + [uploadFile](#upload-file)
        + [getFileUrl](#get-file-url)


# Get Started
Let us get to the point straight. You are all motivated and ready to dive in. So quickly go to [Grandeur Cloud](https://cloud.grandeur.tech/), create a new project or select a project to get the API key.

![Select a project at Grandeur Cloud Dashboard](/images/select-project.JPG)

Then just simply drop the link of JavaScript SDK in a script tag inside your web app using our [CDN](https://cloud.grandeur.tech/cdn/apollo.js). 

```javascript
// Drop this link in your web app
// and ta-da, you can now make magic happen
<script src="https://cloud.grandeur.tech/cdn/apollo.js"></script>
```
This will give you access to the global ` Apollo ` object, through which you can intialize the SDK and get a reference to your project as shown below 

```javascript
// With global Apollo object,
// you can simply intialize the SDK 
// with your API key and get reference 
// to your project
var apolloProject = apollo.init("YOUR-APIKEY");
```

Go change the world. You can now access all the amazing features of Grandeur Cloud with the reference object of your project that you just got.  Take a look at the [example](#example) to learn how to quickly build an app to get list of devices paired to user account.

In the end it is important to note it comes with CORS protection in it by default. So in order to start communicating with cloud platform, simply visit [settings](https://cloud.grandeur.tech/settings) page at cloud dashboard and whitelist the domain that your web app is using (if you are testing it locally and haven't deployed it to a domain yet, just add localhost:[port] to the allowed domains list but don't forget to remove it from list before shipping you app in production).

# Example
Now when you know how to get started with Grandeur Cloud, it is time to dive into bit depth. In this example, we will be building a web app to toggle state of a device paired to a user account. So start building and follow the steps

1. Start a new Project
  
    To take a start first create a new project by visiting cloud dashboard. Note the API key and create a new directory (we will call it `workspace` from now own) in your local system.

2. Create index page of the app

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

    This is quite basic HTML page. We have just added a heading to body and custom title of the page. So now in order to open the page in the browser we will have to run a local server. We can do this easily with `Node.js` by installing a package called `http-server` (to learn more about it checkout this [tutorial](https://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server)). So now simply open command prompt in your workspace and run the command as shown below

    ```
    $ http-server

    Starting up http-server, serving ./
    Available on:
      http://192.168.0.5:8080
      http://127.0.0.1:8080
    Hit CTRL-C to stop the server
    ```

    and now you can navigate to `localhost:8080` in your browser to access the page that you just created.

3. Get reference to the project in app
    
    After creating the file just drop in the link to of the CDN in the app header. Then create a new file `main.js` and open it in any editor of your choice. Finally include the `main.js` file in `index.html` and get a reference to project by initializing the SDK inside the js file that we just added to the workspace. So the updated code is as below

    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://cloud.grandeur.tech/cdn/apollo.js"></script>
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
    var apolloProject = apollo.init("YOUR-APIKEY");
    ```

    At this step, you will probably also have to allow the domain `localhost:8080` in cross origin access policy. You can do this by visting [settings](https://cloud.grandeur.tech/settings) page at cloud dashboard. Without following this step, your application will not be allowed to communicate to the cloud.

4. Authenticate a user

    Now is the time to add magic into the app. First step is to add a user to your project through [accounts](https://https://cloud.grandeur.tech/accounts) page of dashboard application. Then to authentication feature to app, we will have to add a form and on form submit we will call a JS function where we will send a request to the cloud platform. The updated code is as below

    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://cloud.grandeur.tech/cdn/apollo.js"></script>
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
    var apolloProject = apollo.init("YOUR-APIKEY");

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

    In order to configure state of a device, first step is to register one (If you already have a device in your project and it is paired to a user account then you can skip this step). To do this, create a new model first and then register a new device (a model is like a template which defines the schema with which the device database will be initialized on device registration). Eventually pair the newly registerd device with a user account. This all can be done through [devices](https://cloud.grandeur.tech/devices) of the dashboard application. 

6. Add list all paired devices and logout button

    Now when we are done registering a new device to our project, it is time to implement the update device state and logout feature. So where the former feature will allow a user to state param of a device paired to user account, the later feature will utimately allow him to logout of his account. For this purpose, we will first add two buttons to the index page and then we will link them to a JS functions. Before moving on, it is important to decide where should the data saved in the device namespace, either in the Summary or the Parms (a device database can store/classify data in two objects by default)? This question answered in [devices registary](#devices-registary) topic of the concepts section. So we will be store the state in the parms object. So now in `toggleDeviceState()` function, we will first query the server about current state and then we will send request to update the state. The updated code is as below
    
    ```html
    <!-- index.html -->

    <!DOCTYPE html>
    <html>
      <!-- Head -->
      <head>
        <!-- Title -->
        <title>First Grandeur App</title>

        <!-- Link SDK with CDN -->
        <script src="https://cloud.grandeur.tech/cdn/apollo.js"></script>
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
    var apolloProject = apollo.init("YOUR-APIKEY");
    
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
      var device = apolloProject.device();

      // Use try and catch block in order to 
      // use async await otherwise promises are also supported
      try {
        // Get parameters first
        var res = await device.getDeviceParms(deviceID);
        
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
        var res = await device.setDeviceParms(deviceID, {state: deviceState});

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

    A good app is one which provides rich expereince to the users. So in the end we can add some colors to our app with open source frameworks like `Bootstrap`. We are using `Ionic` here which is another famous UI framework (and is kind of cool). So here is how the final UI now looks like
    
    ![First Grandeur App](/images/demo.png)

8. Make it live and rock the world

    Time has come to make our creation available live. Tradionally, to do this you will have to pay for hosting services separately. We have resolved this problem as well for you. So push your app to a code collaboration platform like `github`. Then visit [hosting](https://cloud.grandeur.tech/hosting) page at cloud dashboard. Finally enable the hosting by providing in the link of your repo and done. We will automatically fetch your app from the source and will make it live on domain `YOUR-PROJECT-NAME.hosting.cloud.grandeur.tech`.
    
# Grandeur Ecosystem
The purpose behind writing is to tell you what is the thought process and psychology behind Grandeur Cloud Platform. We believe that the first important step toward chosing a platform for you product and company is to understand that how the developer designed the system. So we wanted to write about it in detail. We wanted to document that how can use this platform effectively to make your life as a developer or founder a bit simpler. So in this section, we will first illustrate that why to use Grandeur Cloud as a developer, then we will present a brief case study and finally we will write about the concepts.

## Why use Grandeur Cloud as a developer?
* It is simple to [get started](#get-started). Just create a project at cloud dashboard and simply get a reference to your project using our SDK.
* No need to mix and match various services because it is single spot solution for all of your needs. It has built in support for authenticating users and device registration. You can access all the features like authentication, file storage, database and device registry from a single SDK.
* Simple pricing. [Start free](https://cloud.granduer.tech/register) and then pay as you go based on resoruce consumption. Checkout [pricing](https://grandeur.tech/pricing) to get more details.

## A brief case study
Suppose you are a clean tech startup and want to radicalize home appliances market to make them more eco and user friendly. You analyzed the market, did user interviews and realized that the real problem is in air conditoner market. Every year we produce millions of new air conditoners but the problem is that there are so many old and in efficeint are already there in the market installed in our homes and offices. Which is creating a big mess because firstly such old air conditoners consume a huge chunk of power and major cause of emissions. Nothing can be done because upgrading each single one of them is not just feasible at all economically, but in the end it is impacting both the users and ecosystem.

In order to resolve this issue, you decided to build an electornic solution which could be used as an extension with the old air conditoners installed in our homes. So that we could control the power consumption without upgradation. Then you realized that you will to provide your users some form of interface, through which the interaction could be made. You decided to make it smart. You wanted your users to see how this new extension has saved them a lot of money by cutting down the power consumption. You also wanted your users to manually control this new extension like they should have control over how much they wanted to save. This all could be achived by IoT. You decided to build a companion app for your device.

That is where the problem started. You are a hardware startup in the end and your expertise is in building amazing electronics technology. Now you gotta deal with few more things as well. You will have to build your app and figure out how to establish the communication between hardware and app (backend of your system). You decided to hire more engineers, but you know how much of them you will have to hire? To give you an idea, you need 8+ engineers just to do server side part like one for database, one for networking, one for API development, one for dev ops and about four for building SDK (one for each platform android, ios, web and hardware). Which makes it a package of $8000+ just to figure out the backend of your system and you haven't yet validated your product. That is bad and now you don't know what to do about it.

Then one day the sun of fate shown. You discovered a platform termed as `Grandeur Cloud`, which could just solve all of your problems. You wanted to authenticate your users, it had the auth feature in it. You needed a online storage space to store your users profile picture, it came with built in support for storage. You needed a database to store power consumption logs so that your users could see how much they have saved, it provided a cloud datastore service. You wanted to build a communication bridge between the hardware and the software, thank god, it's SDK was available for all the stacks like arduino, web and mobile.

So you simply registered for the platform, created a project and started integrating your apps and hardware with the SDK. Then finally you registered your products to the platform before making them available for sale (because the platform comes with built in security features and only allows only registered products to communicate). Your apps are now live on store. People loved you built. You made an early entry into the market and now adding a dent to the universe.

That is the story of team `SolDrive`. Checkout their [website](https://sol-drive.com) right now and explore how are they transforming the world with Grandeur Cloud.
 
## Concepts
In this sub section we will explore the Grandeur Cloud Platform in detail. We will see how it all works in depth. So let's get started

### Projects
To start working with Grandeur Cloud, the first thing that you will have to do is to create a new project. Now what is a project? Project is like a workspace and we store, communicate and display data with respect to your project. While you can technically create unlimited number of projects, but you cannot share data or resources of any sort between two projects. `Your project works like a namespace`. Like users registered to one project, cannot login to applications based on other projects. Similarly devices regsitered to one project, cannot be shared to another project. 

When you create a project, we give you a project API key. An API key is a digital signature that identifies a project in our system, just like your identification card or your social security number identifies you as a citizen. In order to connect your apps or hardware to our network, that is what you should provide to our SDK. Our SDK sends us your API key with every request and that is what we utilize to understand what data are we supposed to update or return or in which namespace we are supposed to execute your request. Checkout [sdk](#sdk) section in concepts to read more about it.

In the end, it is important to note that our pricing applies separately to each project. So you will get free tier on every project and then you will pay for each project separately with respect to what you consume in each namespace.

### SDK
You use our SDKs to communicate to our cloud platform. We call our SDK `Apollo` and it acts like an interface that gives you easy access to integrate our platform in your stack. Like in case of web apps, simply drop in the link of JS SDK CDN in your code base and done. We have tried our best to make it coherent in between the platforms. So that you could work and collaborate seemlessly.

So that is how it works. You can the SDK global object by name and intialize it with API key (plus couple of more stuff in case of hardware SDK). As a result of initialization, you will get the refernece to either your project (in case of app) or your device (in case of hardware), with which you can access all the features of Grandeur Cloud depending upon the scope. Like in case of device reference you can access features limited to device only, while with project reference, you can access all the possible features after user authentication. Checkout [authentication and access](#authentication-and-access) section to get more insight into scope.

### Users and Administrator
This topic is about the relationship between you as an adminstrator and your users. We will descibe who can access what so technically we are gonna start talking about scope of access. You create a project and add resources to it like users and devices. So you owns it all. You owns the namespace of a project and only you can manage your project using your account credentials and our dashboard application. But in real world settings, you want your apps to handle a part of your responsibilities. Like obviously you would like your users to automatically signup. Then you would want your users to automatically access their devices and some data upon authentication. Means you will have to delegate some of your authorities to our SDK, because in the end your apps are gonna communicate to our platform with SDK. You can do this by just giving our SDK your API key and configuring [allowed origins](#allowed-origins) setting through dashboard.

But who are users? Users are just entities that you can either create through dashboard or through SDK. To be more precise, a user entitiy defines the scope of access of a person who is using your app. By default, a user is limited to access devices paired to his own account, but can access all of your files and datastore (at the moment - you cannot define fine grian control of your files and data stored in storage and datastore respectively. While we are actively working on adding this support to our platform but currently it is very important to develop data model in a way that privacy of users could be protected.). This way a user can request the device logs or his profile picture from our platform upon authentication but cannot access devices paired to another user accounts. But we mean by accessing devices? To read more about it, checkout [devices registary](#devices-registary) topic.

### Devices Registary
Just like users, devices are entities which essentially defines the scope of access. But unlike users, you can only register new devices through dashboard only. This is one of the key features of Grandeur Cloud. We wanted to resolve this issue. There are two types of solutions out there i) those are dealing with users part only e.g. firebase and ii) those are just dealing with devices registary part e.g. Google IoT Core. We wanted to combine best of both worlds. This is why at Grandeur Cloud, where on one hand we have added the authentication feature, then on the other hand we also maintina a devices registary for you. Where you can seemlessly register new entities and pair those entities to users.

Now how this entity defines the scope? `Devices are global entities`. Unlike user account entitiy, `no body owns a device` except an adminstrator. So a user can pair a device to his account or in order words say a user `can claim a device and access data` speific to it. But a user cannot delete or inherently modify a device. We designed this considering the real world relation that we develop with our things. So the devices entity in the end defines two things i) what a hardware can access in your namespace and ii) which hardware devices a user can control. Now this really matters a lot because that's the key. You obviosuly do not want your neighbours to control your air conditioner (that would be so horrible situation). That's what this entity has been designed for. So as mentioned earlier, this entity also limits what a hardware product can access in your namespace. So when you pair a device to an account, we generate an access token for you. Then you can provide this token to our hardware SDK in init in order to access the data (unlike app SDK, hardware SDK can access scope limited to a device only and you delegate a device access to hardware SDK by providing access token at the init. That is how you authenticate your products)

What do we mean by saying that a user can access data of devices paired to his own account only? We have made it simple for you. You won't have to handle data specific to your device youself using datastore. We do this for you with devices registary. When you register a device to your registary, we create a new namespace for you where we save data in two objects i) `Parms` and ii) `Summary` specific to the device you just created. In other words, we maintain a special storage space where you can save data specific to device. It is like a secure contianed spot and only accounts to which the device is paired can access it through the SDK, similarly, only the devices with access token of the namespace can access it through hardware SDK.

In the end, let's define what you can store in the two object i) Parms and ii) Summary. To be honest, we are very flexible in it. We just created two objects instead of a single one to help you develop understanding. Our approach is, Parms are like controlable state of a device and Summary is something that device wanted to log or display to apps. In other words, Parms are like the inputs and Sumamry is like the output of a devie. So for example, consider an example where you have a smart light bulb. The parms can be utilzied to control the bulb state, while in summary you can log that how much voltage is being consumed by the bulb or anyother sensor data. We defined this because we wanted to go a step forward. We wanted to help you in building a logic. But again, we are very flexible. So you can define what should be the initial schema of these two objects but we never monitor that either the schema is being followed or not.

### Authentication and Access
In last two sections, we have discussed in depth that what are the various access scopes and who can access what. This section will revisit this topic again to give you an overall picture of auth and access. Let's start with outlining the realtionships. There are three kinds of entities i) projects ii) users and iii) devices. You create a project so own a project and can access all the possible features and data. You do this all by using our dashboard application. End goal is to provide access of the data and devices (that you are building) to your users. You can do this by using our SDK in your apps and hardware. But for this purpose, our SDK should also have access to your namespace. So technically, you can also delegate your access.

This is where the other two entities comes. We designed these two entities to give you fine grain control over what you are delegating and how are you granting accesss. Users got wider scope of access. A user entity can access devices data (paired to his account), can access the files you stored in storage and can also access the data you maintained in datastore. In other words, this entity allows you to delegate access of your project to your apps through our SDK in a controlled fashion. Or in anotehr way, we can say that the piece of code that you have written in your apps can only make a request to our platform once a user authenticate. Now I beleive that you can see the big picture here! You delegate actually delegate some authorities to your users. Now your users can request to authenticate (via our SDK). As a result we will generate an auth token that your hardware can then utilize to communicate to our platform. 

Now comes the devices entity. We designed this entity as a global resource. Your users can claim access to a device but cannot actually own it. Whenever a user claims a device, we first verify that an other user has't claimed the same device earlier and then generate an access token. The hardware SDK can use this access token to communicate to our platform and access data specific to the device only.

That is the whole picture. That is how we make sure that everyone is getting what they are allowed to access. That is how we grant you authority over your data and resources and keep in check that everything is working just the way you want them to work.

### Networking
Grandeur Cloud is a managed backend as a service platform. We tie it all up for you so you won't have to do it yourself. This is one of the pain points that you face when building your IoT products with services like Google Cloud Platform and AWS. You will have a mix and match services together and tie it all up yourself. But it is always a good paractice to fully understand a platform before using it. Therefore we are writing about how the networking works with Grandeur Cloud.

We works with two communication channel in apps SDK i) http based REST API and ii) duplex based realtime API. We use the first REST API channel to do stuff like authentication and file upload, while the other realtime API for fast request transmission like device data requests etc. Realtime channel is really fast and designed to transfer packets to server and from server at transmission rate of 200ms. It is based on our custom protocol and we call it duplex. We don't allow unauthenticated connection over this channel so intially establish communication over REST till authentication.

In the hardware SDK, we use only a single channel; duplex based realtime API. Because of the fact that hardware uses access token to authenticate and which we provide very early on at init. So we do not need a separate channel for authentication and neither we are required to do heavy lifting like file upload. Because while duplex is very fast, it is reliable only for quick messages communication.

### Allowed Origins
This is another amazing topic and somehow related to access delegation in the end. As mentioned earlier in other sections that you can also access your project namespace using SDK by simply providing your API key to the SDK durning init. SDK returns a refernece object to the project after initialization which can be then utilized to access the namespace. Which poses a security threat particularly in case of web apps but API key can be easily stolen. While in the end, you require a user to be authenticated first before making any requrest to platform, a hacker with stolen API key can still cause some damage. Like a hacker can register bogus users to your namespace or can create a copycat site for pishing. To handle this, we introduced cross origin request protection to our platform. 

So in order to establish communication from a website using the web SDK, you will have to first whitelist the domain name via [settings](https://cloud.grandeur.tech/settings) page in the dashbaord application. You cannot even send a request from your localhost without first whitelisting it. Now at this point, it is important to note that whitelisting localhost in production application is not a good paractice and should be avoided in order to protect your users.

# Documentation
In this section, we will present references to each and every feature that our SDK supports. We have divided our SDK in group of functions called classes. Each class represents a feature of Grandeur Cloud. So in this section, we will also document that how can you use each and every function of Grandeur Cloud SDK.

## init
First and foremost thing that you are required to do in order to access our platform is initialization. When you drop in the link of the CDN in your app, we create a global object accessible through JS. This object can be then utilized to init the SDK with your API key. Upon init, the SDK returns you a reference to your project, through which you can access all the features of Grandeur Cloud. To understand it in depth please refer to [Projects](#projects) topic in the concepts section.   

This is how you can init the SDK and can get a reference to your project

```javascript
// Get reference to the project by initializing the SDK
// with your API key
var apolloProject = apollo.init("YOUR-APIKEY");
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

## Auth
This class provides access to the auth feature of Grandeur Cloud. To do this, simply get a reference to the auth class by calling `auth()` method with the project object. This is illustrated as below

```javascript
// Get reference to the auth class
// by calling the auth method
var auth = apolloProject.auth();
```

Now once you got the reference to the auth class, you can simply use all the features by calling the respective methods. Each of the method of auth class is documented in the sections below

### Register
`register( email: *string*, password: *string*, displayName: *string*, phone: *string*): returns *Promise*`

Register a new user in a single step with this function. You just need to pass user's credentials and you are good to go.

Parameters :

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
  <tr>
    <td>displayName</td>
    <td><em>string</em></td>
    <td>accepts only string</td>
  </tr>
  <tr>
    <td>phone</td>
    <td><em>string</em></td>
    <td>phone number must starts with country code i.e +923331234567</td>
  </tr>
</table>

```javascript
var auth = apolloProject.auth();

// confrim registratin module will 
// be saved in this object.
var confirmRegistration = null;

auth.register(email, password, displayName, phone).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
    if(res.code=="PHONE-CODE-SENT") {
        // one time authorization code has been sent

        // confirm object can be fetched here
        confirmRegistration = res.confirm ;
    }
});
```
<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>PHONE-CODE-SENT</td>
<td>Verification code is sent to the phone number.</td>
</tr>
<tr>
<td>PHONE-NUMBER-INVALID</td>
<td>Phone number entered is invalid.</td>
</tr>
<tr>
<td>AUTH-ACCOUNT-DUPLICATE</td>
<td>A profile already exists with this email.</td>
</tr>
<tr>
<td>DATA-INVALID</td>
<td>Both email and password need to have a valid format.</td>
</tr>
</table>

Now after fetching code from the user, *confirmRegistration* can be called.
#### Confirm Registration
> confirmRegistration (code : *string*) : returns *Promise*
 
 Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>code</td>
    <td><em>string</em></td>
    <td>code fetched from the user</td>
  </tr>
</table>

 ```javascript 
confirmRegistration(code).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
});
 ```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-REGISTERED</td>
<td>User's profile is successfully created.</td>
</tr>
<tr>
<td>PHONE-CODE-VERIFICATION-FAILED</td>
<td>An unknown error occurred at the server while verifying user's code.</td>
</tr>
</table>

### Login

> login ( email: *string*, password: *string*) : returns *Promise*

Loging in the user is the basic functionality of authentication so we made
it easier for you.
In order to **login** you just have to pass email and password to the login() function.  


Parameters :

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

```javascript
var auth = apolloProject.auth();
auth.login(email,password).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
});
```

<table>
  <tr>
    <th>Response Code</th>
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

### Is Authenticated
> isAuthenticated ( ) : returns *Promise*

This function is used to check if a user is authorized or not. It returns a respose with user profile if user is authorized and if user is not authorized it returns a response with a code **user-unauthorized**
How to do that? Here it is : 
```javascript
var auth = apolloProject.auth();
auth.isAuthenticated().then((res) => {
    console.log(res);
     // response can be fetched here.
    // response codes are given below
});
```
<table>
 <tr>
  <th>Response Code</th>
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


### Logout
> logout ( ) : returns *Promise*

This simple function is called whenever user needed to be logged out.

```javascript
var auth = apolloProject.auth();
auth.logout().then((res) => {
        // response can be fetched here.
        // response codes are given below 
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-LOGGEDOUT</td>
<td>You are successfully Logged out of your account. </td>
</tr>
</table>

## Device
Device module provides all of the device features i.e if you want to pair or unpair a device, you need to add device module to your application.
**Device** can be used simply by calling **.device()** of **apolloProject** created above.

```javascript
var device = apolloProject.device();
// creates a device object which can
// be used further.
```

We will see that in the examples below.

### Pair Device 
> pairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to pair a device to **Grandeur Cloud**. It asks for a **device ID** and send a request to the server to pair that specific device.  

**Parameters**
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard. </td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
device.pairDevice(deviceID).then((res) =>  {
        // response can be fetched here.
        // response codes are given below 
}); 
```

<table>
 <tr>
  <th>Response Code</th>
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

### Unpair Device 
> unpairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to unpair a device to **Grandeur Cloud (Grandeur Apollo)**. It asks for a **device ID** and send a request to the server to pair that specific device.  

**Parameters**
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

```javascript
var device = apolloProject.device();
device.unpairDevice(deviceID).then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
}); 
```

<table>
<tr>
<th>Response Code</th>
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

### Get User Devices 
> getUserDevices ( ) : returns *Promise*

This function returns a **list of all the paired devices** with the current** authenticated ID**.   
Here is a working example :
```javascript
var device = apolloProject.device();
device.getUserDevices().then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-LIST-FETCHED</td>
<td>List of requested devices is successfully fetched.</td>
</tr>
</table>

### Get Online Devices Count 
> getOnlineDevicesCount ( ) : returns *Promise*

This function returns a **list of all the online devices** with the current **authenticated ID**.   

```javascript
var device = apolloProject.device();
device.getOnlineDevicesCount().then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-ONLINE-COUNT-FETCHED</td>
<td>Number of online devices is successfully fetched.</td>
</tr>
</table>

### Get Device Summary 
> getDeviceSummary( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns a payload which includes data summary of that specific device.  

Parameters :

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

```javascript
var device = apolloProject.device();
device.getDeviceSummary(deviceID).then((res) =>  {
        console.log(res);
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-FETCHED</td>
<td>Summary for the device is successfully fetched.</td>
</tr>
</table>

### Get Device Parms 
> getDeviceParms( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the parameters of that specific device.  

Parameters :
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

```javascript
var device=apolloProject.device();
device.getDeviceParms(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-FETCHED</td>
<td>Parms for the device are successfully fetched.</td>
</tr>
</table>

### Set Device Summary 
setDeviceSummary (deviceID : *string*, summary : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes summary parameters.  

Parameters :

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

```javascript
var device=apolloProject.device();
var summary = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceSummary(deviceID, summary).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-UPDATED</td>
<td>Summary for the device is successfully updated.</td>
</tr>
</table>

### Set Device Parms 
setDeviceParms (deviceID : *string*, params : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes device parameters needed to set.  

Parameters :

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

```javascript
var device = apolloProject.device();
var params = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceParms(deviceID, params).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-UPDATED</td>
<td>Parms for the device are successfully updated.</td>
</tr>
</table>


### Get Device Details 
getDeviceDetails (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the details of that specific device.

Parameters :

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

```javascript
var device=apolloProject.device();
device.getDeviceDetails(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-DETAILS-FETCHED</td>
<td>Details of the device are successfully fetched.</td>
</tr>
</table>

### Set Device Name 
setDeviceName (deviceID : *string*, newName : *string*) : returns *Promise*

This function asks for a **device ID** and **a new name** and then it sets a new name for that specific device.  

Parameters :

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

```javascript
var device = apolloProject.device();
var newName = "newDeviceName";
device.setDeviceName(deviceID, newName).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```


<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-NAME-UPDATED</td>
<td>Name of the device is successfully updated.</td>
</tr>
</table>

### Get Device Status 
getDeviceStatus (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and it returns a payload which the current device status of that specific device.  

Parameters :

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

```javascript
var device = apolloProject.device();
device.getDeviceStatus(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-STATUS-FETCHED</td>
<td>Status of the device is successfully fetched.</td>
</tr>
</table>


## Storage
This module is used to access all the storage features of **Grandeur Cloud** i.e to upload or download a file.

### Upload File 
uploadFile (file : *JSON-Object*, fileName : *string*) : returns *void*

This function asks for a **file** and **file name** and uploads that file to the server.
To upload to a file, first fetch the file with html `input` tag.

```html
<input type="file" id="file">
```
Now you can access the file and upload that easily.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>file</td>
    <td><em>JSON-Object</em></td>
    <td>A default JSON-Object with all the file details.</td>
  </tr>
  <tr>
    <td>fileName</td>
    <td><em>string</em></td>
    <td>File name you want to save.</td>
  </tr>
</table>

```javascript
var files=apolloProject.storage();

// Fetch file data from input tag.
var file = document.getElementById("file").files[0];
var fileName = "displayPicture.jpg";

files.uploadFile(file, fileName);
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>STORAGE-FILE-UPLOADED</td>
<td>File is successfully uploaded to the project.</td>
</tr>
</table>

### Get File Url 
getFileUrl (fileName : *string*) : returns *void*

This function asks for a **file name** and gets that file from the server if that file exists.  

Parameters :
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>fileName</td>
    <td><em>string</em></td>
    <td>File name you want to save.</td>
  </tr>
</table>

```javascript
var files=apolloProject.storage();
// File name you want to fetch.
var fileName = "displayPicture.jpg";

files.getFileUrl(filename);
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>STORAGE-FILE-URL-FETCHED</td>
<td>Here is the URL to access the file.</td>
</tr>
</table>

[Let`s Sign Up]: https://cloud.grandeur.tech