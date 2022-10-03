import { React, useEffect } from "react";
import FavMovies from "../Components/FavMovies";

const Account = () => {
  useEffect(() => {
    document.title = "My Account";
  }, []);

  return (
    <div className="w-full">
      <img
        className="w-full h-[400px] object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/45082c39-e6d5-4b02-8867-e38fe32ed3af/50d33012-be77-4a43-b4b8-778a83df15ca/PK-en-20220919-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Background"
      />
      <div className="w-full fixed h-[410px] top-0 left-0 bg-black/60"></div>
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">My Account</h1>
      </div>
      <FavMovies />
    </div>
  );
};

export default Account;
