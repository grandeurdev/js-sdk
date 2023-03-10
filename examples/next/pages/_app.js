import "@/styles/globals.css";
import { Grandeur } from "grandeur-js/react";

export default function App({ Component, pageProps }) {
  const apiKey = "ApiKey";
  const token = "SecretKey";

  return (
    <Grandeur apiKey={apiKey} secretKey={token}>
      <Component {...pageProps} />
    </Grandeur>
  );
}
