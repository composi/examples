import { h, render, run } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'


const section = document.querySelector('section')

// Function to create random data for images:
function buildData(count = 10) {

  function random(max) {
    return Math.round(Math.random() * 1000) % max;
  }
  function uuid() {
    return Math.floor(Math.random() * 10000000 + Math.random() * 10000)
  }
  const names = [
    'Misty', 'Scrappy', 'Sandy', 'Mr Tabor', 'Ransel', 'Tabby', 'Meow Meow', 'Kit Cat', 'Mouser', 'Hyacinth', 'Sleepy', 'Rowdy', 'Pouncer', 'Petunia', 'Racer', 'Tiger', 'Toby', 'Midnight', 'Princess', 'Shadow', 'Jasper', 'Sneakers', 'Charley', 'Max', 'Rocky', 'CoCo', 'Purrfect', 'Oscar', 'Poof', 'Pepper', 'Archie', 'Mittens', 'Tux', 'Patches', 'Augusta', 'Calico', 'Lucky', 'Garfield', 'Simon', 'Babsy', 'Felix', 'Sassy', 'Silvester', 'Precious', 'Aster', 'Snickers', 'Wiskers', 'Jester', 'Buttler', 'Socks', 'Fluffy', 'Chester', 'Rusty', 'Dusty', 'Felix', 'Catkin', 'Cuddles', 'Buster', 'Boots', 'Flox', 'Magic', 'Willow', 'Butters', 'Juniper', 'Lacy', 'Higgins', 'Cosmo', 'Dexter', 'Cuddles', 'Bobtail', 'Gypsy', 'Fuzzy', 'Dufus', 'Buster', 'Leela', 'Manx', 'Jax', 'Grumpy', 'Ferris', 'Chance', 'Snoopy', 'Pixie', 'Bushy', 'Penny', 'Snowball', 'Muffin', 'Buffy', 'Hobbit', 'Chase', 'Emmett', 'Ribbon', 'Scamper', 'Wiggles', 'Flash', 'Doby', 'Posey', 'Merlin', 'Sparky', 'Lucy', 'Sleepy', 'Wally', 'Furball', 'Marmalade', 'Bert', 'Piper', 'Pookie', 'Puff', 'Cyrus', 'Hyde'
  ]
  const adjectives = [
    'Big', 'Small', 'Tiny', 'Cute', 'Skinny', 'Fat', 'Chubby', 'Scrawny', 'Scrappy', 'Mangy', 'Quiet', 'Angry', 'Excited', 'Jumpy', 'Peaceful', 'Anxious', 'Annoyed', 'Sleepy', 'Tired', 'Hungry', 'Worried', 'Young', 'Old', 'Sick', 'Clean', 'Dirty', 'Shabby', 'Dusty', 'Smelly', 'Dingy', 'Matted', 'Anxious', 'Calm', 'Scared', 'Frightened', 'Brave', 'Courageous', 'Timid', 'Lonely', 'Snugly', 'Aloof', 'Concerned', 'Smart'
  ]
  const colors = [
    'white', 'black', 'spotted', 'tabby', 'brown', 'striped', 'beige', 'gray', 'calico', 'tan', 'orange', 'yellow', 'tawny', 'gold', 'bronze', 'reddish', 'copper', 'silver', 'platinum', 'rusty', 'crimson', 'amber', 'goldenrod', 'apricot', 'brass', 'brandy', 'buff', 'sienna', 'sandy', 'coffee', 'chocolate', 'taupe', 'chestnut', 'hickory', 'marigold', 'moss', 'mustard', 'ochre', 'peach', 'pumpkin', 'rum', 'russet', 'tangerine', 'sunset'
  ]
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: uuid(),
      name: `${names[random(names.length)]}`,
      description: `${adjectives[random(adjectives.length)]} ${colors[random(colors.length)]} cat.`,
      url: `https://loremflickr.com/320/240/cat?lock=${uuid()}`
    })
  }
  return data
}

// Placeholders for popup.
let popup = undefined
let popupImage = undefined

// Define list component for images:
function List({state, send}) {
  return (
    <div id="app">
      <ul class='list'>
        {
          state.map(cat => (
            <li key={cat.id}>
              <h2>{cat.name}</h2>
              <div onclick={() => send({type:'show-image', data:cat.url})}
                class="image-container" style={{ backgroundImage: `url(${cat.url})` }} />
              <div class="description">{cat.description}</div>
            </li>
          ))
        }
      </ul>
      <p class="add-more">
        <button onclick={() => send({type:'add-10-more'})}>Show 10 More</button>
      </p>
    </div>
  )
}


// Create initial state for program:
const state = buildData(10)

// Define effect to run when program starts:
function createPopup() {
  function Mask() {
    return (
      <div id="mask" onclick={() => program.send({ type: 'close-popup' })}>
        <div id="popup-image"></div>
      </div>
    )
  }
  render(<Mask />, 'body')
  popup = document.querySelector('#mask')
  popupImage = document.querySelector('#popup-image')
}

// Actions for program update:
function actions(prevState, msg) {
  switch (msg.type) {
    // Add 10 more images:
    case 'add-10-more':
      const data = buildData(10)
      const newState = prevState.concat(data)
      return [newState]
    // Show chosen image in popup:
    case 'show-image':
      popup.style.display = 'flex'
      popupImage.style.backgroundImage = `url(${msg.data})`
      setTimeout(() => {
        popup.classList.add('opened')
        popupImage.classList.add('opened')
      }, 200)
      return [prevState]
    // Close the popup
    case 'close-popup':
      popup && popup.classList.remove('opened')
      popupImage.classList.remove('opened')
      setTimeout(() => {
        popup.style.display = 'none';
      }, 500)
      return [prevState]
  }
}

const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<List {...{state, send}} />, section)
  },
  update(state, msg) {
    // Clone state:
    let prevState = mergeObjects(state)
    return actions(prevState, msg)
  },
  subscriptions() {
    return createPopup
  }
}

run(program)
