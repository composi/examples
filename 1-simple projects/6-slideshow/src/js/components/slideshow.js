import { h } from '@composi/core'

/**
 * @typedef {import('../types').State} State
 */

/**
 * Define subscription to run during program startup.
 * @param {{img: string, idx: number, count: number}} props
 */
function Slide({img, idx, count}) {
  return (
    <div  class={`slide ${count == idx + 1 ? 'active' : ''}`} style={{backgroundImage: `url(${img})`}}></div>
  )
}

/**
 * @param {{state: State}} props
 */
export function SlideShow({state}) {
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
function startShow(state, send) {
  let count = 1
  setInterval(() => {
    count += 1
    if (count > 17) count = 1
    send({type: 'update-slide', data: count})
  }, 2000)
}
