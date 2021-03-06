import Tile from './tile';

function lineTo2(ctx, x0, y0, x1, y1, len) {
  var x2, y2, a, b, p, xt,
    a2, b2, c2;

  if (x0 == x1) {
    x2 = x0;
    y2 = y1 > y0 ? y0 + len : y0 - len;
  } else if (y0 == y1) {
    y2 = y0;
    x2 = x1 > x0 ? x0 + len : x0 - len;
  } else {
    // 解一元二次方程
    a = (y0 - y1) / (x0 - x1);
    b = y0 - x0 * a;
    a2 = a * a + 1;
    b2 = 2 * (a * (b - y0) - x0);
    c2 = Math.pow(b - y0, 2) + x0 * x0 - Math.pow(len, 2);
    p = Math.pow(b2, 2) - 4 * a2 * c2;
    if (p < 0) {
//				TD.log("ERROR: [a, b, len] = [" + ([a, b, len]).join(", ") + "]");
      return [0, 0];
    }
    p = Math.sqrt(p);
    xt = (-b2 + p) / (2 * a2);
    if ((x1 - x0 > 0 && xt - x0 > 0) ||
      (x1 - x0 < 0 && xt - x0 < 0)) {
      x2 = xt;
      y2 = a * x2 + b;
    } else {
      x2 = (-b2 - p) / (2 * a2);
      y2 = a * x2 + b;
    }
  }

  ctx.lineCap = "round";
  ctx.moveTo(x0, y0);
  ctx.lineTo(x2, y2);

  return [x2, y2];
}

const renderFunctions = {

  // 加农炮
  "cannon": function (b, ctx, gs, gs2) {
    var target_position = b.getTargetPosition();

    ctx.fillStyle = "#393";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(b.cx, b.cy, gs2 - 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(b.cx, b.cy);
    b.muzzle = lineTo2(ctx, b.cx, b.cy, target_position[0], target_position[1], gs2);
    ctx.closePath();
//			ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#060";
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, 7, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cec";
    ctx.beginPath();
    ctx.arc(b.cx + 2, b.cy - 2, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

  },
  "LMG": function (b, ctx, gs, gs2) {
    var target_position = b.getTargetPosition();

    ctx.fillStyle = "#36f";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(b.cx, b.cy, 7, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(b.cx, b.cy);
    b.muzzle = lineTo2(ctx, b.cx, b.cy, target_position[0], target_position[1], gs2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#66c";
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ccf";
    ctx.beginPath();
    ctx.arc(b.cx + 1, b.cy - 1, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

  },
  "HMG": function (b, ctx, gs, gs2) {
    var target_position = b.getTargetPosition();

    ctx.fillStyle = "#933";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(b.cx, b.cy, gs2 - 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(b.cx, b.cy);
    b.muzzle = lineTo2(ctx, b.cx, b.cy, target_position[0], target_position[1], gs2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#630";
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, gs2 - 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#960";
    ctx.beginPath();
    ctx.arc(b.cx + 1, b.cy - 1, 8, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fcc";
    ctx.beginPath();
    ctx.arc(b.cx + 3, b.cy - 3, 4, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

  },

  // 墙
  "wall": function (b, ctx, gs, gs2) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "#666";
    ctx.strokeStyle = "#000";
    ctx.fillRect(b.cx - gs2 + 1, b.cy - gs2 + 1, gs - 1, gs - 1);
    ctx.beginPath();
    ctx.moveTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
    ctx.lineTo(b.cx - gs2 + 0.5, b.cy + gs2 + 0.5);
    ctx.lineTo(b.cx + gs2 + 0.5, b.cy + gs2 + 0.5);
    ctx.lineTo(b.cx + gs2 + 0.5, b.cy - gs2 + 0.5);
    ctx.lineTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
    ctx.moveTo(b.cx - gs2 + 0.5, b.cy + gs2 + 0.5);
    ctx.lineTo(b.cx + gs2 + 0.5, b.cy - gs2 + 0.5);
    ctx.moveTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
    ctx.lineTo(b.cx + gs2 + 0.5, b.cy + gs2 + 0.5);
    ctx.closePath();
    ctx.stroke();
  },

  // 激光枪
  "laser_gun": function (b, ctx/*, gs, gs2*/) {

    ctx.fillStyle = "#f00";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.lineWidth = 1;
//			ctx.arc(b.cx, b.cy, gs2 - 5, 0, Math.PI * 2, true);
    ctx.moveTo(b.cx, b.cy - 10);
    ctx.lineTo(b.cx - 8.66, b.cy + 5);
    ctx.lineTo(b.cx + 8.66, b.cy + 5);
    ctx.lineTo(b.cx, b.cy - 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#60f";
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, 7, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(b.cx + 1, b.cy - 1, _TD.retina, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(b.cx, b.cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
};

class Building {
  constructor(context, type){
    this.ctx = context
    this.type = type
    this.setup()
  }

  setup(){
    this.render()
  }

  render(){
    const gs = this.gridSize
    const gs2 = this.gridSize / 2
    const ctx = this.ctx;
    (renderFunctions[this.type] || renderFunctions["wall"])(
			this, ctx, gs, gs2
		);
  }
}

export default Building