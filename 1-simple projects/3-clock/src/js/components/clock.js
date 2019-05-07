import { h, render } from '@composi/core'
import { clone } from '@composi/merge-objects'

// Date/Time utility for clock:
class DateTime {
  constructor(date) {
    this.date = date ? date : new Date();

    this.monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];

    this.dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ]
  }

  hours() {
    return this.formatUnitOfTime(this.date.getHours())
  }

  minutes() {
    return this.formatUnitOfTime(this.date.getMinutes())
  }

  seconds() {
    return this.formatUnitOfTime(this.date.getSeconds())
  }

  dayOfWeek() {
    return this.dayNames[this.date.getDay()]
  }

  dayOfMonth() {
    return this.formatUnitOfTime(this.date.getUTCDate())
  }

  month() {
    return this.monthNames[this.date.getMonth()]
  }

  year() {
    return `${this.date.getFullYear()}`
  }

  formatUnitOfTime(unitOfTime) {
    return unitOfTime < 10 ? `0${unitOfTime}` : `${unitOfTime}`
  }

  static toDateString(date) {
    var dateTime = new DateTime(date)

    return `${dateTime.dayOfWeek().substring(0, 3)} ${dateTime.dayOfMonth()} ${dateTime.month()} ${dateTime.year()}`
  }

  static toTimeString(date) {
    var dateTime = new DateTime(date)

    return `${dateTime.hours()}:${dateTime.minutes()}:${dateTime.seconds()}`
  }
}

// Display functional component:
function Display({ state, send }) {
  return (
    <div class="container-fluid">
      <div class="d-flex flex-row">
        <div class="col-md-4 mx-auto">
          <div class="display">
            <div class="display-time">{DateTime.toTimeString(state.date)}</div>
            {state.isDateVisible && <div class="display-date">{DateTime.toDateString(state.date)}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// Panel functional component:
function Panel({ state, send }) {
  return (
    <div class="container">
      <div class="d-flex flex-row">
        <div class="col-md-4 mx-auto">
          <div class="panel">
            <label id="date-switch" class="switch">
              <input type="checkbox" checked={state.isDateVisible} onchange={() => send({ type: 'toggle-date' })} />
              <span class="slider round"></span>
            </label>
            <label class="panel-switch-text" for="date-switch">
              <i class="fa fa-calendar"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

// Initial state for program:
const state = {
  date: new Date(),
  isDateVisible: true
}

// Clock component:
function Clock({ state, send }) {
  return (
    <div>
      <Panel {...{ state, send }} />
      <Display {...{ state, send }} />
    </div>
  )
}

// Effect to run as subscription to start clock ticking:
function startClock(state, send) {
  setInterval(() => send({ type: 'update-time' }), 1000)
}

function actions(prevState, msg) {
  switch (msg.type) {
    case 'toggle-date':
      prevState.isDateVisible = !prevState.isDateVisible
      return [prevState]
    case 'update-time':
      prevState.date = new Date()
      return [prevState]
  }
}

// Define program to run:
export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(<Clock {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    const prevState = clone(state)
    return actions(prevState, msg)
  },
  subscriptions(state, send) {
    return startClock(state, send)
  }
}
