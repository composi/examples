import { h, render, run } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'

// Use for printing out which scale is being used:
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

// Convert between Celsius and Fahrenheit:
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// Determine if the boiling point was reached:
function BoilingVerdict({celsius}) {
  if (celsius >= 100) {
    return <p class='boiling'>The water would boil!</p>;
  }
  return <p>The water would not boil.</p>;
}

// Component for temperature control, either Celsius or Fahrenheit:
const TemperatureInput = (props) => {
  const {send, scale, temperature} = props
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
      <input oninput={e => send({type:scale, data: e, id: scale})} value={temperature} type='number' />
    </fieldset>
  )
}

// Initial state for program:
const state = {
  celsius: 0, 
  fahrenheit: 32 
}

// Component to render:
function Converter({state, send}) {
  return (
    <div class='converter'>
      <TemperatureInput {...{send, temperature: state.celsius, scale: 'c'}}/>
      <TemperatureInput {...{ send, temperature: state.fahrenheit, scale: 'f'}} />
      <BoilingVerdict celsius={state.celsius} />
    </div>
  )
}

// Convert Fahrenheit to Celsius:
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// Convert Celsius to Fahrenheit:
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// Define program:
export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<Converter {...{state, send}}/>, 'section')
  },
  update(state, msg) {
    // Clone state:
    let prevState = mergeObjects(state)
    let temperature
    switch(msg.type) {
      case 'f':
        temperature = msg.data.target.value
        if (temperature) {
          const celsius = tryConvert(temperature, toCelsius) || temperature
          prevState.celsius = celsius
          prevState.fahrenheit = temperature
        }
        return [prevState]
      case 'c':
        temperature = msg.data.target.value
        if (temperature) {
          const fahrenheit = tryConvert(temperature, toFahrenheit) || temperature
          prevState.fahrenheit = fahrenheit
          prevState.celsius = temperature
        }
        return[prevState]
    }
  }
}
