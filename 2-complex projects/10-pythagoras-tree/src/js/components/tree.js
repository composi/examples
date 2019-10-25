// @ts-nocheck
import { h } from '@composi/core'
import { Pythagoras } from './pythagoras'


// These are used for first render of tree.
const SVG_WIDTH = () => window.innerWidth
const SVG_HEIGHT = () => window.innerHeight

// View for tree component
/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('@composi/core').VNode} VNode
 * @param {{state: State, send: Send}} props
 * @returns {VNode} VNode
 */
export function Tree({ state, send }) {
  return (
    <svg
      id='svg-base'
      width={SVG_WIDTH()}
      height={SVG_HEIGHT()}
    >
      <Pythagoras
        w={state.baseW}
        h={state.baseW}
        heightFactor={state.heightFactor}
        lean={state.lean}
        x={SVG_WIDTH() / 2 - 40}
        y={SVG_HEIGHT() - state.baseW}
        lvl={0}
        maxlvl={state.currentMax}
      />
    </svg>
  )
}
