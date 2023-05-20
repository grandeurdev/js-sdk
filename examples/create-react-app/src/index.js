import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Grandeur } from "grandeur-js/react";
import { BrowserRouter } from "react-router-dom";

const apiKey = "grandeurlh6487i7fiwb0kjch5m2gemr";
const secretKey = "13f90061a3a268a39a397945a265fd0681b66f24ea780c5bed2ba911bef13ad5";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Grandeur apiKey={apiKey} secretKey={secretKey}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Grandeur>
);
