import axios from "axios";
import { React, useEffect, useState } from "react";
import { popularMovies, getImageUrl } from "../Util/Requests";

const Main = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(popularMovies()).then((res) => {
      const movies = res.data.results;
      const movie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(movie);
    });
  }, []);

  const trimOverview = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  return (
    <div className="w-full h-[550px]">
      <div className="w-full h-full">
        <div className="w-full h-[550px] absolute bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover"
          src={getImageUrl("original", movie?.backdrop_path)}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h2 className="text-3xl md:text-5xl font-bold">{movie?.title}</h2>
          <div className="my-4">
            <button className="border bg-gray-300 text-black mr-4 px-4 py-2 hover:bg-gray-200">
              Play
            </button>
            <button className="border text-white border-gray-300 px-4 py-2 hover:bg-black">
              Watch Later
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Released: {movie?.release_date}
          </p>
          <p className="text-gray-200 w-full sm:max-w-[75%] md:max-w-[60%] lg:max-w-[45%] xl:max-w-[35%]">
            {trimOverview(movie?.overview, 180)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
