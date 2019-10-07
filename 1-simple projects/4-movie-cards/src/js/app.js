import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { Movies } from './components/movie/movies'
import movieService from './services/movieService';

// Render title for app:
render(<Title message='Movie Cards'/>, 'header')


const program = {
  init() {
    return [{ movies: [] }]
  },
  view(state, send) {
    if (!state || !state.length) return
    return render(<Movies {...{ state, send }} />, '.container-fluid')
  },
  update(state, msg) {
    switch (msg.type) {
      case 'load-movies':
        return [msg.value]
    }
  },
  subscriptions(getState, send) {
    return movieService(getState, send)
  }
}

// run movies program:
run(program)
