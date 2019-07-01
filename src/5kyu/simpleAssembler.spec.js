import { Assebmler } from './simpleAssembler'

describe('simpleAssembler', () => {
  const assembler = new Assebmler()
  describe('Assebmler', () => {
    it('should set register', () => {
      expect(assembler.assemble(['mov a 5'])).toEqual({'a': 5})
    })

    it('should set negative register', () => {
      expect(assembler.assemble(['mov a -5'])).toEqual({'a': -5})
    })

    it('should set variable register', () => {
      expect(assembler.assemble(['mov a 5', 'mov b a'])).toEqual({'a': 5, 'b': 5})
    })

    it('should increase register', () => {
      expect(assembler.assemble(['mov a 1', 'inc a'])).toEqual({'a': 2})
    })

    it('should decrease register', () => {
      expect(assembler.assemble(['mov a 2', 'dec a'])).toEqual({'a': 1})
    })

    it('should zero the register', () => {
      expect(assembler.assemble(['mov a 2', 'dec a', 'jnz a -1'])).toEqual({'a': 0})
    })

    it('should skip next instruction register', () => {
      expect(assembler.assemble(['mov a 2', 'jnz a 2', 'dec a', 'inc a'])).toEqual({'a': 3})
    })

    it('should handle first sample', () => {
      expect(assembler.assemble(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a'])).toEqual({'a': 1})
    })

    it('should handle second sample', () => {
      expect(assembler.assemble(['mov a -10','mov b a','inc a','dec b','jnz a -2'])).toEqual({'a': 0, 'b': -20})
    })
  })
})
