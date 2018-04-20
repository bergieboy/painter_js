import Game from "./game";
import Painter from "./painter";

class Enemy {
  constructor(canvas, painter){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellSize = 15;

    this.x = this.cellSize * Math.floor((Math.random() * (this.width / this.cellSize)));
    this.y = this.cellSize * Math.floor((Math.random() * (this.height / this.cellSize)));

    this.painter = painter;
    this.kill = false;
  }

  move(){
    let moves = [
      [0, this.cellSize],
      [this.cellSize, 0],
      [0, -this.cellSize],
      [-this.cellSize, 0]
    ];

    let nextMove = moves[Math.floor(Math.random() * moves.length)];

    if (
      (this.x + nextMove[0]) > 0 && ((this.x + nextMove[0]) < this.width)
      &&
      (this.y + nextMove[1]) > 0 && ((this.y + nextMove[1]) < this.height)
    ) {
      this.x += nextMove[0];
      this.y += nextMove[1];
      if (!(this.painter.trail.find(el => el[0] === this.x
        && el[1] === this.y) === undefined)) {
          this.painter.dead = true;
          this.painter.finalScore = this.painter.score();
        }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.shadowBlur=3;
    ctx.shadowColor="black";
    ctx.rect(this.x, this.y, this.cellSize, this.cellSize);
    ctx.fillStyle="black";
    ctx.closePath();
    ctx.fill();
  }
}
export default Enemy;
