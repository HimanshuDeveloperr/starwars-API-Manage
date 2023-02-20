import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
   

  async function fetchingMovies() {
    setIsLoading(true)
  try {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformDataNames = data.results.map((arrofmovies) => {
      return {
        id: arrofmovies.episode_id,
        title: arrofmovies.title,
        openingText:arrofmovies.opening_crawl,
        releaseDate:arrofmovies.release_date
      };
    });
    setMovies(transformDataNames);
    setIsLoading(false)
  } catch (error) {
    console.error(error);
  }
}

    
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchingMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&& movies.length>0 &&<MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>Found no movies.</p>}
        {isLoading&&<p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
