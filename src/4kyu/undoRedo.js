export class EventManager {
  constructor(object) {
    this.object = object
    this._resetEvents()
  }

  get(key) {
    return this.object[key]
  }

  _setSilent(key, value) {
    this.object[key] = value
  }

  _resetEvents() {
    this.index = -1
    this.events = []
  }

  set(key, value) {
    if (this.index < this.events.length - 1) {
      this._resetEvents()
    }
    this.events.push({ type: 'set', data: { key, oldValue: this.object[key], newValue: value } })
    this.index++
    this._setSilent(key, value)
  }

  del(key) {
    if (this.index < this.events.length - 1) {
      this._resetEvents()
    }
    this.events.push({ type: 'del', data: { key, oldValue: this.object[key], newValue: undefined } })
    this.index++
    delete this.object[key]
  }

  undo() {
    if (this.index === -1) {
      throw new Error('Can not undo')
    }
    const event = this.events[this.index]
    this._setSilent(event.data.key, event.data.oldValue)
    this.index -= 1
  }

  redo() {
    if (this.index + 1 == this.events.length) {
      throw new Error('Can not redo')
    }
    const event = this.events[this.index+1]
    this._setSilent(event.data.key, event.data.newValue)
    this.index += 1
  }
}
