import { batchEffects } from '@composi/core'

/**
 * @typedef {import('../types').GetState} GetState
 * @typedef {import('../types').Send} Send
 */

/**
 * @param {GetState} getState
 * @param {Send} send
 */
function handleEnterKey(getState, send) {
  document.addEventListener('keypress', e => {
    if (e.keyCode === 13) send({ type: 'find-character'})
  })
}

/**
 * @param {GetState} getState
 * @param {Send} send
 */
function getCharacters(getState, send) {
  (async () => {
    const state = {...getState()}
    let response = await fetch('/src/js/data/characters.json')
    let data = await response.json()
    state.characters = data
    state.character = data[0]
    send({type: 'use-fetched-data', data: state})
  })()
}

export const subs = batchEffects(handleEnterKey, getCharacters)
