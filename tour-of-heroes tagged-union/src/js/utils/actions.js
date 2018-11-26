import { Msg } from './tagged-union'

export function actions(msg, prevState) {
  return Msg.match(msg, {
    'UseFetchedHeroes': heroes => {
      prevState.heroes = heroes
      return [prevState]
    },
    'ActivateComponent': component => {
      prevState.activeComponent = component
      return [prevState]
    },
    'ShowDetail': id => {
      const position = prevState.heroes.findIndex(person => person.id == id)
      const hero = prevState.heroes[position]
      try {
        hero.originalName = hero.name
        prevState.activeComponent = 'detail'
        prevState.selectedHero = hero
      } catch (err) { }
      return [prevState]
    },
    'DeleteItem': id => {
      prevState.heroes = prevState.heroes.filter(hero => hero.id != id)
      return [prevState]
    },
    'ChangeHeroName': name => {
      prevState.selectedHero.name = name
      return [prevState]
    },
    'ResetName': () => {
      prevState.selectedHero.name = prevState.selectedHero.originalName
      return [prevState]
    },
    'SaveName': () => {
      window.location.hash = '#/heroes'
      return [prevState]
    },
    'NewHero': newHero => {
      prevState.newHero = newHero
      return [prevState]
    },
    'AddHero': () => {
      prevState.heroes.push({
        id: prevState.newId++,
        name: prevState.newHero
      })
      prevState.newHero = ''
      return [prevState]
    }
  })
}