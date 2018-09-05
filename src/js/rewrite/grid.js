import {log, rndStr} from './utils/utils'
import Tile from "./tile";

class Grid {
  constructor(game, config, gridSize){
    this.game = game
    this.row = config.row
    this.col = config.col
    this.gridSize = gridSize

    this.cells = this.empty()
  }

  /**
   * [
   *   [null, null, ..., col]
   *   ...
   *   row
   * ]
   */
  empty(){
    let cells = []

    for (let i = 0; i < this.row; i++) {
      let row = cells[i] = []
      for (let j = 0; j < this.col; j++) {
        // row.push(null)
        row.push(new Tile(this.game, {row: i, col: j}, 0, this.gridSize))
      }
    }

    return cells
  }

  insertTile(tile){
    const oldTile = this.cells[tile.row][tile.col]
    log('old tile:', oldTile)
    oldTile.destroy()
    this.cells[tile.row][tile.col] = tile;
  }

  /**
   * 根据鼠标在canvas上的坐标找到对应的格子
   * @param {number} x 
   * @param {number} y 
   */
  findTile(x, y){
    const row = Math.floor(y / this.gridSize)
    const col = Math.floor(x / this.gridSize)

    if(row > this.row - 1 || col > this.col - 1){
      return null
    }

    return this.cells[row][col] || {
      x: col * this.gridSize,
      y: row * this.gridSize
    }
  }

  eachCell(callback){
    const cells = this.cells

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[0].length; j++) {
        callback(i, j, this.cells[i][j]);
      }
    }
  }

}

export default Grid