import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <header>
      <nav className="flex items-center justify-between px-4 z-[100] py-4 w-full absolute">
        <Link to="/">
          <h2 className="text-red-600 text-4xl cursor-pointer">MOVIEX</h2>
        </Link>
        <div>
          {user ? (
            <Link to="/account">
              <button className="mr-4">Account</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="mr-4">Log In</button>
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <Link to="/signup">
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
