import { alphabetized } from './alphabetized'

describe('Alphabetized', () => {
  it('should return empty', () => {
    expect(alphabetized('')).toEqual('')
  })

  it('should sort single word', () => {
    expect(alphabetized('dcba')).toEqual('abcd')
  })

  it('should sort multiple words', () => {
    expect(alphabetized('bc da')).toEqual('abcd')
  })

  it('should handle simple capital letter word', () => {
    expect(alphabetized('babB')).toEqual('abbB')
  })

  it('should handle single word with capital letter', () => {
    expect(alphabetized('BbaAdD')).toEqual('aABbdD')
  })

  it('should handle multiple words with capitals', () => {
    expect(alphabetized('bB Aa dD Cc')).toEqual('AabBCcdD')
  })

  it('should handle non letters', () => {
    expect(alphabetized(' ,.!@#b$%a')).toEqual('ab')
  })
})