export const hasEulerianTrail = (input) => {
  const odd = Object.keys(input).map(city => input[city].length).filter(connections => connections % 2 !== 0 )
  if(odd.length !== 0 && odd.length !== 2) return false
  const firstKey =  Object.keys(input)[0]
  const connected = new Set( [firstKey])
  const queue = [firstKey]
  while (queue.length != 0){
    const city = queue.pop()
    if(!input[city]) return false
    input[city].forEach(c => {
      if(!connected.has(c)){
        queue.push(c)
        connected.add(c)
      }
    })
  }
  return (connected.size === Object.keys(input).length)
}
