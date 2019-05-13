import { h } from '@composi/core'

// Use for printing out which scale is being used:
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}


// Determine if the boiling point was reached:
function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p class='boiling'>The water would boil!</p>;
  }
  return <p>The water would not boil.</p>;
}

// Component for temperature control, either Celsius or Fahrenheit:
const TemperatureInput = (props) => {
  const { send, scale, temperature } = props
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
      <input oninput={e => send({ type: scale, data: e })} value={temperature} type='number' />
    </fieldset>
  )
}


// Component to render:
export function Converter({ state, send }) {
  return (
    <div class='converter'>
      <TemperatureInput {...{ send, temperature: state.celsius, scale: 'c' }} />
      <TemperatureInput {...{ send, temperature: state.fahrenheit, scale: 'f' }} />
      <BoilingVerdict celsius={state.celsius} />
    </div>
  )
}
