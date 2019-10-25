/**
 * Function to find a character based on data intered in search box.
 * @param {import('../types').State} state
 */
export function findCharacter(state) {
  const value = state.inputValue
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
