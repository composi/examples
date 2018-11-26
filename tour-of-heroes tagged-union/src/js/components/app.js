import { h, render, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'
import fetchHeroes from '../utils/fetch-heroes'
import { Msg } from '../utils/tagged-union'



function getHeroes(send) {
  fetchHeroes()
    .then(heroes => {
      program.send(Msg.UseFetchedHeroes(heroes))
    })
}

function App({state, send}) {
  if (state.activeComponent === 'dashboard') {
    return (
      <div class="app-root">
        <HeroDashboard
          {...{state, send}} />
      </div>
    )
  } else if (state.activeComponent === 'heroes') {
    return (
      <div class="app-root">
        <HeroList
          {...{state, send}} />
      </div>
    )
  } else if (state.activeComponent === 'detail') {
    console.log('gonna render detail')
    return (
      <div class="app-root">
        <HeroDetail
          {...{state, send}} />
      </div>
    )
  }
}

const state = {
  activeComponent: 'dashboard',
  heroes: [],
  selectedHero: '',
  searchResults: [],
  newId: 21,
  newHero: '',
  inputValue: ''
}

function actions(msg, prevState) {
  return Msg.match(msg, {
    'UseFetchedHeroes': heroes => {
      prevState.heroes = heroes
      return [prevState]
    }, 
    'ActiveComponent': component => { 
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

export const program = {
  init() {
    return [state, getHeroes]
  },
  view(state, send) {
    return render(<App {...{ state, send }} />, 'section')
  },
  update(msg, state) {
    let prevState = mergeObjects(state)
    return actions(msg, prevState)
  }
}