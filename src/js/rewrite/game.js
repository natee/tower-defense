import { log, extend, debounce, randomColor, pointInRect } from './utils/utils';
import { CANVAS_OFFSET, PANEL_WIDTH } from './utils/constant';
import Grid from './grid';
import Tile from './tile';
import Building from './building';
import Popup from './popup';
import Button from './button';
import Event from './event';


// default config
let defaultConfig = {
  grid: {
    row: 20,
    col: 20,
  },
  gridSize: 20
}

class TowerDefense {
  constructor(canvasId, config) {
    this.popup = new Popup(this)

    this.canvasId = canvasId
    this._events = {
      click: [],
      hover: [],
      out: [],
    }

    // TODO 有bug defaultConfig被修改了，所以这个defaultConfig应不应该写成局部变量
    this.config = extend(defaultConfig, config)
    this.canvas = document.querySelector(canvasId)
    this.ctx = this.canvas.getContext('2d')
    this.gridSize = config.gridSize
    this.currentTile = null
    this.lastTile = null // 上一次触摸的格子
    this.setup()

  }

  step(){
    // 注：需要渲染的内容需写在这里
    const FPS = 60

    // this.drawCanvas()
    this.drawGrid()
    this.renderGrids()

    this.popup.render()

    this.drawAvailableBuilds()
    // this.drawButton()

    this._st = setTimeout( () => {
      this.step()
    }, FPS)
  }

  setup() {
    clearTimeout(this._st)

    this.grid = new Grid(this.config.grid, this.gridSize)

    this.drawCanvas()
  
    this.setStartBuilds()
    this.bindEvents()

    this.drawButton()

    this.step()
  }

  // 可选建筑物
  drawAvailableBuilds(){
    const buildMap = new Building(this.ctx, 30)
  }

  drawButton(){
    const self = this

    const config = this.config
    const row = config.grid.row
    const col = config.grid.col
    const size = config.gridSize
    const ctx = this.ctx

    var startBtn = new Button(this, {
      text: '开始',
      x: col * size + 15,
      y: 0,
      _onClick: function(){
        log('click start button')
      }
    })

    var stopBtn = new Button(this, {
      text: '暂停',
      x: col * size + 15,
      y: 40,
      _onClick: function(){
        log('click stop button')
      }
    })
  }

  click(x, y){

    this._events.click.forEach( (obj) => {
      const elem = obj.elem
      if(pointInRect({ex: x, ey: y}, {x: elem.x, y: elem.y, x2: elem.x2, y2: elem.y2})){
        obj.fn.call(elem)
      }
    })
  }

  hover(x, y){
    this._events.hover.forEach( (obj) => {
      const elem = obj.elem
      if(pointInRect({ex: x, ey: y}, {x: elem.x, y: elem.y, x2: elem.x2, y2: elem.y2})){
        obj.fn.call(elem)
      }else{
        // excute out event
        obj.fn.call(elem, 'out')
      }
    })

    // TODO canvas这么大，怎么可能只找格子，还要做按钮、建筑物的事件判断
    this.currentTile = this.grid.findTile(x, y)

    if(this.currentTile){

      this.currentTile.onEnter(this.popup)

      if(this.lastTile){
        const isSameTile = this.lastTile.row === this.currentTile.row
                          && this.lastTile.col === this.currentTile.col
        
        // 鼠标移出上一个格子
        if(!isSameTile){
          this.lastTile.onOut(this.popup)
        }else{
          return
        }
      }

      // log(this.currentTile)

      this.lastTile = this.currentTile
    }
    else if(this.lastTile){
      // 移除格子范围外，隐藏高亮状态
      this.lastTile.onOut(this.popup)
    }
  }

  getEventXY(e){
    return [e.offsetX, e.offsetY]
  }

  bindEvents(){
    this.canvas.onmousemove = debounce( e => {
      const xy = this.getEventXY(e)
      this.hover(xy[0], xy[1])
    }, 10)

    this.canvas.onclick = e => {
      const xy = this.getEventXY(e)
      this.click(xy[0], xy[1])
    }
  }

  // 放置初始建筑
  setStartBuilds() {

    // new Building({row: 0, col: 0,}, 1, this.gridSize)
    // new Building({row: this.grid.row - 1, col: this.grid.col - 1,}, 2, this.gridSize)
    this.grid.insertTile(new Tile({row: 0, col: 0,}, 1, this.gridSize))
    this.grid.insertTile(new Tile({row: this.grid.row - 1, col: this.grid.col - 1,}, 2, this.gridSize))

    // TODO 添加更多建筑
  }

  renderGrids() {
    
    this.grid.eachCell( (i, j, tile) => {
      this.render(tile)
    })
  }

  render(cell){
    const px = cell.x + 2*CANVAS_OFFSET
    const py = cell.y + 2*CANVAS_OFFSET
    const ctx = this.ctx

    if(cell.type === 0){
      // 触摸格子时给个高亮色
      if (cell.isHover) {
        ctx.fillStyle = randomColor(0.2) // "rgba(255, 255, 200, 0.2)"
        ctx.beginPath()
        ctx.fillRect(px, py, this.gridSize - 2 * CANVAS_OFFSET, this.gridSize - 2 * CANVAS_OFFSET)
        ctx.closePath()
        ctx.fill()
      }
      
      return
    }

    if(cell.type === 1 || cell.type === 2){
      ctx.lineWidth = 1;
      ctx.fillStyle = "#ccc";
      ctx.beginPath();
      ctx.fillRect(px, py, this.gridSize - 2 * CANVAS_OFFSET, this.gridSize - 2 * CANVAS_OFFSET);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#666";
      ctx.fillStyle = cell.type === 1 ? "#fff" : "#666";
      ctx.beginPath();
      ctx.arc(cell.cx, cell.cy, this.gridSize * 0.325, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

  }

  // 游戏画布，大小基于给定地图格子数
  drawCanvas() {
    const c = this.config
    const width = c.grid.col * c.gridSize + CANVAS_OFFSET * 2 + PANEL_WIDTH
    const height = c.grid.row * c.gridSize + CANVAS_OFFSET * 2
    this.canvas.setAttribute('width', width)
    this.canvas.setAttribute('height', height)
  }

  // 绘制格子
  drawGrid() {
    const config = this.config
    const row = config.grid.row
    const col = config.grid.col
    const size = config.gridSize
    const ctx = this.ctx
    ctx.lineWidth = 0.5

    this.ctx.clearRect(0, 0, col * size, row * size)

    for (let i = 0; i <= row; i++) {
      const y = size * i
      ctx.strokeStyle = i === 0 || i === row ? '#000' : '#CCC'
      ctx.beginPath();
      ctx.moveTo(CANVAS_OFFSET, y + CANVAS_OFFSET);
      ctx.lineTo(size * col + CANVAS_OFFSET, y + CANVAS_OFFSET);
      ctx.stroke();
    }

    for (let i = 0; i <= col; i++) {
      const x = size * i
      ctx.strokeStyle = i === 0 || i === col ? '#000' : '#CCC'
      ctx.beginPath();
      ctx.moveTo(x + CANVAS_OFFSET, CANVAS_OFFSET);
      ctx.lineTo(x + CANVAS_OFFSET, size * row + CANVAS_OFFSET);
      ctx.stroke();
    }
  }
}

export default TowerDefense;