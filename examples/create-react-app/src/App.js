import Devices from "./components/Devices/Devices";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </>
  );
}

export default App;
