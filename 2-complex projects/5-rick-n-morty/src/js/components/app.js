import { h } from '@composi/core'
import { InfoBox } from './infobox'
import { DetailBox } from './detailbox'
import { TopBar } from './topbar'

// Main component for app where we assemble the pieces together:
export function App({ state, send }) {
  const dashboard = state.dashboard

  // If no characters yet, return.
  // Characters are fetched from json file.
  if (!state.characters) return
  if (dashboard) {
    return (
      <section>
        <TopBar {...{ dashboard, send }} />
        <div id="infocontainer">
          {
            state.characters.map(char => (
              <InfoBox {...{ send, character: char }} />
            ))}
        </div>
      </section>
    )
  } else {
    return (
      <section>
        <TopBar {...{ dashboard, send }} />
        <div id="infocontainer">
          <DetailBox character={state.character} />
        </div>
      </section>
    )
  }
}
