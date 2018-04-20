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
    this.level = 1;
    this.prevLevel = 1;
    this.enemyCount = 4;

    this.addEnemies(canvas);
  }


  addEnemies(canvas){
    for (let i = 0; i < this.enemyCount; i++) {
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
      this.drawScore(ctx);
      this.painter.drawCurrentPos(ctx);
      object.draw(this.ctx);
    });

  }

  levelUp(canvas){
    let score = this.painter.score();
    if (score >= 0 && score < 10) {
      this.level = 1;
    } else if (score >= 10 && score < 30) {
      this.level = 2;
    } else if (score >= 30 && score < 60) {
      this.level = 3;
    } else if (score >= 60 && score < 80) {
      this.level = 4;
    } else if (score >= 80 && score < 100) {
      this.level = 5;
    }

  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }


  drawScore(ctx) {
    let score = this.painter.score();
    ctx.beginPath();
    ctx.shadowBlur=3;
    ctx.shadowColor="white";
    ctx.font = '24px BioRhyme';
    ctx.fillText(`LVL: ${this.level} | SCORE: ${score}%`, 15, 585);
    ctx.closePath();
    ctx.fill();
  }

  animate(){
    const animationFrame = requestAnimationFrame(this.animate.bind(this));
    this.levelUp();
    if (this.prevLevel !== this.level) {
      this.addEnemies(this.canvas);
    }
    this.prevLevel = this.level;

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
      this.ctx.shadowBlur=20;
      this.ctx.shadowColor="white";
      this.ctx.fillStyle="black";
      this.ctx.font = '70px Bungee Shade';
      this.ctx.fillText(`GAME OVER`, 200, 200);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle="black";
      this.ctx.shadowBlur=0;
      this.ctx.shadowColor="white";
      this.ctx.font = '40px BioRhyme';
      this.ctx.fillText(`SCORE: ${this.painter.finalScore}%`, 280, 300);
      this.ctx.fillText(`CLICK TO PLAY AGAIN!`, 180, 400);
      this.ctx.closePath();
      this.ctx.fill();
      cancelAnimationFrame(animationFrame);
    }
    
    if (this.painter.won) {
      this.ctx.beginPath();
      this.ctx.shadowBlur=20;
      this.ctx.shadowColor="white";
      this.ctx.fillStyle="black";
      this.ctx.font = '70px Bungee Shade';
      this.ctx.fillText(`YOU WON!`, 250, 300);
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
