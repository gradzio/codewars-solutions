import { partsSums } from './partsSums'

describe('partsSums', () => {
  it('should handle empty list', () => {
    expect(partsSums([])).toEqual([0])
  })

  it('should handle single item list', () => {
    expect(partsSums([1])).toEqual([1, 0])
  })

  it('should handle double item list', () => {
    expect(partsSums([1, 2])).toEqual([3, 2, 0])
  })

  it('should handle multiple items list', () => {
    expect(partsSums([1, 2, 3, 4, 5, 6])).toEqual([21, 20, 18, 15, 11, 6, 0])
  })
})