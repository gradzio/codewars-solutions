export const partsSums = (ls) => {
  return ls.reverse().reduce((total, amount) => {
    total.push(total[total.length-1] + amount)
    return total
  }, [0]).reverse()
}