export const nextSmaller = (n) => {
  const digits = String(n).split('')
  if (digits.length < 2) {
    return -1
  }
 
  for (let i = digits.length - 1; i >= 1; i--) {
    if (digits[i] < digits[i-1]) {
      const right = digits.slice(i)
      const biggestOnTheRight = right
        .filter(element => element < digits[i-1])
        .sort()
        .pop()

      if (biggestOnTheRight === '0' && i === 1) {
        return -1
      }

      right.splice(right.indexOf(biggestOnTheRight), 1)
      return parseInt(
        digits.slice(0, i-1).concat(
          [biggestOnTheRight],
          right.concat([digits[i-1]]).sort().reverse()
        ).join('')
      )
    }
  }

  return -1
}