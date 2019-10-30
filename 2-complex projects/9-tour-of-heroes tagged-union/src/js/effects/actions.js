import { idb } from '@composi/idb'
import { Msg } from './messages'


const { showDetail, activeComponent, saveLocally } = Msg

/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  const prevState = {...state}

  return Msg.match(msg, {
    useFetchedHeroes: data => {
      const newState = { ...data }
      if (data.detail) {
        setTimeout(() => send(showDetail(data.detail)))
      } else {
        setTimeout(() => send(activeComponent(newState.activeComponent)))
      }
      return newState
    },
    activeComponent: activeComponent => ({ ...prevState, activeComponent, searchResults: /** @type {any} */([]) }),
    showDetail: id => {
      if (!prevState.heroes) return
      const position = prevState.heroes.findIndex(person => person.id == id)
      if (position === -1) {
        prevState.activeComponent = 'heroes'
      } else {
        const hero = prevState.heroes[position]
        try {
          hero.originalName = hero.name
          prevState.activeComponent = 'detail'
          prevState.selectedHero = hero
        } catch (err) {
        }
      }
      return prevState
    },
    deleteHero: id => {
      prevState.heroes = prevState.heroes.filter(hero => hero.id !== id)
      send(saveLocally(prevState))
      return prevState
    },
    changeHeroName: name => {
      prevState.selectedHero.name = name
      return prevState
    },
    resetName: () => {
      prevState.selectedHero.name = prevState.selectedHero.originalName
      return prevState
    },
    saveName: () => {
      window.location.hash = '#/heroes'
      send(saveLocally(prevState))
      return prevState
    },
    newHero: name => {
      prevState.newHero = name
      return prevState
    },
    addHero: () => {
      if (prevState.newHero) {
        prevState.heroes.push({
          id: prevState.newId++,
          name: prevState.newHero
        })
        prevState.newHero = ''
        send(saveLocally(prevState))
      } else {
        alert('Please provide a name for the new hero before submitting.')
      }
      return prevState
    },
    saveLocally: data => {
      idb.set('tof-state', data)
      return prevState
    },
    search: value => {
      const searchResults = prevState.heroes.filter(hero => {
        const name = hero.name.toLowerCase()
        return name.match(value.toLowerCase())
      })
      return { ...prevState, searchResults}
    }
  })
}
