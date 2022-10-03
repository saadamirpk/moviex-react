const key = process.env.REACT_APP_MOVIES_API_KEY;

export function topratedMovies() {
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;
}

export function upcomingMovies() {
  return `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`;
}

export function popularMovies() {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
}

export function similarMovie(id = "0") {
  return `https://api.themoviedb.org/3/movie/${id}$/similar?api_key=${key}&language=en-US&page=1`;
}

export function getImageUrl(size = "original", name = "") {
  return `https://image.tmdb.org/t/p/${size}${name}`;
}
