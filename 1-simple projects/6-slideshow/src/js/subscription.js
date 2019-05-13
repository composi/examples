

// Define subscription to run during program startup:
export function startShow(state, send) {
  let count = 1
  setInterval(() => {
    count += 1
    if (count > 17) count = 1
    send({ type: 'update-slide', data: count })
  }, 2000)
}
