import React from 'react';
import { Button } from 'react-bootstrap';

import classes from './Movie.module.css';

const Movie = (props) => {
  const handleDeleteMovie = () => {
    props.onDeleteMovie(props.id);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <div>
        <Button onClick={handleDeleteMovie}>Delete</Button>
      </div>
    </li>
  );
};

export default Movie;
