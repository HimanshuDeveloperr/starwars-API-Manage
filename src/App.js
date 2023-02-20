import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [errorFound,setErrorFound]=useState(null)
   

  async function fetchingMovies() {
    setIsLoading(true)
    setErrorFound(null)
  try {
    const response = await fetch("https://swapi.dev/api/film/");
    if(!response.ok){
      throw new Error("something went wrong")
    }
    const data = await response.json();
    console.log(response.status)



    const transformDataNames = data.results.map((arrofmovies) => {
      return {
        id: arrofmovies.episode_id,
        title: arrofmovies.title,
        openingText:arrofmovies.opening_crawl,
        releaseDate:arrofmovies.release_date
      };
    });
    setMovies(transformDataNames);
    
  } catch (error) {
    setErrorFound(error.message);
        

  }
      setIsLoading(false)

}

    
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchingMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&& movies.length>0 &&<MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>Found no movies.</p>}
        {!isLoading && errorFound && <p>{errorFound}</p>}
        {isLoading&&<p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
