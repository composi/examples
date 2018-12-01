import { h, render, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'
import fetchHeroes from '../utils/fetch-heroes'



function getHeroes() {
  fetchHeroes()
    .then(heroes => {
      program.send({ type: 'use-fetched-heroes', data:heroes})
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

export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<App {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    let prevState = mergeObjects(state)
    switch (msg.type) {
      case 'use-fetched-heroes':
        prevState.heroes = msg.data
        return [prevState]
      case 'active-component':
        prevState.activeComponent = msg.data
        return [prevState]
      case 'show-detail':
        const position = prevState.heroes.findIndex(person => person.id == msg.data)
        const hero = prevState.heroes[position]
        try {
          hero.originalName = hero.name
          prevState.activeComponent = 'detail'
          prevState.selectedHero = hero
        } catch (err) { }
        return [prevState]
      case 'delete-item':
        prevState.heroes = prevState.heroes.filter(hero => hero.id != msg.data)
        return [prevState]
      case 'change-hero-name':
        prevState.selectedHero.name = msg.data
        return [prevState]
      case 'reset-name':
        prevState.selectedHero.name = prevState.selectedHero.originalName
        return [prevState]
      case 'save-name':
        window.location.hash = '#/heroes'
        return [prevState]
      case 'new-hero':
        prevState.newHero = msg.data
        return [prevState]
      case 'add-hero':
        prevState.heroes.push({
          id: prevState.newId++,
          name: prevState.newHero
        })
        prevState.newHero = ''
        return [prevState]
    }
  },
  subscriptions() {
    return getHeroes
  }
}