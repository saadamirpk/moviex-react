import { React, useEffect, useState, useRef } from "react";
import MovieTile from "./MovieTile";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const FavMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();
  const slider = useRef();

  useEffect(() => {
    try {
      onSnapshot(doc(db, "users", user?.email), (doc) => {
        setMovies(doc.data()?.favMovies);
      });
      setLoading(false);
    } catch (error) {
      console.log("10x" + error);
    }
  }, [user?.email]);

  function renderMoviesTiles() {
    if (!loading) {
      if (movies < 1) {
        return (
          <p className="ml-4 text-sm text-gray-600">
            It's Empty in here :(
            <br />
            Mark your favourite movies to add them to this list.
          </p>
        );
      }
      return movies.map((movie) => (
        <MovieTile
          key={movie.id}
          movie={movie}
          isFav={true}
          callback={true}
          removeFavMovie={removeFavMovie}
        />
      ));
    }
    return "loadingggg";
  }

  async function removeFavMovie(movieId) {
    const movieRef = doc(db, "users", user.email);
    const result = movies.filter((item) => item.id !== movieId);
    try {
      //remove from fav
      await updateDoc(movieRef, {
        favMovies: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const scrollLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const scrollRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="unSelectable p-4 font-bold md:text-xl">My Favourites</h2>
      <div className="flex items-center relative group">
        {movies.length > 0 && (
          <MdChevronLeft
            className="bg-white text-black left-2 rounded-full absolute z-10 opacity-60 hover:opacity-80 hidden group-hover:block cursor-pointer"
            size={35}
            onClick={scrollLeft}
          />
        )}
        <div
          ref={slider}
          className="overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {renderMoviesTiles()}
        </div>
        {movies.length > 0 && (
          <MdChevronRight
            className="bg-white text-black right-2 rounded-full absolute z-10 opacity-60 hover:opacity-80 hidden group-hover:block cursor-pointer"
            size={35}
            onClick={scrollRight}
          />
        )}
      </div>
    </>
  );
};

export default FavMovies;
