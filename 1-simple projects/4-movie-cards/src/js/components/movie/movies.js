import { h, render } from '@composi/core';
import MovieList from './movieList';
import movieService from '../../services/movieService';

function Movies({ state, send }) {
  console.log(state)
  return (
    <div class="container-fluid" style={{ marginLeft: '-15px' }}>
      <div class="d-flex flex-row">
        <div class="col-sm-12">
          <MovieList movies={state} />
        </div>
      </div>
    </div>
  )
}

export const program = {
  init() {
    return [{ movies: [] }]
  },
  view(state, send) {
    if (!state || !state.length) return
    return render(<Movies {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    switch (msg.type) {
      case 'load-movies':
        return [msg.value]
    }
  },
  subscriptions(state, send) {
    return movieService(state, send)
  }
}
