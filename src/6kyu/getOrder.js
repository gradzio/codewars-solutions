export const getOrders = (input) => {
  const wordMapper = {
    bu: 'Burger',
    fr: 'Fries',
    ch: 'Chicken',
    pi: 'Pizza',
    sa: 'Sandwich',
    on: 'Onionrings',
    mi: 'Milkshake',
    co: 'Coke'
  }

  let i = 0
  const words = {
    bu: [],
    fr: [],
    ch: [],
    pi: [],
    sa: [],
    on: [],
    mi: [],
    co: []
  }
  while(i < input.length - 1) {
    const wordPrefix = input[i] + input[i+1]
    const word = wordMapper[wordPrefix]
    words[wordPrefix].push(word)
    i += word.length
  }

  return Object.keys(words).reduce((prev, curr) => {
    const group = words[curr].length > 0 ? ' ' + words[curr].join(' ') : ''
    return prev + group
  }, '').trim()
}