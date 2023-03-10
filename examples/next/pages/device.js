import { withGrandeur } from "grandeur-js/react";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Loading from "../public/loading.svg";
import ButtonOff from "../public/buttonOff.svg";
import ButtonOn from "../public/buttonOn.svg";
import Image from "next/image";
import { useRouter } from "next/router";

function Device(props) {
  const deviceID = "DeviceID";
  const router = useRouter();
  const [deviceName, setDeviceNameState] = useState("");
  const [data, setButtonState] = useState(0);

  useEffect(() => {
    displayDevice();

    async function displayDevice() {
      var res = await props.grandeur.auth().isAuthenticated();

      //  if the user isn't authorized then show the login screen
      if (res.code === "AUTH-UNAUTHORIZED") {
        router.push("/");
      }

      var devices = props.grandeur.devices();

      /** Get device name */
      var { device } = await devices.device(deviceID).get("name");

      if (device.name) setDeviceNameState(device.name);

      var { data } = await devices
        .device(deviceID)
        .data()
        .get("led");

      data ? setButtonState(data) : setButtonState(0);

      devices
        .device(deviceID)
        .data()
        .on("led", (path, state) => {
          setButtonState(state);
        });
    }
  });

  async function updateState() {
    // Use the devices class of sdk to report the upgrade
    await props.grandeur
      .devices()
      .device(deviceID)
      .data()
      .set("led", data ? 0 : 1);
  }
  return (
    <>
      <Header></Header>
      <div className="flex w-screen h-screen bg-gray-50  justify-center items-center">
        <div id="device" className="h-96 w-96 flex flex-col justify-center items-center content-around">
          {!deviceName ? (
            <div id="device-loading" className="w-20 h-auto">
              <Image src={Loading} alt="ReactLogo" />
            </div>
          ) : (
            <div id="device-button" onClick={updateState}>
              <div className="h-44 w-44 bg-gray-400 drop-shadow-lg rounded-2xl flex items-center justify-center cursor-pointer">
                <Image src={!data ? ButtonOff : ButtonOn} alt="" />
              </div>

              <div className="text-gray-900 font-sans text-md font-bold mt-10 text-center" id="device-name">
                {!deviceName ? "Device" : deviceName}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withGrandeur(Device);
