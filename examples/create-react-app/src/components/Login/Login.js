import { withGrandeur } from "grandeur-js/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function start() {
    /** Use sdk auth class to check auth status */
    var res = await props.grandeur.auth().isAuthenticated();

    /** Then if the user isn't authorized then show the login screen */
    if (res.code === "AUTH-AUTHORIZED") {
      navigate("/device", { replace: true });
    }
  }

  async function login(event) {
    event.preventDefault();

    const email = "ahmadbutt4260@gmail.com";
    const password = "pakistan";

    var res = await props.grandeur.auth().login(email, password);

    if (res.code === "AUTH-ACCOUNT-LOGGEDIN") {
      navigate("/device", { replace: true });
    }
  }

  start();

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input ref={emailRef} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input ref={passwordRef} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              </div>
              <button type="submit" className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withGrandeur(Login);
