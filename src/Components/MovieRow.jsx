import axios from "axios";
import { React, useEffect, useState, useRef } from "react";
import MovieTile from "./MovieTile";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieRow = ({ title, fetchQuery }) => {
  const [Movies, setMovies] = useState([]);

  const slider = useRef();

  useEffect(() => {
    axios.get(fetchQuery).then((res) => {
      setMovies(res.data.results);
    });
  }, [fetchQuery]);

  function renderMoviesTiles() {
    return Movies?.map((movie) => <MovieTile key={movie.id} movie={movie} />);
  }

  const scrollLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const scrollRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="unSelectable p-4 font-bold md:text-xl">{title}</h2>
      <div className="flex items-center relative group">
        <MdChevronLeft
          className="bg-white text-black left-2 rounded-full absolute z-10 opacity-60 hover:opacity-80 hidden group-hover:block cursor-pointer"
          size={35}
          onClick={scrollLeft}
        />
        <div
          ref={slider}
          className="overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {renderMoviesTiles()}
        </div>
        <MdChevronRight
          className="bg-white text-black right-2 rounded-full absolute z-10 opacity-60 hover:opacity-80 hidden group-hover:block cursor-pointer"
          size={35}
          onClick={scrollRight}
        />
      </div>
    </>
  );
};

export default MovieRow;

/**
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"



        
*/
