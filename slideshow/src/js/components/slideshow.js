import { h, render } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
  
// const pics = []
// for (let i = 17; i !=0; i--) {
//   pics.push(`/pics/IMG_${i}.jpg`)
// }

function Slide({img, idx, count}) {
  return (
    <div  class={`slide ${count == idx + 1 ? 'active' : ''}`} style={{backgroundImage: `url(${img})`}}></div>
  )
}

// Function to create state for program:
function setupPics() {
  const pics = []
  for (let i = 17; i != 0; i--) {
    pics.push(`/dist/images/pics/IMG_${i}.jpg`)
  }
  return pics
}

function SlideShow({state}) {
  return (
    <main>
      <header>
        <nav>
          <h1>Slideshow with @composi/core</h1>
        </nav>
      </header>
      <section>
        <div class='slide-show'>
          {
            state.pics.map((img, idx) => <Slide {...{ count: state.count, idx, img }} />)
          }
        </div>
      </section>
    </main>
  )
}

// Define subscription to run during program startup:
function startShow() {
  let count = 1
  setInterval(() => {
    count += 1
    if (count > 17) count = 1
    program.send({type: 'update-slide', data: count})
  }, 5000)
}


// Define program:
export const program = {
  init() {
    const state = {
      count: 1,
      pics: setupPics()
    }
    return [state, startShow]
  },
  view(state, send) {
    return render(<SlideShow {...{state}}/>, document.body)
  },
  update(msg, state) {
    const prevState = mergeObjects(state)
    if (msg.type === 'update-slide') {
      prevState.count = msg.data
    }
    return [prevState]
  }
}


/*
export class SlideShow extends Component {
  constructor(props) {
    super(props)
    this.container = 'section'
    this.state = {
      count: 1,
      pics: pics
    }
  }
  render(state) {
    // console.log(state.pics)
    return (
      <div class='slide-show'>
        {
          state.pics.map((img, idx) => <Slide {...{count: this.state.count, idx, img}} />)
        }
      </div>
    )
  }
  tick() {
    let count = parseInt(this.state.count)
    count += 1
    if (count > 17) count = 1
    this.setState({count})
  }
  componentDidMount() {
    setInterval(() => {
      this.tick()
    }, 5000)
  }
}
*/
