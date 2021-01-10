function race(v1, v2, g) {
  if (v1 >= v2) {
    return null
  }
  let diff = g / (v2 - v1)
  const n = new Date(0,0)
  n.setSeconds(+diff * 60 * 60)
  return n.toTimeString().slice(0, 8).split(':').map(str => Math.floor(str))
}
fdescribe('race', () => {
  it('basic test', () => {
    expect(race(720, 850, 70)).toEqual([0, 32, 18])
  })
})
