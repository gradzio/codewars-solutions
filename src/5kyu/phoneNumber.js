export const phoneNumber = (phoneNumbers) => {
  return phoneNumbers.reduce((graph, phoneNumber) => {
    phoneNumber.split('').reduce((branch, number) => {
      if (!Object.keys(branch).includes(number)) {
        graph.count++
        branch[number] = {}
      }
      return branch[number]
    }, graph.graph)
    return graph
  }, {graph: {}, count: 0}).count
}
