import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Grandeur } from "grandeur-js/react";
import { BrowserRouter } from "react-router-dom";

const apiKey = "ApiKey";
const token = "SecretKey";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Grandeur apiKey={apiKey} secretKey={token}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Grandeur>
);
