// Fetch mock heroes:
export default function fetchHeroes() {
  return fetch('/src/js/data/mock-heroes.js')
  .then(function(response) {
    return response.json()
  })
}
