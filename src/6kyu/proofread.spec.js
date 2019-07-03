import { proofread } from './proofread'

describe('proofread', () => {
  it('should convert ie to ei', () => {
    [
      { input: 'A thier', expected: 'A their' },
      { input: 'A thIer', expected: 'A their' },
      { input: 'A thiEr', expected: 'A their' },
      { input: 'A thIEr', expected: 'A their' },
      { input: 'A thiEr wIeght', expected: 'A their weight' }
    ].forEach(({ input, expected }) => expect(proofread(input)).toEqual(expected))
  })

  it('should capitalize first word', () => {
    [
      { input: 'aBcD QweRtY.', expected: 'Abcd qwerty.' },
      { input: 'aBcD QweRtY. aBcD QweRtY.', expected: 'Abcd qwerty. Abcd qwerty.' }
    ].forEach(({ input, expected }) => expect(proofread(input)).toEqual(expected))
  })
})
