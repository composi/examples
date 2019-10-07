// @ts-nocheck
import { h } from '@composi/core'
import { memoizedCalc } from '../effects/memoized-calc'
import { interpolateWarm } from 'd3'

// Function component to create tree segments.
export const Pythagoras = ({
  w,
  x,
  y,
  heightFactor,
  lean,
  left,
  right,
  lvl,
  maxlvl
}) => {
  if (lvl >= maxlvl || w < 1) {
    return null
  }

  const { nextRight, nextLeft, A, B } = memoizedCalc({
    w: w,
    heightFactor: heightFactor,
    lean: lean
  })

  let rotate = ""

  if (left) {
    rotate = `rotate(${-A} 0 ${w})`
  } else if (right) {
    rotate = `rotate(${B} ${w} ${w})`
  }

  return (
    <g ns="svg" transform={`translate(${x} ${y}) ${rotate}`}>
      <rect
        width={w}
        height={w}
        x={0}
        y={0}
        style={{
          fill: interpolateWarm(lvl / maxlvl)
        }}
      />

      <Pythagoras
        w={nextLeft}
        x={0}
        y={-nextLeft}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        left
      />

      <Pythagoras
        w={nextRight}
        x={w - nextRight}
        y={-nextRight}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        right
      />
    </g>
  )
}
