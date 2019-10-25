import { h, render } from '@composi/core';
import MovieList from './movieList';

/**
 * @typedef {import('../../types').State} State
 * @typedef {import('../../types').Send} Send
 */
/**
 * @param {{state: State, send: Send}} props
 */
export function Movies({ state, send }) {
  return (
    <div class="container-fluid" style={{ marginLeft: '-15px' }}>
      <div class="d-flex flex-row">
        <div class="col-sm-12">
          <MovieList movies={state} />
        </div>
      </div>
    </div>
  )
}
