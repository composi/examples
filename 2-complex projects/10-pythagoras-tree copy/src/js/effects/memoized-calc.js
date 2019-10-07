
Math.deg = radians => radians * (180 / Math.PI)

// Memoize values to avoid unnecessary calculations.
export const memoizedCalc = (function () {
  const memo = {}

  const key = ({ w, heightFactor, lean }) => [w, heightFactor, lean].join("-")

  return args => {
    const memoKey = key(args)

    if (memo[memoKey]) {
      return memo[memoKey]
    } else {
      const { w, heightFactor, lean } = args

      const trigH = heightFactor * w

      const result = {
        nextRight: Math.sqrt(trigH ** 2 + (w * (0.5 + lean)) ** 2),
        nextLeft: Math.sqrt(trigH ** 2 + (w * (0.5 - lean)) ** 2),
        A: Math.deg(Math.atan(trigH / ((0.5 - lean) * w))),
        B: Math.deg(Math.atan(trigH / ((0.5 + lean) * w)))
      }

      memo[memoKey] = result
      return result
    }
  }
})()
