import { Msg } from './messages'

export function actions(prevState, msg, send) {
  return Msg.match(msg, {
    useFetchedHeroes: data => {
      const newState = {
        activeComponent: 'dashboard',
        heroes: data,
        selectedHero: '',
        searchResults: [],
        newId: 21,
        newHero: '',
        inputValue: ''
      }
      return [newState]
    },
    activeComponent: activeComponent => [{ ...prevState, activeComponent }],
    showDetail: person => {
      const position = prevState.heroes.findIndex(person => person.id == msg.data)
      const hero = prevState.heroes[position]
      try {
        hero.originalName = hero.name
        prevState.activeComponent = 'detail'
        prevState.selectedHero = hero
      } catch (err) { }
      return [prevState]
    },
    deleteHero: id => {
      prevState.heroes = prevState.heroes.filter(hero => hero.id !== id)
      return [prevState]
    },
    changeHeroName: name => {
      prevState.selectedHero.name = name
      return [prevState]
    },
    resetName: () => {
      prevState.selectedHero.name = prevState.selectedHero.originalName
      return [prevState]
    },
    saveName: () => {
      window.location.hash = '#/heroes'
      return [prevState]
    },
    newHero: name => {
      prevState.newHero = name
      return [prevState]
    },
    addHero: () => {
      if (prevState.newHero) {
        prevState.heroes.push({
          id: prevState.newId++,
          name: prevState.newHero
        })
        prevState.newHero = ''
      } else {
        alert('Please provide a name for the new hero before submitting.')
      }
      return [prevState]
    }
  })
}