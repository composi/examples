import { h } from '@composi/core'
import { TableHeader } from './table-header'
import { TableRow } from './tabel-row'
import { TableFooter } from './table-footer'
import { NewRowForm } from './new-row-form'



// Combine parts of spreadsheet into one component:
function Spreadsheet({state, send}) {
  return (
    <li class='list--spreadsheet__item'>
      <table id='spreadsheet'>
        <TableHeader/>
        {
          state.fruits.map((row, idx) => (
            <TableRow {...{row, idx, send}}/>
          ))
        }
        <TableFooter {...{ state}}/>
      </table>
    </li>
  )
}

// Create complete spreadsheet:
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
