import { getOrders } from './getOrder'

describe('getOrder', () => {
  it('should detect orders', () => {
    [
      {input: 'burger', expected: 'Burger'},
      {input: 'burgercoke', expected: 'Burger Coke'},
      {input: 'milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza', expected: 'Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke'},
    ].forEach(({input, expected}) => expect(getOrders(input)).toEqual(expected))
  })
})