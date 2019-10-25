import { h } from '@composi/core'

/**
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').State} State
 */

// Use for printing out which scale is being used:
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}


/**
 * Determine if the boiling point was reached.
 * @param {{result: number}} props
 */
function BoilingVerdict({ result }) {
  if (result >= 100) {
    return <p class='boiling'>The water would boil!</p>;
  }
  return <p>The water would not boil.</p>;
}

/**
 * Component for temperature control, either Celsius or Fahrenheit.
 * @param {{send: Send, scale: string, temperature: string}} props
 */
const TemperatureInput = (props) => {
  const { send, scale, temperature } = props
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
      <input oninput={e => send({ type: scale, data: e })} value={temperature} type='number' />
    </fieldset>
  )
}


/**
 * Component to render.
 * @param {{state: State, send: Send}} props
 */
export function Converter({ state, send }) {
  const { celsius, fahrenheit } = state
  const result = parseInt(celsius)
  return (
    <div class='converter'>
      <TemperatureInput {...{ send, temperature: celsius, scale: 'c' }} />
      <TemperatureInput {...{ send, temperature: fahrenheit, scale: 'f' }} />
      <BoilingVerdict {...{ result }} />
    </div>
  )
}
