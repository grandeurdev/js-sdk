import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Grandeur } from "grandeur-js/react";
import { BrowserRouter } from "react-router-dom";

const apiKey = "grandeurlesd86lu7mgj0jjpb3uw0cbb";
const token = "80a923adb1ab257fd51d388a34fe5e03351bd44c2e239bc621d2b064846b43c0";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Grandeur apiKey={apiKey} secretKey={token}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Grandeur>
);
