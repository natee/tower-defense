import { TILE_NAMES } from './utils/constant'
import {log, rndStr} from './utils/utils'

class Tile {

  /**
   * 格子信息
   * @param {object} position {row, col}
   * @param {string} type  0: 空白 1: 起点  2: 终点  待补充：建筑  怪物
   * @param {number} gridSize 
   */
  constructor(game, position, type){
    this.game = game
    this.row = position.row
    this.col = position.col
    this.type = type
    this.gridSize = game.gridSize || 20

    // 随机生成一个id识别当前对象
    this.id = 'el-' + rndStr()
    this.setup()
  }

  setup(){
    this.caculatePos()
    this.bindEvents()
  }

  /**
   * 获取单元格位置信息
   * (x,y)-----------
   *      |         |
   *      | (cx,cy) |
   *      |         |
   *      -----------(x2, y2)
   */
  caculatePos() {
    const gridSize = this.gridSize
    this.x = this.col * gridSize
    this.y = this.row * gridSize
    this.x2 = this.x + gridSize
    this.y2 = this.y + gridSize
    this.cx = Math.floor(this.x + gridSize / 2)
    this.cy = Math.floor(this.y + gridSize / 2)
  }

  _onHover(out){
    if(out){
      this._onOut()
      return
    }
    this.isHover = true
    this.game.popup.msg(this, TILE_NAMES[this.type])
  }

  _onOut(){
    this.isHover = false
    // this.game.popup.hide()
  }

  // 每个元素都要绑一次？烦
  bindEvents(){
    const ele = this.id

    let events = this.game._events
    events['hover'].push({ _id: ele, elem: this, fn: this._onHover})
    events['out'].push({ _id: ele, elem: this, fn: this._onOut})
  }

  // 清除事件
  destroy(){
    let events = this.game._events
    const clickLen = events.click.length
    const hoverLen = events.hover.length
    for (let i = 0; i < clickLen; i++) {
      const el = events.click[i];
      if(el._id === this.id){
        events.click.splice(i, 1)
        break;
      }
    }

    for (let i = 0; i < hoverLen; i++) {
      const el = events.hover[i];
      if(el._id === this.id){
        events.hover.splice(i, 1)
        break;
      }
    }
  }

}

export default Tile