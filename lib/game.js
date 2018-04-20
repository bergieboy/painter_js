import Grid from "./grid";
import Painter from "./painter";
import Enemy from "./enemies";

class Game {
  constructor(canvas, ctx) {
    this.grid = [];
    this.enemies = [];
    this.painter = new Painter(canvas);

    this.ctx = ctx;
    this.canvas = canvas;
    this.addGrid(canvas);

    this.fps = 10; // ten frames per second
    this.fpsInterval = 1000 / this.fps;
    this.then = 0;

    this.addEnemies(canvas);
  }


  addEnemies(canvas){
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new Enemy(canvas, this.painter));
    }
  }

  addGrid(canvas) {
    let grid = new Grid({canvas: canvas});
    this.grid.push(grid);
  }

  allObjects(){
    return [].concat(this.grid, this.painter, this.enemies);
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.allObjects().forEach((object) => {
      this.painter.drawCurrentPos(ctx);
      object.draw(this.ctx);
    });

  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    const animationFrame = requestAnimationFrame(this.animate.bind(this));

    const now = Date.now();
    const timeDelta = now - this.then;

    if (timeDelta > this.fpsInterval) {
      this.then = now - (timeDelta % this.fpsInterval);
      this.painter.move();
      this.draw(this.ctx);
      this.enemies.forEach( (enemy) => enemy.move() );
    }

    if (this.painter.dead) {
      this.ctx.beginPath();
      this.ctx.fillStyle="black";
      this.ctx.font = '70px Bungee Shade';
      this.ctx.fillText(`YOU DIED!`, 220, 200);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle="black";
      this.ctx.font = '40px BioRhyme';
      this.ctx.fillText(`SCORE: ${this.painter.finalScore}%`, 280, 300);
      this.ctx.fillText(`CLICK SCREEN TO PLAY AGAIN!`, 80, 400);
      this.ctx.closePath();
      this.ctx.fill();
      cancelAnimationFrame(animationFrame);
    }
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 900;
Game.DIM_Y = 600;

export default Game;
