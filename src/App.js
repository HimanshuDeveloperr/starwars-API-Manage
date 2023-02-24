import React, { useCallback, useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import MoviesList from "./components/MoviesList";
import "./App.css";
import NewMovies from "./components/NewMovies/NewMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFound, setErrorFound] = useState(null);
  
  
  
  const fetchingMovies = useCallback(async () => {
    setIsLoading(true);
    setErrorFound(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      console.log(response.status);
      
      const transformDataNames = data.results.map((arrofmovies) => {
        return {
          id: arrofmovies.episode_id,
          title: arrofmovies.title,
          openingText: arrofmovies.opening_crawl,
          releaseDate: arrofmovies.release_date,
        };
      });
      setMovies(transformDataNames);
    } catch (error) {
      setErrorFound(error.message);
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    fetchingMovies ()
  }, [fetchingMovies])


  if (errorFound) {
    var id = setTimeout(fetchingMovies, 5000);
  }

  let cancelHandler = useCallback(() => {
    clearTimeout(id);
    setErrorFound(null);
  }, [id]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0 && !isLoading) {
    content = <MoviesList movies={movies} />;
  }

  if (errorFound) {
    content = (
      <p>
        {errorFound}
        <div style={{ margin: "2px" }}>
          <Button style={{ color: "white" }} onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </p>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>

      <NewMovies/>
      </section>
      <section>
        
        <button onClick={fetchingMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
