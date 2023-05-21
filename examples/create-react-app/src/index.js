import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Grandeur } from "grandeur-js/react";
import { BrowserRouter } from "react-router-dom";

const apiKey = "ApiKey";
const secretKey = "SecretKey";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Grandeur apiKey={apiKey} secretKey={secretKey}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Grandeur>
);
