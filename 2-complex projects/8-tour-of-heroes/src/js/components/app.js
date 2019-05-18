import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  const { activeComponent } = state
  return (
    <div class="app-root">
      {
        activeComponent === 'dashboard' ?
          <HeroDashboard {...{ state, send }} /> :
        activeComponent === 'heroes' ?
          <HeroList {...{ state, send }} /> :
        activeComponent === 'detail' ?
          <HeroDetail {...{ state, send }} /> :
          ''
      }
    </div>
  )
}
