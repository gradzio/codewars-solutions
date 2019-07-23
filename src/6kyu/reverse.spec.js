import { reverse } from './reverse'

describe('reverse', () => {
  it('should reverse', () => {
    [
      { input: 'test', expected: 'test'},
      { input: 'normal reverse', expected: 'normal esrever' },
      { input: 'Reverse this string, please!', expected: 'Reverse siht string, !esaelp' }
    ].forEach(({ input, expected }) => {
      expect(reverse(input)).toEqual(expected)
    })
  })
})
