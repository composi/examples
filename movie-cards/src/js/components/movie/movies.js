import { h, render } from '@composi/core';
import { mergeObjects } from '@composi/merge-objects'
import MovieList from './movieList';
import MovieService from '../../services/movieService';

function Movies({state, send}) {
  return (
    <div class="container-fluid" style={{ marginLeft: '-15px' }}>
      <div class="d-flex flex-row">
        <div class="col-sm-12">
          <MovieList movies={state.movies} />
        </div>
      </div>
    </div>
  )
}

// Effect to load movies when program starts:
function loadMovies(send) {
  send({type: 'load-movies'})
}

export const program = {
  init() {
    return [{ movies: []}, loadMovies]
  },
  view(state, send) {
    return render(<Movies {...{state, send}}/>, 'section')
  },
  update(msg, state) {
    const prevState = mergeObjects(state)
    switch(msg.type) {
      case 'load-movies':
        prevState.movies = MovieService.getMovies()
        return [prevState]
    }
  }
}
