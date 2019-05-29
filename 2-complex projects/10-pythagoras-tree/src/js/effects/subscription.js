
import { scaleLinear } from 'd3'


// Get initial window dimensions.
// These are used for first render of tree.
const SVG_WIDTH = () => window.innerWidth
const SVG_HEIGHT = () => window.innerHeight

// Effect to track cursor and redraw tree:
export function handleMoueMove(getState, send) {
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

  // When cursor move detected,
  // send a message to the update action.
  const move = ({ heightFactor, lean }) => {
    send({ type: 'update-tree', data: { heightFactor, lean } })
  }

  // Listeners to track cursor and finger movement.
  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('touchmove', onMouseMove)
  document.body.addEventListener('touchcancel', onMouseMove)
}
