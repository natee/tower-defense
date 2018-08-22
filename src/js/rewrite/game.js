import { log, extend, debounce, randomColor } from './utils/utils';
import { CANVAS_OFFSET, PANEL_WIDTH } from './utils/constant';
import Grid from './grid';
import Tile from './tile';
import Building from './building';
import Popup from './popup';


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
    const FPS = 60

    this.drawCanvas()
    this.drawGrid()
    this.renderBuilds()

    this.popup.render()

    this._st = setTimeout( () => {
      this.step()
    }, FPS)
  }

  setup() {
    clearTimeout(this._st)

    this.grid = new Grid(this.config.grid, this.gridSize)

    this.buildCfg()
    this.initBuilds()
    this.bindEvents()

    this.step()
  }

  // 可选建筑物
  buildCfg(){
    const buildMap = new Building(this.ctx, 30)
  }

  bindEvents(){
    this.canvas.onmousemove = debounce(e => {
      const x = e.offsetX
      const y = e.offsetY

      this.currentTile = this.grid.findTile(x, y)

      if(this.currentTile){
        log(this.currentTile)

        setTimeout( () => {
          this.currentTile.onEnter(this.popup)
        })

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

        this.render(this.currentTile)
        this.lastTile = this.currentTile
      }else if(this.lastTile){
        this.lastTile.onOut(this.popup)
      }

      this.lastTile && this.render(this.lastTile)
    }, 10)
  }

  // 放置初始建筑
  initBuilds() {

    // new Building({row: 0, col: 0,}, 1, this.gridSize)
    // new Building({row: this.grid.row - 1, col: this.grid.col - 1,}, 2, this.gridSize)
    this.grid.insertTile(new Tile({row: 0, col: 0,}, 1, this.gridSize))
    this.grid.insertTile(new Tile({row: this.grid.row - 1, col: this.grid.col - 1,}, 2, this.gridSize))

    // TODO 添加更多建筑
  }

  renderBuilds() {
    
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