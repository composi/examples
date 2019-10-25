// Get sum of all items:
/**
 * @typedef {import('../types').Item} Item
 * @param {Item[]} rows
 */
export function sumUp(rows) {
  let total = 0
  rows.forEach((row) => {
    total += row.price * row.quantity
  })
  return total
}
