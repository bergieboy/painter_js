import Grid from "./grid";
import Painter from "./painter";

class Game {
  constructor(canvas, ctx) {
    this.grid = [];
    this.painter = [];

    this.ctx = ctx;
    this.canvas = canvas;
    this.addGrid(canvas);
    this.addPainter(canvas);
  }

  addGrid(canvas) {
    let grid = new Grid({canvas: canvas});
    console.log(grid.width);
    this.grid.push(grid);
  }

  addPainter(canvas) {
  let player = new Painter(canvas);
  this.painter.push(player);
}

  allObjects(){
    return [].concat(this.grid, this.painter);
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
  }


  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    
    this.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;

export default Game;
