import {tryToConvert, toCelsius, toFahrenheit} from './utils'

/**
 * @param {import('./types').State} state
 * @param {import('./types').Message} msg
 * @param {import('./types').Send} send
 */
export function actions(state, msg, send) {
  let temperature = state.temperature
  switch (msg.type) {
    case 'f':
      temperature = msg.data.target.value
      const celsius = tryToConvert(temperature, toCelsius) || temperature
      state.celsius = celsius
      state.fahrenheit = temperature
      return state
    case 'c':
      temperature = msg.data.target.value
      const fahrenheit = tryToConvert(temperature, toFahrenheit) || temperature
      state.fahrenheit = fahrenheit
      state.celsius = temperature
      return state
  }
}
