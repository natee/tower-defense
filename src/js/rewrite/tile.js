import { TILE_NAMES } from './utils/constant'

class Tile {

  /**
   * 格子信息
   * @param {object} position {row, col}
   * @param {string} type  0: 空白 1: 起点  2: 终点  待补充：建筑  怪物
   * @param {number} gridSize 
   */
  constructor(position, type, gridSize){
    this.row = position.row
    this.col = position.col
    this.type = type
    this.gridSize = gridSize || 20

    this.caculatePos()
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

  hover(){
    this.isHover = true
  }

  out(){
    this.isHover = false
  }

  onEnter(popup){
    this.hover()

    popup.msg(this, TILE_NAMES[this.type])
  }

  onOut(popup){
    this.out()
    popup.hide()
  }
}

export default Tile