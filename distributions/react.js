// Grandeur Component is the most important
// part of the Grandeur SDK for react. It provides
// an interface with which the app could get access
// to the Grandeur Object in the entire Application.
// All you have to do is to wrap the main component
// of the application into the component exported
// through this file

// How it Works
// We use React Context to build an application context
// which return two Components; Provider and Consumer
// To make the context accessible in a child it is
// compulsory to wrap the parent in the provider.
// Provider is where we actually intialize our context.
// We generally wrap the top most node of the app so that
// context could be made available all over the app.
// Then to access the context in a component, the
// consumer component is required to be utilized which
// returns a function with args as the context.

// Imports
import React from "react";
import * as grandeur from "../index";

const GrandeurContext = React.createContext(null);

// Default Grandeur Provider Component
export class Grandeur extends React.Component {

  // The constructor of our custom component
  constructor(props) {

    // Create component
    super(props);

    // Pass the plugins to sdk
    grandeur.extend ? grandeur.extend(props.extensions ? props.extensions : {}) : null;

    // Create state to store project
    var project = grandeur.init(props.apiKey, props.secretKey, props.overrides);

    // Pass to state
    this.state = {

      grandeur: project

    }

  }

  // Render the custom component
  render() {

    // Return the user component wrapped in our context
    return <GrandeurContext.Provider value={this.state.grandeur}>{this.props.children}</GrandeurContext.Provider>;

  }
  
}

// Export the Grandeur higher order component
export const withGrandeur = (Component) => (props) => <GrandeurContext.Consumer>{(grandeur) => <Component {...props} grandeur={grandeur} />}</GrandeurContext.Consumer>;