import { log } from './utils/utils'

class Event {
  constructor() {
    this.listeners = {
      /* 
       * el-rndstr: {
       *   click: fn()
       *   hover: fn()
       * }
       */
    }

  }

  step() {
    for (let elem in this.listeners) {
      const a = this.listeners[elem]

      const isEventOn = this._isOn(a[0])
      log(this.ex, this.ey, isEventOn)
      if (isEventOn) {
        console.log(this.currentEventType)

        // a[this.currentEventType]()
      }

      // this.currentEventType = null

    }
  }

  _isOn(elem) {
    return (this.ex != -1 &&
      this.ey != -1 &&
      this.ex > elem.x &&
      this.ex < elem.x2 &&
      this.ey > elem.y &&
      this.ey < elem.y2);
  }

  $on(eleName, eventType, ele) {
    const name = eventType.replace(/\b[a-z]/g, char => char.toUpperCase())
    this.listeners[eleName] = [ele, eventType, ele['_on' + name]]
  }

  $emit(eventType, x, y) {
    this.currentEventType = eventType
    this.ex = x
    this.ey = y
    log(x, y)

    this.step()
  }
}

export default Event