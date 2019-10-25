import { h } from '@composi/core'
import { TableHeader } from './table-header'
import { TableRow } from './tabel-row'
import { TableFooter } from './table-footer'
import { NewRowForm } from './new-row-form'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('@composi/core').VNode} VNode
 */

/**
 * Combine parts of spreadsheet into one component.
 * @param {{state: State, send: Send}} props
 * @returns {VNode} VNode
 */
function Spreadsheet({state, send}) {
  return (
    <li class='list--spreadsheet__item'>
      <table id='spreadsheet'>
        <TableHeader/>
        {
          state.items.map((row, idx) => (
            <TableRow {...{row, idx, send}}/>
          ))
        }
        <TableFooter {...{ state}}/>
      </table>
    </li>
  )
}

/**
 * Create complete spreadsheet.
 * @param {{state: State, send: Send}} props
 * @returns {VNode} VNode
 */
export function SpreadSheet({state, send}) {
  return (
    <ul class='list--spreadsheet'>
      <Spreadsheet {...{ state, send }} />
      <li class='list--spreadsheet__item'>
        <NewRowForm {...{state, send}} />
      </li>
    </ul>
  )
}
