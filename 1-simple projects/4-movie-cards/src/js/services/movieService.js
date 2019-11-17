/**
 * @param {import('../types').Send} send
 */
export default function movieService(send) {
  (async() => {
    const response = await fetch('/src/js/data/movies.json')
    const movies = await response.json()
    send({ type: 'load-movies', data: movies })
    console.log(movies)
  })()
}
