const baseUrl = 'short.ly/'
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

function recurse(letters, words, end, depth, prefix = '') {
  depth--
  for (let i = 0; i < end; i++) {
    const word = prefix + letters[i]
    words.push(word)
    if (depth) recurse(letters, words, end, depth, word)
  }
}
function generate_strings(letters, max_word_length) {
  const words = []
  recurse(letters, words, letters.length, max_word_length)
  return words
}

const allStrings = generate_strings(letters, 4)
const longMapper = new Map([])
const shortMapper = new Map([])

function urlShortener(longURL) {
  if (longMapper.has(longURL)) {
    return longMapper.get(longURL)
  }
  const shortUrl = baseUrl + allStrings.pop()
  longMapper.set(longURL, shortUrl)
  shortMapper.set(shortUrl, longURL)

  return shortUrl
}

function urlRedirector(shortURL) {
  return shortMapper.get(shortURL)
}

describe('Shorten', () => {
  [
    'random string'
  ].forEach(url => {
    it('should shorten', () => {
      const actual = urlShortener(url)
      expect(url).toEqual(urlRedirector(actual))
    })
  })
})
