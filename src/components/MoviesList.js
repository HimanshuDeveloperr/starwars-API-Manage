import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const handleDeleteMovie = (movieId) => {
    props.onDeleteMovie(movieId);
  };
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDeleteMovie={() => handleDeleteMovie(movie.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
