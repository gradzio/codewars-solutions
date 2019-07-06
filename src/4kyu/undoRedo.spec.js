import { EventManager } from './undoRedo'

describe('undoRedo', () => {
  describe('unit', () => {
    let em
    beforeEach(() => {
      em = new EventManager({x: 1})
    })
    it('should get value', () => {
      expect(em.get('x')).toEqual(1)
      expect(em.get('y')).toBeUndefined()
    })

    it('should set value', () => {
      em.set('x', 2)
      em.set('y', 1)

      expect(em.get('x')).toEqual(2)
      expect(em.get('y')).toEqual(1)
    })

    it('should delete key', () => {
      em.del('x')

      expect(em.get('x')).toBeUndefined()
    })

    it('should undo set', () => {
      em.set('y', 1)

      em.undo()

      expect(em.get('y')).toBeUndefined()
    })

    it('should undo double set', () => {
      em.set('y', 1)
      em.set('y', 10)

      em.undo()
      expect(em.get('y')).toBe(1)

      em.undo()
      expect(em.get('y')).toBeUndefined()
    })

    it('should undo del', () => {
      em.del('x')

      em.undo()

      expect(em.get('x')).toEqual(1)
    })

    it('should undo double del', () => {
      em.set('y', 10)
      em.del('x')
      em.del('y')

      em.undo()
      expect(em.get('y')).toEqual(10)

      em.undo()
      expect(em.get('x')).toEqual(1)
    })

    it('should throw exception when there is nothing to undo', () => {
      expect(() => em.undo()).toThrowError('Can not undo')
    })

    it('should redo set', () => {
      em.set('x', 10)

      em.undo()
      em.redo()

      expect(em.get('x')).toEqual(10)
    })

    it('should redo del', () => {
      em.del('x')

      em.undo()
      em.redo()

      expect(em.get('x')).toBeUndefined()
    })

    it('should throw exception when there was no undo', () => {
      expect(() => em.redo()).toThrowError('Can not redo')
    })

    it('should reset undo after set', () => {
      em.set('x', 10)
      em.set('x', 11)

      em.undo()

      em.set('x', 1)

      expect(() => em.redo()).toThrowError('Can not redo')
    })
  })
})