export default function movieService(state, send) {
  fetch('/src/js/data/movies.json')
    .then(response => response.json())
    .then(movies => {
      send({ type: 'load-movies', value: movies })
    })
}
