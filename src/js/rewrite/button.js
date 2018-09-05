import {log, strLen2, rndStr} from './utils/utils'

class Button{
  constructor(game, options){

    this.game = game
    this.text = options.text || '按钮'
    this._onClick = options._onClick || function(){}
    this._onHover = options._onHover || this._onHover
    this._onOut = options._onOut || this._onOut

    // 随机生成一个id识别当前对象
    this.id = 'el-' + rndStr()
    this.options = options
    this.setup()
  }

  setup(){
    this.caculatePos()
    this.render()
    this.bindEvents()
  }

  // 得到两个坐标便于判断鼠标是有交互
  caculatePos() {

    this.width = Math.max(
      this.game.ctx.measureText(this.text).width + 10,
      strLen2(this.text) * 6 + 10
    )
    this.height = 20
    this.x = this.options.x
    this.y = this.options.y
    this.x2 = this.x + this.width + 2 * 5
    this.y2 = this.y + this.height + 2 * 2

    this.fontX = this.x + 5
    this.fontY = this.y + 4
  }

  render(){
    const ctx = this.game.ctx

    ctx.lineWidth = 1;
    ctx.fillStyle = this.isHover ? "#f00" : "#ccc";
    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    ctx.font = "normal 12px 'Courier New'";
    ctx.beginPath();
    ctx.fillText(this.text, this.fontX, this.fontY);
    ctx.closePath();
    ctx.fill();
  }

  _onHover(out){
    if(out){
      this._onOut()
      return
    }
    this.isHover = true
    this.render()
  }

  _onOut(){
    this.isHover = false
    this.render()
  }

  // 每个元素都要绑一次？烦
  bindEvents(){
    const ele = this.id

    let events = this.game._events
    events['click'].push({ _id: ele, elem: this, fn: this._onClick})
    events['hover'].push({ _id: ele, elem: this, fn: this._onHover})
    events['out'].push({ _id: ele, elem: this, fn: this._onOut})
  }

}

export default Button