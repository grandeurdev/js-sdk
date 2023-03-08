import { withGrandeur } from "grandeur-js/react";
import { useEffect, useRef } from "react";
import Header from "../Header/Header";
import Loading from "../../loading.svg";
import ButtonOff from "../../buttonOff.svg";
import ButtonOn from "../../buttonOn.svg";

function Devices(props) {
  const deviceID = "DeviceId";

  const deviceLoading = useRef();
  const deviceButton = useRef();
  const deviceName = useRef();
  const buttonRef = useRef();

  const buttonState = useRef(0);

  useEffect(() => {
    displayDevice();

    async function displayDevice() {
      var devices = props.grandeur.devices();

      /** Get device name */
      var { device } = await devices.device(deviceID).get("name");

      await devices.device(deviceID).set("led", 1);

      var { data } = await devices
        .device(deviceID)
        .data()
        .get("led");

      buttonState.current = data;

      deviceLoading.current.style.display = "none";
      deviceButton.current.style.display = "block";

      /** Set device name */
      deviceName.current.innerHTML = device.name;
    }
  }, [buttonState, props.grandeur]);

  async function updateState() {
    if (buttonState.current) {
      buttonState.current = 0;
      buttonRef.current.src = ButtonOn;
    } else {
      buttonState.current = 1;
      buttonRef.current.src = ButtonOff;
    }

    /** Use the devices class of sdk to report the upgrade */
    await props.grandeur
      .devices()
      .device(deviceID)
      .data()
      .set("led", buttonState.current);
  }

  return (
    <>
      <Header></Header>
      <div className="flex w-screen h-screen bg-gray-50  justify-center items-center">
        <div
          id="device"
          className="h-96 w-96 flex flex-col justify-center items-center content-around"
        >
          <div ref={deviceLoading} id="device-loading" className="w-20 h-auto">
            <img src={Loading} alt="ReactLogo" />
          </div>
          <div
            ref={deviceButton}
            id="device-button"
            style={{ display: "none" }}
            onClick={updateState}
          >
            <div className="h-44 w-44 bg-gray-400 drop-shadow-lg rounded-2xl flex items-center justify-center cursor-pointer">
              <img ref={buttonRef} src={ButtonOff} alt="" />
            </div>

            <div
              className="text-gray-900 font-sans text-md font-bold mt-10 text-center"
              id="device-name"
              ref={deviceName}
            >
              Device
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withGrandeur(Devices);
