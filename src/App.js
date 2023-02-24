import React, { useCallback, useState, useEffect } from "react";
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
      const response = await fetch("https://mystarwar-api-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      console.log(response.status);
      console.log(data)

      const loadMovies = [];

      for (const key in data) {
        loadMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadMovies);
    } catch (error) {
      setErrorFound(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchingMovies()
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

  const MovieHandler = async (movies) => {
    // console.log(movies)
    const response = await fetch("https://mystarwar-api-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movies),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <React.Fragment>
      <section>

        <NewMovies onAddMovie={MovieHandler} />
      </section>
      <section>

        <button onClick={fetchingMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
