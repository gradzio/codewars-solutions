const mostThreeWords = (text) => {
  const words = text.toLowerCase().match(/[a-z]+?['a-z]*/g)
  if (!words) {
    return []
  }
  const counterSorted = Object.entries(
    words.reduce((counter, word) => {
      counter[word] = (counter[word] || 0) + 1
      return counter
    }, {})).sort(([,a],[,b]) => b-a)
  const result = []

  if (counterSorted.length > 0) {
    result[0] = counterSorted[0][0]
  }

  if (counterSorted.length > 1) {
    result[1] = counterSorted[1][0]
  }

  if (counterSorted.length > 2) {
    result[2] = counterSorted[2][0]
  }

  return result
}

fdescribe('MostThreeWords', () => {
  [{
    text: 'a a a  b  c c  d d d d  e e e e e',
    expected: ['e','d','a']
  }, {
    text: 'e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e',
    expected: ['e','ddd','aa']
  }, {
    text: "  //wont won't won't ",
    expected: ["won't", "wont"]
  }, {
    text: '  , e   .. ',
    expected: ['e']
  }, {
    text: ' ...  ',
    expected: []
  }, {
    text: " ' ",
    expected: []
  }].forEach(({text, expected}) => {
    it('should work', () => {
      expect(mostThreeWords(text)).toEqual(expected)
    })
  })
})
