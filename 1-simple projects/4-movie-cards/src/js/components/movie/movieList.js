import { h } from '@composi/core';
import MovieCard from './movieCard';

// Functional component to display movies:
const showMovies = (movies) => {
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
