export const reverse = (str) => {
  return str
    .trim()
    .split(' ')
    .map((element, index) => index % 2 === 1 ? element.split('').reverse().join('') : element)
    .join(' ')
}
