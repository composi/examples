import {clone} from '@composi/clone'
import { Msg } from '../messages'
import { useFetchedHeroes } from './use-fetched-heroes'
import { setActiveComponent } from './active-component'
import { showDetail } from './show-details'
import { deleteHero } from './delete-hero'
import { changeHeroName } from './change-hero-name'
import { resetName } from './reset-name'
import { saveName } from './save-name'
import { newHero } from './new-hero'
import { addHero } from './add-hero'
import { saveLocally } from './save-locally'
import { search} from './search'
import { resetSearchResults } from './reset-search-results'

/**
 * @param {import('../../types').State} state
 * @param {import('../../types').Message} msg
 * @param {import('../../types').Send} send
 */
export function actions(state, msg, send) {
  /** @type {import('../../types').State} */
  const prevState = clone(state)

  return Msg.match(msg, {

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
