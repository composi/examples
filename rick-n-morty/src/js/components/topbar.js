import {h} from '@composi/core'

/**
 * Function to create the top bar for search and showing dashboard.
 * @param {Object<string, any>} object 
 */ 
export function TopBar({ dashboard, send }) {
  if (dashboard) {
    return (
      <header>
        <h1>Rick and Morty Characters</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="28" viewBox="0 0 28 28" width="28">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <input placeholder="Search" onkeydown={e => send({ type: 'find-character', data: e })}></input>
      </header>
    )
  } else {
    return (
      <header>
        <h1>Rick 'n' Morty Characters</h1>
        <button onclick={() => send({ type: 'show-dashboard' })} id="showDashboard">Show Dashboard</button>
      </header>
    )
  }
}