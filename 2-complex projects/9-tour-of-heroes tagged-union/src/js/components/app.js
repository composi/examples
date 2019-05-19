import { h } from '@composi/core'
import HeroDashboard from './hero-dashboard'
import { HeroList } from './hero-list'
import HeroDetail from './hero-detail'


export function App({ state, send }) {
  return (
    <div class="app-root">
      <HeroDashboard {...{ state, send }} />
      <HeroList {...{ state, send }} />
      <HeroDetail {...{ state, send }} />
    </div>
  )
}
