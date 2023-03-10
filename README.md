Grandeur client for browsers. Check full docs at https://docs.grandeur.dev

[![NPM](https://img.shields.io/npm/v/grandeur-js.svg)](https://www.npmjs.com/package/grandeur-js)
[![Downloads/week](https://img.shields.io/npm/dw/grandeur-js.svg)](https://npmjs.org/package/grandeur-js.svg)
[![License](https://img.shields.io/npm/l/grandeur-js.svg)](https://github.com/grandeurtech/js-sdk/blob/master/package.json)

# Get Started

Let us get to the point straight. You are all motivated and ready to dive in. So quickly go to [Grandeur](https://cloud.grandeur.tech/), create a new project or select a project to get the API key.

# React

Just simply download the package from npm and use it in your react project

```bash
npm install grandeur-js --save
```

This package exports two things 1) a react component - use it as parent component to entire app code and init the SDK 2) HOC - wrap the component in which you want to access the `Grandeur` object to make request to Grandeur.

It is shown in the sample code below

```jsx
// index.js
// Import react and react dom
import React from "react";
import ReactDOM from "react-dom";

// Import app code
import App from "./app";

// and Import Grandeur Component
import { Grandeur } from "grandeur-js/react";

// Render app
const page = (
  <Grandeur
    apiKey="YOUR-APIKEY"
    secretKey="SECRET-KEY"
    credentials={credentials}
  >
    {/* Your app code*/}
    <App />
  </Grandeur>
);

// Finally render
ReactDOM.render(page, document.getElementById("root"));
```

Then inside your `app.js`

```jsx
// app.js
// The App Component

// Libraries
import React, { Component } from "react";

// Import Grandeur HOC
import { withGrandeur } from "grandeur-js/react";

// Component
class App extends Component {
  // Constructor
  constructor(props) {
    super(props);

    // State of the Component
    this.state = {};
  }

  componentDidMount() {
    // Component is Mounted
    // get reference to the grandeur
    // through props. Which can be used to
    // access all the features of Grandeur
    var project = this.props.grandeur;
  }

  // Render
  render() {
    // Render the Component
    return <p>Hello World</p>;
  }
}

// Export the Component after wrapping in HOC
export default withGrandeur(App);
```

# Browser

Just simply drop the link of JavaScript SDK in a script tag inside your web app using our [CDN](https://unpkg.com/grandeur-js).

```html
<!-- Drop the Link of CDN in your Web App -->
<script src="https://unpkg.com/grandeur-js"></script>
```

This will give you access to the global `Grandeur` object, through which you can initialize the SDK and get a reference to your project as shown below

```javascript
// With global Grandeur object,
// you can simply initialize the SDK
// with your API key and get reference
// to your project
var project = grandeur.init("API-KEY", "SECRET-KEY");
```

Go change the world. You can now access all the amazing features of Grandeur with the reference object of your project that you just got. Take a look at the [example](#example) to learn how to quickly build an app to get a list of devices paired to the user account.

In the end, it is important to note it comes with CORS protection in it by default. So to start communicating with the cloud platform, simply visit [settings](https://cloud.grandeur.tech/settings) page at cloud dashboard and whitelist the domain that your web app is using (if you are testing it locally and haven't deployed it to a domain yet, just add localhost:[port] to the allowed domains list but don't forget to remove it from a list before shipping you app in production).
