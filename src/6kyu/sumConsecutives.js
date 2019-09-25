export const sumConsecutives = (s) => {
  return s.reduce((prev, current) => {
    if (current === prev.lastVal) {
      prev.sum[prev.sum.length-1] += current
    } else {
      prev.sum.push(current)
    }
    prev.lastVal = current
    return prev
  }, {lastVal: null, sum: []}).sum
}
