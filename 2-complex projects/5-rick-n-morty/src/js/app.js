import { h, render, run } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { TopBar } from './components/topbar'
import { InfoBox } from './components/infobox'
import { DetailBox } from './components/detailbox'


// Function to find a character based on data intered in search box.
function findCharacter(e, state) {
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

// Main component for app where we assemble the pieces together:
function App({ state, send }) {
  const dashboard = state.dashboard

  // If no characters yet, return.
  // Characters are fetched from json file.
  if (!state.characters) return
  const char = state.characters[0]
  if (dashboard) {
    return (
      <section>
        <TopBar {...{ dashboard, send }} />
        <div id="infocontainer">
          {
            state.characters.map(char => (
              <InfoBox {...{ send, character: char }} />
            ))}
        </div>
      </section>
    )
  } else {
    return (
      <section>
        <TopBar {...{ dashboard, send }} />
        <div id="infocontainer">
          <DetailBox character={state.character} />
        </div>
      </section>
    )
  }
}

// Intial state for program:
const state = {
  dashboard: true
}

// Define actions for program:
function actions(prevState, msg) {
  switch (msg.type) {
    case 'show-character':
      const target = msg.data.target.closest('.infobox')
      const characters = prevState.characters
      const id = target.dataset.id
      const character = characters.filter(char => id === char.id)[0]
      prevState.character = character
      prevState.dashboard = false
      return [prevState]
    case 'show-dashboard':
      prevState.dashboard = 'true'
      return [prevState]
    case 'find-character':
      if (msg.data.keyCode == 13) {
        prevState = findCharacter(msg.data, state)
      }
      return [prevState]
  }
}

// Define program to run:
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<App {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    // Clone state:
    let prevState = mergeObjects(state)
    return actions(prevState, msg)
  },
  subscriptions(state, send) {
    async function getCharacters() {
      let response = await fetch('/src/js/data/characters.json')
      let data = await response.json()
      return data
    }
    getCharacters(characters => characters)
      .then(characters => {
        state.characters = characters
        state.character = characters[0]
        send({ type: 'show-dashboard' })
      })
  }
}

run(program)
