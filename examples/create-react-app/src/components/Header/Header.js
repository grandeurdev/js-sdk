import { withGrandeur } from "grandeur-js/react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  async function logout(event) {
    event.preventDefault();

    await props.grandeur.auth().logout();
    navigate("/", { replace: true });
  }
  return (
    <div className="absolute inset-0 flex w-full h-12 items-center justify-between px-6 bg-gray-300 drop-shadow-md border-box">
      <div className="text-gray-600 font-sans text-md font-bold">Internet Switch</div>
      <button id="logout" onClick={logout} className="h-8 text-gray-600 bg-gray-200 rounded-md px-5 text-sm font-sans font-bold cursor-pointer">
        Logout
      </button>
    </div>
  );
}

export default withGrandeur(Header);
