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

// Effect to run as subscription to load movies when program starts:
function loadMovies(state, send) {
  send({type: 'load-movies'})
}

export const program = {
  init() {
    return [{ movies: []}]
  },
  view(state, send) {
    return render(<Movies {...{state, send}}/>, 'section')
  },
  update(state, msg) {
    const prevState = mergeObjects(state)
    switch(msg.type) {
      case 'load-movies':
        prevState.movies = MovieService.getMovies()
        return [prevState]
    }
  },
  subscriptions(state, send) {
    return loadMovies(state, send)
  }
}
