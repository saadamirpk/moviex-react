import { React, useState } from "react";
import { getImageUrl } from "../Util/Requests";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const MovieTile = ({
  movie,
  isFav = false,
  callback = false,
  removeFavMovie,
}) => {
  const [isfav, setIsFav] = useState(isFav);
  const { user } = UserAuth();

  const saveMovie = async () => {
    if (user) {
      if (!isfav) {
        setIsFav((prev) => !prev);
        //Add to fav
        await updateDoc(doc(db, "users", user.email), {
          favMovies: arrayUnion({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
          }),
        });
      } else {
        setIsFav((prev) => !prev);
        if (callback) {
          await removeFavMovie(movie.id);
        }
      }
    } else {
      alert("Please Sign In");
    }
  };

  return (
    <div className="unSelectable w-[165px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={getImageUrl("w500", movie?.backdrop_path)}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80 hover:opacity-100">
        <p className="white-space-normal h-full flex justify-center items-center">
          <span className="w-full text-xs p-[10%] md:text-sm lg:text-md text-center font-bold whitespace-normal">
            {movie?.title}
          </span>
        </p>
        <p onClick={saveMovie}>
          {isfav ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieTile;
