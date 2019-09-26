import { hasEulerianTrail } from './hasEulerianTrail'

describe('Acceptance', () => {
  it('should process', () => {
    const testData = [
      {
        input: {
          'A': ['B','C','D'],
          'B': ['A'],
          'C': ['A','D'],
          'D': ['A','C']
        },
        expected: true
      },
      {
        input: {
          'A' : ['C','D'],
          'B' : ['E'],
          'C' : ['A','D'],
          'D' : ['A','C'],
          'E' : ['B']
        },
        expected: false
      }
    ]

    testData.forEach(({input, expected}) => expect(hasEulerianTrail(input)).toEqual(expected))
  })
})
