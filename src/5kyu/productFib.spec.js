import { productFib } from './productFib'

describe('productFib', () => {
  it('should handle 0', () => {
    expect(productFib(0)).toEqual([0, 1, true])
  })
 
  it('should handle lowest fib', () => {
    expect(productFib(1)).toEqual([1, 1, true])
  })

  it('should find low fib', () => {
    expect(productFib(6)).toEqual([2, 3, true])
  })

  it('should not find low fib', () => {
    expect(productFib(7)).toEqual([3, 5, false])
  })

  it('should process sample data', () => {
    [
      { prod: 4895, expected: [55, 89, true] },
      { prod: 5895, expected: [89, 144, false] },
      { prod: 74049690, expected: [6765, 10946, true] },
      { prod: 84049690, expected: [10946, 17711, false] },
      { prod: 193864606, expected: [10946, 17711, true] },
      { prod: 193864606, expected: [10946, 17711, true] },
      { prod: 193864606, expected: [10946, 17711, true] }
    ].forEach(({prod, expected}) => expect(productFib(prod)).toEqual(expected))
  })
})