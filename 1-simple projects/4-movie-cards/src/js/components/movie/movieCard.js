import {h} from '@composi/core';
import StarRating from '../starRating';

// Define movie card component:
/**
 * @typedef {import('../../types').Movie} Movie
 */
/**
 * @param {{movie: Movie, key: number}} props
 */
const MovieCard = (props) => (
  <div class="movie-card">
    <div class="movie-card card">
      <img class="card-img-top" src={props.movie.imageUrl} alt="" />
      <div class="card-body">
        <h4 class="card-title">{props.movie.title}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{props.movie.subtitle}</h6>
        <p class="text-justify" style={{fontSize: '14px'}}>{props.movie.description}</p>
      </div>
      <div class="card-footer">
        <div class="clearfix">
          <div class="float-left mt-1">
            <StarRating rating={props.movie.rating} />
          </div>
          <div class="card-footer-badge float-right badge badge-primary badge-pill">{props.movie.rating}</div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieCard;
