import { h } from '@composi/core'
import Title from './title'
import SortButton from './sort-button'
import ResetButton from './reset-button'

export default function Navigation({lastUpdate, send}) {
  return (
    <div class="navigation">
      <Title/>
      <h4 class='last-update'>Last updated at {lastUpdate ? lastUpdate.toString() : 'never'}</h4>
      <p class='sort-button--paragraph'>
        <div class="top-items">
          <SortButton {...{ send }}/> 
          <ResetButton {...{ send }}/>
        </div>
      </p>
    </div>
  )
}