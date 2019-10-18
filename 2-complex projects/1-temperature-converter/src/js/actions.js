import { tryToConvert, toCelsius, toFahrenheit} from './utils'

export function actions(prevState, msg) {
  let temperature = prevState.temperature
  switch (msg.type) {
    case 'f':
      temperature = msg.data.target.value
      const celsius = tryToConvert(temperature, toCelsius) || temperature
      prevState.celsius = celsius
      prevState.fahrenheit = temperature
      return prevState
    case 'c':
      temperature = msg.data.target.value
      const fahrenheit = tryToConvert(temperature, toFahrenheit) || temperature
      prevState.fahrenheit = fahrenheit
      prevState.celsius = temperature
      return prevState
  }
}
