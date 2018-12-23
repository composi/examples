import { h, render, run, union } from '@composi/core'
import { interpolateWarm, scaleLinear } from 'd3'




Math.deg = radians => radians * (180 / Math.PI)

const memoizedCalc = (function() {
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


const Pythagoras = ({
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

const SVG_WIDTH = () => window.innerWidth
const SVG_HEIGHT = () => window.innerHeight

function effect() {
  const onMouseMove = e => {
    e.preventDefault()
    let x = e.clientX
    let y = e.clientY
    if (e.touches) {
      x = e.pageX
      y = e.pageY
    }
    let scaleFactor = scaleLinear().domain([SVG_HEIGHT(), 0]).range([0, 0.8]);
    let scaleLean = scaleLinear().domain([0, SVG_WIDTH() / 2, SVG_WIDTH()]).range([0.5, 0, -0.5]);
    move({
      heightFactor: scaleFactor(y),
      lean: scaleLean(x)
    })
  }
  const move = ({ heightFactor, lean }) => {
    program.send({ type: 'update-tree', data: { heightFactor, lean } })
  }
  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('touchmove', onMouseMove)
  document.body.addEventListener('touchcancel', onMouseMove)
}

function Tree({ state, send }) {
  return (
    <svg
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

// Set up initial state for program.
const state = {
  currentMax: 10,
  baseW: 80,
  heightFactor: 0,
  lean: 0,
  firstRender: false
}

// Get reference to component container.
const section = document.querySelector('section')

// Define program to run animated fractal.
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    if (state.firstRender === false) {
      state.firstRender = true
      return render(<Tree SVG_HEIGHT={0} {...{state, send}} />, section, 'img')
    } else {
      return render(<Tree SVG_HEIGHT={0} {...{ state, send }} />, section)
    }
  },
  update(state, msg) {
    if (msg.type === 'update-tree') {
      state.heightFactor = msg.data.heightFactor
      state.lean = msg.data.lean
      return [state]
    }
  },
  subscriptions() {
    return effect
  }
}

run(program)

