import {log, strLen2, randomColor} from './utils/utils'

class Popup {
  constructor(game){
    this.game = game
    this.isVisible = false
  }

  caculatePos(){
    var el = this.el

    this.x = el.cx + 0.5
    this.y = el.cy + 0.5

    // 让文字显示在网格内
    const rightX = this.game.grid.cells[0][this.game.config.grid.col - 1].x2 // 最右侧单元格右边x
    if (this.x + this.width > rightX) {
      this.x = this.x - this.width
    }

    this.px = this.x + 5
    this.py = this.y + 2
  }

  msg(tile, txt){
    if(!txt) return

    this.text = txt
    this.el = tile

    const ctx = this.game.ctx
    ctx.font = "normal 12px 'Courier New'"
    this.width = Math.max(
      ctx.measureText(txt).width + 10,
      strLen2(txt) * 6 + 10
    )
    this.height = 20

    this.caculatePos()
    this.show()
  }

  hide(){
    this.isVisible = false
  }

  show(){
    this.isVisible = true
  }

  render(){
    if(!this.isVisible) return

    const ctx = this.game.ctx

    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.strokeStyle = "rgba(222, 222, 0, 0.9)";
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.fillText(this.text, this.px, this.py)
    ctx.closePath()
  }

}

export default Popup