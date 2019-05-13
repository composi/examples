// Get sum of all items:
export function sumUp(rows) {
  let total = 0
  rows.forEach((row) => {
    total += row.price * row.quantity
  })
  return total
}
