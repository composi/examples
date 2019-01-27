import { h, render, run, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { Title } from './components/title'

render(<Title message='Tab Example' />, 'header')



const state = {
  activeId: "one",
  tabs: [
    {
      id: "one", label: "First Tab", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.'
    },
    {
      id: "two", label: "Second Tab", description: 'Veritatis repellendus corrupti labore quo vero nesciunt sunt modi incidunt!'
    },
    {
      id: "three", label: "Third Tab", description: 'Tempore fuga alias possimus ut, quos autem maiores consectetur debitis.'
    },
    {
      id: "four", label: "Fourth Tab", description: 'Amet inventore iste quasi, dignissimos enim, perferendis tenetur nostrum officiis ipsam neque voluptatem dolorum a adipisci voluptates laborum voluptas dolorem! Rem, in?'
    }
  ]
}

const Tab = (props) => (
  <div class="tab-content">
    <p>You chose tab: <strong>{props.activeId}</strong></p>
    <p>{props.description}</p>
  </div>
)

const TabHeader = ({ state, send }) => {
  return (
    <div class="tab-headers">
      {state.tabs.map(tab => (
        <button class={`tab ${state.activeId == tab.id ? 'selected' : ''}`} onclick={() => send(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

const TabPanel = (props) => (
  <div class="tab-panels">
    <Tab activeId={props.activeId} description={props.description} />
  </div>
)

function TabContainer({ state, send }) {
  const result = state.tabs.find(item => state.activeId == item.id)
  return (
    <div class="tab-list">
      <TabHeader
        {...{ state, send }}
      ></TabHeader>
      <TabPanel activeId={state.activeId} description={result.description} />
    </div>
  )
}

const section = document.querySelector('section')

function action(state, msg) {
  state.activeId = msg
  return [state]
}

const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<TabContainer {...{ state, send }} />, section)
  },
  update(state, msg) {
    return action(state, msg)
  },
  subscriptions(state, send) {

  }
}

run(program)
