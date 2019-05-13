
// Convert Fahrenheit to Celsius:
export function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// Convert Celsius to Fahrenheit:
export function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// Convert between Celsius and Fahrenheit:
export function tryToConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
