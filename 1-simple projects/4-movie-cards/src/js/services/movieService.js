export default function movieService(getState, send) {
  (async() => {
    const response = await fetch('/src/js/data/movies.json')
    const movies = await response.json()
    send({ type: 'load-movies', value: movies })
  })()
}
