import { h } from '@composi/core'
import Title from './title'
import Button from './button'

/**
 * @param {{lastUpdate: Date, send: import('../types').Send}} props
 */
export default function Navigation({lastUpdate, send}) {
  return (
    <div class="navigation">
      <Title/>
      <h4 class='last-update'>Last updated at {lastUpdate ? lastUpdate.toString() : 'never'}</h4>
      <p class='sort-button--paragraph'>
        <div class="top-items">
          <Button title='Sort!' onClick={() => send({ type: 'sort' })} />
          <Button title='Reload!' onClick={() => send({ type: 'reload' })}/>
        </div>
      </p>
    </div>
  )
}
