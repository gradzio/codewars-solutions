export class Graph {
  constructor(arcs) {
    const { vertices, nodes } = arcs.reduce(({vertices, nodes}, {start, end}) => {
      nodes[start] = true
      nodes[end] = true
      vertices[start] = vertices[start] || []
      vertices[start].push(end)
      return {vertices, nodes}
    }, {vertices: {}, nodes: {}})

    this._vertices = vertices
    this._nodes = Object.keys(nodes)
  }

  get vertices() {
    return this._vertices
  }

  get nodes() {
    return this._nodes
  }
}

export const solveGraph = (start, end, arcs) => {
  const graph = new Graph(arcs)
  if (!graph.nodes.includes(start) || !graph.nodes.includes(end)) {
    return false
  }

  let s = []
  let explored = new Set()
  s.push(start)

  explored.add(start)

  while (s.length) {
    let t = s.pop()

    if (t === end) {
      return true
    }

    (graph.vertices[t] || [])
      .filter(n => !explored.has(n))
      .forEach(n => {
        explored.add(n)
        s.push(n)
      })
  }

  return false
}