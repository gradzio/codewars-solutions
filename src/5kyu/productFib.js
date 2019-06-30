
export const productFib = (prod) => {
  if (prod === 0) {
    return [0, 1, true]
  }
  const fib = [0, 1]

  while (fib[fib.length-2] * fib[fib.length-1] <= prod) {
    if (fib[fib.length-1] * fib[fib.length-2] === prod) {
      return [fib[fib.length-2], fib[fib.length-1], true]
    }
    fib.push(fib[fib.length-1] + fib[fib.length-2])
  }
  
  return [fib[fib.length-2], fib[fib.length-1], false]
}