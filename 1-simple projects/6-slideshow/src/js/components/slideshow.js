import { h, render } from '@composi/core'
import { clone } from '@composi/merge-objects'

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
  }, 2000)
}


// Define program:
export const program = {
  init() {
    const state = {
      count: 1,
      pics: setupPics()
    }
    return [state]
  },
  view(state, send) {
    return render(<SlideShow {...{state}}/>, document.body)
  },
  update(state, msg) {
    const prevState = clone(state)
    if (msg.type === 'update-slide') {
      prevState.count = msg.data
    }
    return [prevState]
  },
  subscriptions() {
    return startShow
  }
}
