export const proofread = (str) => {
  return str
    .replace(new RegExp(/ie/, 'ig'), 'ei')
    .split('. ')
    .map(capitalizeSentence).
    join('. ')
}

const capitalizeSentence = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
}