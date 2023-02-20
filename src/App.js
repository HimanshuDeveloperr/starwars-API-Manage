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
    const response = await fetch("https://swapi.dev/api/films/");
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

    
  let content=<p>Found no movies.</p>

  if(movies.length>0 && !isLoading){
    // movies array is not empty
    content=<MoviesList movies={movies} />
  }

  if(errorFound){
    // error is found

    content=<p>{errorFound}</p>
  }

  if(isLoading){
    content=<p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchingMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
