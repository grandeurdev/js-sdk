Grandeur client for browsers. Check full docs at https://docs.grandeur.dev

[![NPM](https://img.shields.io/npm/v/grandeur-js.svg)](https://www.npmjs.com/package/grandeur-js) [![Downloads/week](https://img.shields.io/npm/dw/grandeur-js.svg)](https://npmjs.org/package/grandeur-js.svg) [![License](https://img.shields.io/npm/l/grandeur-js.svg)](https://github.com/grandeurtech/js-sdk/blob/master/package.json)

Here is how you can integrate Grandeur in your project.

## React

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
import {Grandeur} from "grandeur-js/react";

// Render app
const page = (
	<Grandeur apiKey="YOUR-APIKEY" secretKey="SECRET-KEY" credentials={credentials}>
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
import React, {Component} from "react";

// Import Grandeur HOC
import {withGrandeur} from "grandeur-js/react";

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

## Browser

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

Check full sdk references from [documentation](https://docs.grandeur.dev/references/client-sdk/installation). Or check full [examples](https://github.com/grandeurdev/js-sdk/tree/master/examples).

## Node.js

After downloading the package from npm, you can use it in your node project.

```js
import grandeur from "grandeur-js";
```

This will give you access to the global `Grandeur` object, through which you can initialize the SDK and get a reference to your project as shown below

```javascript
// With global Grandeur object,
// you can simply initialize the SDK
// with your API key and get reference
// to your project
var project = grandeur.init("API-KEY", "SECRET-KEY");
```

For User Authorization, generate a token from Grandeur Dahsboard and use as shown below.

```js
var response = await project.auth().token("AUTH_TOKEN");
```

To Fetch device information:

```js
var {device} = await devices.device(deviceID).get("");
```

To Set device information:

```js
await project.devices().device(deviceID).data().set("");
```
