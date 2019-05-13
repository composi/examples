import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  if (state.activeComponent === 'dashboard') {
    return (
      <div class="app-root">
        <HeroDashboard
          {...{ state, send }} />
      </div>
    )
  } else if (state.activeComponent === 'heroes') {
    return (
      <div class="app-root">
        <HeroList
          {...{ state, send }} />
      </div>
    )
  } else if (state.activeComponent === 'detail') {
    return (
      <div class="app-root">
        <HeroDetail
          {...{ state, send }} />
      </div>
    )
  }
}
