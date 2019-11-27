import {clone} from '@composi/clone'

/**
 * @param {import('../../types').State} state
 * @param {import('../../types').Message} msg
 * @param {import('../../types').Send} send
 */
export function actions(state, msg, send) {
  /** @type {import('../../types').State} */
  const prevState = clone(state)

  return match(msg, {

    ActiveComponent: activeComponent => setActiveComponent(activeComponent, prevState, send),

    AddHero: () => addHero(prevState, send),

    ChangeHeroName: name => changeHeroName(name, prevState),

    DeleteHero: id => deleteHero(id, prevState, send),

    NewHero: name => newHero(name, prevState),

    ResetName: () => resetName(prevState),

    ResetSearchResults: () => resetSearchResults(prevState),

    SaveLocally: data => saveLocally(data, prevState),

    SaveName: () => saveName(prevState, send),

    Search: value => search(value, prevState),

    ShowDetail: id => showDetail(id, prevState, send),

    UseFetchedHeroes: data => useFetchedHeroes(data, send)
  })
}
