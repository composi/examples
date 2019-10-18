

export function actions(prevState, msg, send) {
  switch (msg.type) {
    case 'use-fetched-heroes':
      prevState.heroes = msg.data
      return prevState
    case 'active-component':
      prevState.activeComponent = msg.data
      return prevState
    case 'show-detail':
      const position = prevState.heroes.findIndex(person => person.id == msg.data)
      const hero = prevState.heroes[position]
      try {
        hero.originalName = hero.name
        prevState.activeComponent = 'detail'
        prevState.selectedHero = hero
      } catch (err) { }
      return prevState
    case 'delete-item':
      prevState.heroes = prevState.heroes.filter(hero => hero.id != msg.data)
      return prevState
    case 'change-hero-name':
      prevState.selectedHero.name = msg.data
      return prevState
    case 'reset-name':
      prevState.selectedHero.name = prevState.selectedHero.originalName
      return prevState
    case 'save-name':
      window.location.hash = '#/heroes'
      return prevState
    case 'new-hero':
      prevState.newHero = msg.data
      return prevState
    case 'add-hero':
      if (prevState.newHero)
        prevState.heroes.push({
          id: prevState.newId++,
          name: prevState.newHero
        })
      prevState.newHero = ''
      return prevState
  }
}
