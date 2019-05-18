import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  // Destructure activeComponent state prop as 'ac':
  const {activeComponent: ac} = state
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
