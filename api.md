
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

1. ##### Register
Register a new user in a single step with this function.
In order to **register** you first have to use sendCode function. 
###### Send Code
**Send code** authenticates a user with **one time code**, whenever this function is called a code has been sent to the specific user in order to **register** a new account. it returns a **token** will later on can be used to match with code sent to the user.
**Send code** function requires email, password, display name and mobile number in order to work.
Here is a working example on how to use send code :
```java
apolloProject.auth().sendCode(email,password,displayName,mobile).then(res=>{
    console.log(res);
    // response will be printed on console.
    // response.token contains the token you have to pass to the register
	// function
});
```
Afterwards **register** can be called when you already have the token.

**Register** function needs token which was returned by **sendCode**() and a code which is give by the user.
```java
apolloProject.auth().register(token,code).then(res=>{
    console.log(res);
    // response will be printed on console.
   });
```

2. ##### Login
Loging in the user is the basic functionality of authentication so we made
it easier for you.
In order to **login** you just have to pass email and password to the login() function. Here is a working example for you :
```java
apolloProject.auth().login(email,password).then(res=>{
    console.log(res);
    // response will be printed on console that If user
	// logged in or not with the response code.
});
```
Login function returns a promise which can be used accordingly.


