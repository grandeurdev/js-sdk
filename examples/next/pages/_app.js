import "@/styles/globals.css";
import { Grandeur } from "grandeur-js/react";

export default function App({ Component, pageProps }) {
  const apiKey = "ApiKey";
  const secretKey = "SecretKey";

  return (
    <Grandeur apiKey={apiKey} secretKey={secretKey}>
      <Component {...pageProps} />
    </Grandeur>
  );
}
