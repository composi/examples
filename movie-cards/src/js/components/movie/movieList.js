import { h } from '@composi/core';
import MovieCard from './movieCard';

const getMovies = (movies) => {
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
    {getMovies(props.movies)}
  </div>
);

export default MovieList;
