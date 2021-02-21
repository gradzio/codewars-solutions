const processRange = (num, scope, subRange) => {
  const range = []
  const rest = Math.floor(num % scope / (scope / 10))
  const otherRest = Math.floor(num % (scope / 2) / (scope / 10))
  switch (rest) {
  case 4:
    range.push(subRange[0] + subRange[1])
    break
  case 9:
    range.push(subRange[0] + subRange[2])
    break
  default:
    if (rest >= 5 && rest < 9) {
      range.push(subRange[1])
    }
    range.push(subRange[0].repeat(otherRest))
  }

  return range
}

const romanRanges = Array.from(new Array(2020).keys()).reduce((vals, i) => {
  const num = i+1
  const range = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
  let romanValues = []

  romanValues.push(range[6].repeat(Math.floor(num / 1000)))

  // 100-999
  romanValues = [...romanValues, ...processRange(num, 1000, [range[4], range[5], range[6]])]
  // 10-99
  romanValues = [...romanValues, ...processRange(num, 100, [range[2], range[3], range[4]])]
  // 0-9
  romanValues = [...romanValues, ...processRange(num, 10, [range[0], range[1], range[2]])]

  vals.romanNums[num] = romanValues.join('')
  vals.normalNums[romanValues.join('')] = num
  return vals
}, {
  romanNums: {},
  normalNums: {}
})

const RomanNumerals = {
  toRoman(i) {
    return romanRanges.romanNums[i]
  },
  fromRoman(romanNumber) {
    return romanRanges.normalNums[romanNumber]
  }
}

describe('RomanNumerals', () => {
  [
    { from: 1, to: 'I' },
    { from: 3, to: 'III' },
    { from: 4, to: 'IV' },
    { from: 5, to: 'V' },
    { from: 8, to: 'VIII' },
    { from: 9, to: 'IX' },
    { from: 13, to: 'XIII' },
    { from: 14, to: 'XIV' },
    { from: 19, to: 'XIX' },
    { from: 30, to: 'XXX' },
    { from: 40, to: 'XL' },
    { from: 50, to: 'L' },
    { from: 62, to: 'LXII' },
    { from: 69, to: 'LXIX'},
    { from: 90, to: 'XC' },
    { from: 91, to: 'XCI' },
    { from: 99, to: 'XCIX' },
    { from: 100, to: 'C'},
    { from: 200, to: 'CC'},
    { from: 201, to: 'CCI'},
    { from: 220, to: 'CCXX'},
    { from: 400, to: 'CD'},
    { from: 500, to: 'D'},
    { from: 669, to: 'DCLXIX'},
    { from: 900, to: 'CM'},
    { from: 1000, to: 'M'},
    { from: 1669, to: 'MDCLXIX'},
    { from: 2000, to: 'MM'},
    { from: 2007, to: 'MMVII'},
    { from: 2020, to: 'MMXX'}
  ].forEach(({from, to}) => {
    it('should convert to roman', () => {
      expect(RomanNumerals.toRoman(from)).toEqual(to)
    })
  })
})
