import { idb } from '@composi/idb'
import { Msg, ShowDetail, ActiveComponent, SaveLocally  } from './messages'


/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  const prevState = {...state}

  return Msg.match(msg, {
    UseFetchedHeroes: data => {
      const newState = { ...data }
      if (data.detail) {
        setTimeout(() => send(ShowDetail(data.detail)))
      } else {
        setTimeout(() => send(ActiveComponent(newState.activeComponent)))
      }
      return newState
    },
    ActiveComponent: activeComponent => {
      const result = { ...prevState, activeComponent}
      send(SaveLocally(result))
      return { ...prevState, activeComponent }
    },
    ShowDetail: id => {
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
          send(SaveLocally(prevState))
        } catch (err) {
        }
      }
      return prevState
    },
    DeleteHero: id => {
      prevState.heroes = prevState.heroes.filter(hero => hero.id !== id)
      send(SaveLocally(prevState))
      return prevState
    },
    ChangeHeroName: name => {
      prevState.selectedHero.name = name
      return prevState
    },
    ResetName: () => {
      prevState.selectedHero.name = prevState.selectedHero.originalName
      return prevState
    },
    SaveName: () => {
      window.location.hash = '#/heroes'
      send(SaveLocally(prevState))
      return prevState
    },
    NewHero: name => {
      prevState.NewHero = name
      return prevState
    },
    AddHero: () => {
      if (prevState.NewHero) {
        prevState.heroes.push({
          id: prevState.newId++,
          name: prevState.NewHero
        })
        prevState.NewHero = ''
        send(SaveLocally(prevState))
      } else {
        alert('Please provide a name for the new hero before submitting.')
      }
      return prevState
    },
    SaveLocally: data => {
      idb.set('toh-state', data)
      return prevState
    },
    Search: value => {
      const searchResults = prevState.heroes.filter(hero => {
        const name = hero.name.toLowerCase()
        return name.match(value.toLowerCase())
      })
      return { ...prevState, searchResults}
    }
  })
}
