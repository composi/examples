import { h, render, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'
import fetchHeroes from '../utils/fetch-heroes'
import { Msg } from '../utils/tagged-union'
import { actions } from '../utils/actions'


function getHeroes() {
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
    return actions(prevState, msg)
  },
  subscriptions() {
    return getHeroes
  }
}