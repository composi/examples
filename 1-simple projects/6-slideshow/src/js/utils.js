// Function to create state for program:
export function setupPics() {
  const pics = []
  for (let i = 17; i != 0; i--) {
    pics.push(`/dist/images/pics/IMG_${i}.jpg`)
  }
  return pics
}
