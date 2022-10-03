import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rem, setRem] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signIn } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user]);

  useEffect(() => {
    setError(false);
  }, [email, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verifyInputs()) {
      try {
        setLoading(true);
        await signIn(email, pass);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrorMsg(error.message.split(":")[1]);
      }
    }
  };

  function verifyInputs() {
    if (email.length < 3) {
      setErrorMsg("Please enter valid email");
      setError(true);
      return false;
    } else if (pass.length < 6) {
      setErrorMsg("Password minimum 6 characters");
      setError(true);
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/45082c39-e6d5-4b02-8867-e38fe32ed3af/50d33012-be77-4a43-b4b8-778a83df15ca/PK-en-20220919-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Background"
        />
        <div className="w-full h-screen fixed top-0 left-0 bg-black/60"></div>
        <div className="fixed w-full px-4 py-24 z-30">
          <div className="max-w-[450px] h-[600px] bg-black/75 mx-auto">
            <div className="px-12 py-16">
              <h2 className="text-3xl font-bold">Login</h2>
              <form
                className="flex flex-col w-full py-4"
                onSubmit={handleSubmit}
              >
                {error && (
                  <input
                    className="my-2 p-3 bg-red-500/60 text-white rounded outline-none focus:outline-red-600"
                    value={errorMsg}
                    type="text"
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
                <input
                  className="my-2 p-3 bg-gray-700 rounded outline-none focus:outline-red-600"
                  placeholder="email@mail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="my-2 p-3 bg-gray-700 rounded outline-none focus:outline-red-600"
                  placeholder="password123"
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-red-600 rounded py-3 my-6 font-bold hover:bg-red-700 outline-none"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex justify-between items-center py-4 text-sm text-gray-600">
                  <p>
                    <input
                      type="checkbox"
                      checked={rem}
                      onChange={() => setRem((prev) => !prev)}
                      className="mr-2 cursor-pointer h-[10px] w-[10px]"
                    />
                    Remember me
                  </p>
                  <Link to="/help">
                    <p>Need Help?</p>
                  </Link>
                </div>
                <p className="py-4 text-sm">
                  <span className="text-gray-600 mr-2">New to Moviex?</span>
                  <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
