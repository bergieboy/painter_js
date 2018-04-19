import Grid from "./grid";
import Painter from "./painter";

class Game {
  constructor(canvas, ctx) {
    this.grid = [];
    this.painter = new Painter(canvas);

    this.ctx = ctx;
    this.canvas = canvas;
    this.addGrid(canvas);

    this.fps = 10; // five frames per second
    this.fpsInterval = 1000 / this.fps;
    this.then = 0;

    // this.addPainter(canvas);
  }

  addGrid(canvas) {
    let grid = new Grid({canvas: canvas});
    console.log(grid.width);
    this.grid.push(grid);
  }

  allObjects(){
    return [].concat(this.grid, this.painter);
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
      this.painter.drawCurrentPos(ctx);
    });
  }


  start() {
    requestAnimationFrame(this.animate.bind(this));
  }
  animate(){
    requestAnimationFrame(this.animate.bind(this));

    const now = Date.now();
    const timeDelta = now - this.then;

    if (timeDelta > this.fpsInterval) {
      this.then = now - (timeDelta % this.fpsInterval);
      this.draw(this.ctx);
      this.painter.move();

    }
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;

export default Game;
