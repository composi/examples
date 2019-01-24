// Fetch mock heroes:
export default function fetchHeroes() {
  return fetch('/src/js/data/mock-heroes.json')
    .then(function (response) {
      return response.json()
    })
}
