
import '../../css/c.css';
import TowerDefense from './game'

var g = new TowerDefense("#td-canvas", {
  grid: {
    row: 10,
    col: 15,
  },
  gridSize: 30, // 格子大小，单位px
})