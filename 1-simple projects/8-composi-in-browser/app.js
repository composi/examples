// @ts-ignore
import {h, render, run, union} from 'https://unpkg.com/@composi/core@latest/dist/composi-core.mjs?module'
// @ts-ignore
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
// @ts-ignore
import {clone} from 'https://unpkg.com/@composi/clone/src/index.js?module'

const html = htm.bind(h)

function Title({msg}) {
  return html`
    <header>
      <nav>
        <h1>@composi/core: ${msg}!</h1>
      </nav>
    </header>
  `
}
render(html`<${Title} msg='In the Browser'/>`, 'header')

/**
 * Tagged union for program actions.
 * @type {MessageUnion}
 */
const Msg = union('UpdateInputValue', 'AddItem', 'DeleteItem')
const {UpdateInputValue, AddItem, DeleteItem} = Msg

/**
 * Functional list component for view.
 * @param {{state: State, send: Send}} props
 */
function List({state, send}) {
  /**
   * @param {HTMLInputElement} input
   */
  function setFocus(input) {
    input.focus()
  }
  /**
   * @param {HTMLLIElement} li
   */
  function animateIn(li) {
    li.classList.add('new-item')
  }
  /**
   * @param {HTMLLIElement} li
   * @param {() => void} done
   */
  function animateOut(li, done) {
    li.classList.add('remove-item')
    setTimeout(() => {
      done()
    }, 1000)
  }
  return html`
    <div class='container'>
      <p>
        <input autofocus onupdate=${setFocus} value=${state.inputValue} type='text' oninput=${e => send(UpdateInputValue, e.target.value)} />
        <button onclick=${() => send(AddItem)} class='add-item'>Add</button>
      </p>
      <ul class='list'>
        ${state.items.map(fruit => html`
          <li
            key=${fruit.key}
            onmount=${animateIn}
            onunmount=${animateOut}>
            <span>${fruit.value}</span>
            <button class='delete-item' onclick=${() => send(DeleteItem, fruit.key)}>X</button>
          </li>`)
    }
      </ul>
    </div>
  `
}

/**
 * State for program.
 * @type {State}
 */
const state = {
  newKey: 104,
  inputValue: '',
  items: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

/**
 * Define actions for program update method.
 * @param {State} state
 * @param {Message} msg
 * @param {Send} send
 */
function actions(state, msg, send) {
  /** @type {State} */
  const prevState = clone(state)
  return Msg.match(msg, {
    // Update value as user types.
    UpdateInputValue: value => {
      prevState.inputValue = value
      return prevState
    },
    // Add new item to list:
    AddItem: () => {
      if (prevState.inputValue) {
        prevState.items.push({
          key: prevState.newKey++,
          value: prevState.inputValue
        })
        prevState.inputValue = ''
      } else {
        alert('Please provide a value before submitting.')
      }
      return prevState
    },
    // Delete item based on its key:
    DeleteItem: key => {
      prevState.items = prevState.items.filter(fruit => fruit.key != key)
      return prevState
    }
  })
}

/**
 * @param {Send} send
 */
function handleEnterKey(send) {
  document.addEventListener('keypress', e => {
    // Handle Enter key press:
    if (e.keyCode === 13) {
      send(AddItem())
    }
  })
}

/**
 * Define runtime program
 * @type {Program}
 */
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(html`<${List} ...${{state, send}} />`, '.container')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  /**
   * @param {Send} send
   */
  subscriptions(send) {
    return handleEnterKey(send)
  }
}

// Run program:
run(program)

///////////////////////////////
// Define types for above code:
///////////////////////////////
/**
 * @typedef {VNode[]} Children
 */
/**
 * @typedef {string | number | Function} Type
 * @typedef {number | string | null} Key
 * @typedef {Object} VNode
 * @prop {Type} [type]
 * @prop {Props} [props]
 * @prop {Children} [children]
 * @prop {Element} [node]
 * @prop {Key} [key]
 * @prop {number} [flag]
 */
/**
* @typedef {Object<string, any>} Message
* @prop {string} type
* @prop {any} [data]
* @typedef {(msg?: Message | Function, data?: any) => Message} Send
* @typedef {() => State} GetState
*/
/**
 * @typedef {Object} Item
 * @prop {number} key
 * @prop {string} value
 */
/**
 * @typedef {Object} State Simple or complex types for application state.
 * @prop {number} newKey
 * @prop {string} inputValue
 * @prop {Item[]} items
 */
/**
 * @typedef {State | void} InitResult Return result of program init method.
 */
/**
 * @typedef {Object<string, any>} Program A program to run.
 * @prop {() => InitResult} init Method to set up initial state.
 * @prop {(state: State, send?: Send) => void} view Method to present the current application state.
 * @prop {(state: State, msg?: Message, send?: Send) => any} update Method to capture messages sent from view or subscriptions. According to the message, an action will transform application state and pass it the the program view method.
 * @prop {(send: Send) => void} [subscriptions] Method to run effects when the program starts. These run independently from the rest of the program.
 * @prop {(getState: () => State, send: Send) => void} [subs] Shortcut for subscriptions.
 * @prop {(state: State) => void} [done] Method to do clean up when shutting down a program.
 * @prop {Send} [send] A static send function for dispatching message to a program. Used with routers and in composition.
 */
/**
 * Actions to match with tagged union.
 * @typedef {Object} ActionMethods
 * @prop {(value: string) => State} UpdateInputValue
 * @prop {() => State} AddItem
 * @prop {(key: number) => State} DeleteItem
 */
/**
 * Tagged union of messages.
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, object: ActionMethods) => State} match
 * @prop {(value: string) => Message} UpdateInputValue
 * @prop {() => Message} AddItem
 * @prop {(key: number) => Message} DeleteItem
 */
