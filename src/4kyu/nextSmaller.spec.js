import { nextSmaller } from './nextSmaller'

describe('nextSmaller', () => {
  it('should return -1 for single digit', () => {
    expect(nextSmaller(1)).toEqual(-1)
  })

  it('should handle double digit', () => {
    [
      { input: 21, expected: 12 },
      { input: 12, expected: -1 },
      { input: 10, expected: -1 },
      { input: 91, expected: 19 }
    ].forEach(({ input, expected }) => expect(nextSmaller(input)).toEqual(expected))
  })

  it('should handle all combinations of tripple digit', () => {
    [
      { input: 321, expected: 312 },
      { input: 312, expected: 231 },
      { input: 231, expected: 213 },
      { input: 213, expected: 132 },
      { input: 132, expected: 123 },
      { input: 414, expected: 144 }
    ].forEach(({ input, expected }) => expect(nextSmaller(input)).toEqual(expected))
  })

  it('should handle zero with tripple digit', () => {
    [
      { input: 320, expected: 302 },
      { input: 302, expected: 230 },
      { input: 230, expected: 203 },
      { input: 203, expected: -1 }
    ].forEach(({ input, expected }) => expect(nextSmaller(input)).toEqual(expected))
  })

  it('should handle quadrupal digit', () => {
    [
      { input: 4210, expected: 4201 },
      { input: 4251, expected: 4215 },
      { input: 4319, expected: 4193 },
      { input: 4312, expected: 4231 }
    ].forEach(({ input, expected }) => expect(nextSmaller(input)).toEqual(expected))
  })

  it('should handle big number', () => {
    [
      {  input: 1234583559, expected: 1234559853 },
      {  input: 1234583569, expected: 1234569853 }
    ].forEach(({ input, expected }) => expect(nextSmaller(input)).toEqual(expected))
  })
})
