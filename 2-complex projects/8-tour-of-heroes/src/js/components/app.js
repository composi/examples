import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  return (
    state.activeComponent === 'dashboard' ?
      (
        <div class="app-root">
          <HeroDashboard
            {...{ state, send }} />
        </div>
      ) :
    state.activeComponent === 'heroes' ?
      (
        <div class="app-root">
          <HeroList
            {...{ state, send }} />
        </div>
      ) :
    state.activeComponent === 'detail' ?
      (
        <div class="app-root">
          <HeroDetail
            {...{ state, send }} />
        </div>
      ) :
      ''
  )
}
