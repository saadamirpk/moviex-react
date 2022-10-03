import { React, useEffect } from "react";
import Main from "../Components/Main";
import MovieRow from "../Components/MovieRow";
import {
  upcomingMovies,
  topratedMovies,
  popularMovies,
} from "../Util/Requests";

const Home = () => {
  useEffect(() => {
    document.title = "Moviex";
  }, []);

  return (
    <>
      <Main />
      <MovieRow title="Up Coming" fetchQuery={upcomingMovies()} />
      <MovieRow title="Top Rated" fetchQuery={topratedMovies()} />
      <MovieRow title="Popular" fetchQuery={popularMovies()} />
    </>
  );
};

export default Home;
