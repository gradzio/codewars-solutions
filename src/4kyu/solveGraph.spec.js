import { Graph, solveGraph } from "./solveGraph";

describe('solveGraph', () => {
  describe('graph', () => {
    it('should create', () => {
      [{
        input: [{ start : 'a', end : 'b' }],
        expected: {vertices: { a: ['b']}, nodes: ['a', 'b']}
      }, {
        input: [{ start : 'a', end : 'b' }, { start : 'a', end : 'c' }],
        expected: {vertices: { a: ['b', 'c']}, nodes: ['a', 'b', 'c']}
      }].forEach(({input, expected}) => {
        const graph = new Graph(input)

        expect(graph.vertices).toEqual(expected.vertices)
        expect(graph.nodes).toEqual(expected.nodes)
      })
    })
  })

  describe('DFS Solver', () => {
    it('should not solve the graph', () => {
      [
        {start: 'a', end: 'b', arcs: []},
        {start: 'a', end: 'c', arcs: [{start: 'a', end: 'b'}]},
        {start: 'c', end: 'b', arcs: [{start: 'a', end: 'b'}]},
        {start: 'e', end: 'b', arcs: [{start: 'a', end: 'b'}, {start: 'a', end: 'e'}]}
      ].forEach(({start, end, arcs}) => expect(solveGraph(start, end, arcs)).toBe(false))
    })

    it('should solve using DFS algo', () => {
      [
        {start: 'a', end: 'b', arcs: [{start: 'a', end: 'b'}]},
        {
          start: 'a',
          end: 'd',
          arcs: [
            { start: 'a', end: 'b'},
            { start: 'b', end: 'c'},
            { start: 'c', end: 'a'},
            { start: 'c', end: 'd'},
            { start: 'e', end: 'a'}
          ]
        }
      ].forEach(({start, end, arcs}) => expect(solveGraph(start, end, arcs)).toBe(true))
    })
  })
})