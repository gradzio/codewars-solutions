import { phoneNumber } from './phoneNumber'

describe('Acceptance', () => {
  it('should process', () => {
    const tests = [
      {input: ['0', '1'], expected: 2},
      {input: ['01', '02', '03'], expected: 4},
      {input: ['012','0123','01234'], expected: 5},
      {input: ['0123456789','0123987654','0123987456','2365498756','2365498765'], expected: 31}
    ]

    tests.forEach(({input, expected}) => expect(phoneNumber(input)).toEqual(expected))
  })
})
