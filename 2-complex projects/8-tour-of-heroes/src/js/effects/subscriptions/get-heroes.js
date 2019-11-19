
/**
 * @param {import('../../types').Send} send
 */
export function getHeroes(send) {
  (async () => {
    const data = await fetch('/src/js/data/mock-heroes.json')
    /** @type {import('../../types').Hero[]} */
    const json = await data.json()
    send({ type: 'use-fetched-heroes', data: json })
  })()
}