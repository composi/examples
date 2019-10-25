import { h } from '@composi/core';
import MovieCard from './movieCard';

/**
 * Functional component to display movies.
 * @param {import('../../types').State} movies
 */
const showMovies = (movies) => {
  if (!movies) return
  return (
    <div class="card-deck">
      {
        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      }
    </div>
  );
};

const MovieList = (props) => (
  <div>
    {showMovies(props.movies)}
  </div>
);

export default MovieList;
