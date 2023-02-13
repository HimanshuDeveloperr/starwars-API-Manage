import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  function fecthingMovies() {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformDataNames = data.results.map((arrofmovies) => {
          return {
            id: arrofmovies.episode_id,
            title: arrofmovies.title,
            openingText:arrofmovies.opening_crawl,
            releaseDate:arrofmovies.release_date
          };
        });
        setMovies(transformDataNames);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthingMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
