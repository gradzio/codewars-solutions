export class Assebmler {
  constructor() {
    this.processResolver = {
      'mov': (value) => ({ increase: 1, value: isNaN(value) ? this.data[value] : parseInt(value) }),
      'inc': (value, registerVal) => ({ increase: 1, value: registerVal + 1 }),
      'dec': (value, registerVal) => ({ increase: 1, value: registerVal - 1 }),
      'jnz': (value, registerVal) => ({ increase: registerVal !== 0 ? parseInt(value) : 1, value: registerVal })
    }
  }
  assemble(instructions) {
    this.data = {}
    let i = 0
    while(i < instructions.length) {
      const instructionParams = instructions[i].split(' ')
      const instructionType = instructionParams.shift()
      const register = instructionParams.shift()
      const { increase, value } = this.processResolver[instructionType](instructionParams, this.data[register])
      if (isNaN(register)) {
        this.data[register] = value
      }
      i += increase
    }
    return this.data
  }
}
