// Function to find a character based on data intered in search box.
export function findCharacter(e, state) {
  const input = e.target
  const value = input.value

  const characters = state.characters
  if (value) {
    const character = characters.filter(char => {
      const regex = new RegExp(value, 'img')
      return char.name.match(regex)
    })[0]
    if (character) {
      state.character = character
      state.dashboard = false
      return state
    }
  } else {
    alert('Please provide a character name to search for.')
  }
}
