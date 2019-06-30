export const alphabetized = (s) => {
  const letters = s.match(new RegExp(/[a-zA-Z]/, 'g'), '');
  if (letters === null) {
    return '';
  }
  return letters.sort((a, b) => {
    if (a.toUpperCase() === b.toUpperCase()) {
      return s.indexOf(a) < s.indexOf(b) ? -1 : 1;
    }
    return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
  }).join('');
}