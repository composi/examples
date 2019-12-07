import {match} from '../messages'
import {useFetchedHeroes} from './use-fetched-heroes'
import {setActiveComponent} from './active-component'
import {showDetail} from './show-details'
import {deleteHero} from './delete-hero'
import {changeHeroName} from './change-hero-name'
import {resetName} from './reset-name'
import {saveName} from './save-name'
import {newHero} from './new-hero'
import {addHero} from './add-hero'
import {saveLocally} from './save-locally'
import {search} from './search'
import {resetSearchResults} from './reset-search-results'

/**
 * @param {import('../../types').State} state
 * @param {import('../../types').Message} msg
 * @param {import('../../types').Send} send
 */
export const actions = (state, msg, send) => match(msg, {

  ActiveComponent: activeComponent => setActiveComponent(activeComponent, state, send),

  AddHero: () => addHero(state, send),

  ChangeHeroName: name => changeHeroName(name, state),

  DeleteHero: id => deleteHero(id, state, send),

  NewHero: name => newHero(name, state),

  ResetName: () => resetName(state),

  ResetSearchResults: () => resetSearchResults(state),

  SaveLocally: data => saveLocally(data),

  SaveName: () => saveName(state, send),

  Search: value => search(value, state),

  ShowDetail: id => showDetail(id, state, send),

  UseFetchedHeroes: data => useFetchedHeroes(data, send)
})
