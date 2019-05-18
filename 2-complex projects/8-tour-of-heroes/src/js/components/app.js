import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  const { activeComponent: ac } = state
  return (
    <div class="app-root">
      {
        ac === 'dashboard' ?
          <HeroDashboard {...{ state, send }} /> :
        ac === 'heroes' ?
          <HeroList {...{ state, send }} /> :
        ac === 'detail' ?
          <HeroDetail {...{ state, send }} /> :
          ''
      }
    </div>
  )
}
