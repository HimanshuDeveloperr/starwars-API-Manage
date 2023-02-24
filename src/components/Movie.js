import React from 'react';
import { Button } from 'react-bootstrap';

import classes from './Movie.module.css';

const Movie = (props) => {
  

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <div>
        <Button onClick={props.onDeleteMovie} style={{border:"white 2px solid"}}>Delete</Button>
      </div>
    </li>
  );
};

export default Movie;
