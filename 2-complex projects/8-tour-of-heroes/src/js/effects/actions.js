
/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  switch (msg.type) {
    case 'active-component':
      state.activeComponent = msg.data
      return state
    case 'add-hero':
      if (state.newHero)
        state.heroes.push({
          id: state.newId++,
          name: state.newHero
        })
      state.newHero = ''
      return state
    case 'change-hero-name':
      state.selectedHero.name = msg.data
      return state
    case 'delete-item':
      state.heroes = state.heroes.filter(hero => hero.id != msg.data)
      return state
    case 'new-hero':
      state.newHero = msg.data
      return state
    case 'reset-name':
      state.selectedHero.name = state.selectedHero.originalName
      return state
    case 'save-name':
      window.location.hash = '#/heroes'
      return state
    case 'show-detail':
      const position = state.heroes.findIndex(person => person.id == msg.data)
      const hero = state.heroes[position]
      try {
        hero.originalName = hero.name
        state.activeComponent = 'detail'
        state.selectedHero = hero
      } catch (err) {}
      return state
    case 'use-fetched-heroes':
      state.heroes = msg.data
      return state
  }
}
