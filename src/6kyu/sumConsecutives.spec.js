import { sumConsecutives } from './sumConsecutives'

describe('Sum consecutives', () => {
  it('should process', () => {
    [
      {
        input: [1,4,4,4,0,4,3,3,1], expected: [1,12,0,4,6,1]
      },
      {
        input: [1,1,7,7,3], expected: [2,14,3]
      },
      {
        input: [-5,-5,7,7,12,0], expected: [-10,14,12,0]
      },
      {
        input: [3,3,3,3,1], expected: [12, 1]
      }
    ].forEach(({input, expected}) => expect(sumConsecutives(input)).toEqual(expected))
  })
})
