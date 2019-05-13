// Function to create random data for images:
export function buildData(count = 10) {

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
