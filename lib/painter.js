const Game = require("./game");

class Painter {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellSize = 15;
    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.keyPress = {
      rightPressed: false,
      leftPressed: false,
      upPressed: false,
      downPressed: false,
    };

    this.x = this.cellSize * Math.floor((Math.random() * (this.width / this.cellSize)));
    this.y = this.cellSize * Math.floor((Math.random() * (this.height / this.cellSize)));
    this.painted = [
      [this.x, this.y],
      [this.x + this.cellSize, this.y],
      [this.x + this.cellSize, this.y + this.cellSize],
      [this.x - this.cellSize, this.y + this.cellSize],
      [this.x, this.y + this.cellSize],
      [this.x - this.cellSize, this.y],
      [this.x - this.cellSize, this.y - this.cellSize],
      [this.x + this.cellSize, this.y - this.cellSize],
      [this.x, this.y - this.cellSize]
    ];
    this.trail = [];
    this.dead = false;
    this.finalScore = 0;
  }

  keyDown(e) {
    switch(e.keyCode) {
      case 37:
        this.keyPress.rightPressed = false;
        this.keyPress.leftPressed = true;
        this.keyPress.upPressed = false;
        this.keyPress.downPressed = false;
        break;
      case 38:
        this.keyPress.rightPressed = false;
        this.keyPress.leftPressed = false;
        this.keyPress.upPressed = false;
        this.keyPress.downPressed = true;
        break;
      case 39:
        this.keyPress.rightPressed = true;
        this.keyPress.leftPressed = false;
        this.keyPress.upPressed = false;
        this.keyPress.downPressed = false;
        break;
      case 40:
        this.keyPress.rightPressed = false;
        this.keyPress.leftPressed = false;
        this.keyPress.upPressed = true;
        this.keyPress.downPressed = false;
        break;
    }
  }

  move() {
    if (this.keyPress.leftPressed) {
      this.x -= this.cellSize;
      if (!(this.x > 0 && this.x < this.width)) {
        this.keyPress.leftPressed = false;
      }

    } else if (this.keyPress.downPressed) {
      this.y -= this.cellSize;
      if (!(this.y > 0 && this.y < this.height)) {
        this.keyPress.downPressed = false;
      }

    } else if (this.keyPress.rightPressed) {
      this.x += this.cellSize;
      if (!(this.x > 0 && this.x < this.width)) {
        this.keyPress.rightPressed = false;
      }

    } else if (this.keyPress.upPressed) {
      this.y += this.cellSize;
      if (!(this.y > 0 && this.y < this.height)) {
        this.keyPress.upPressed = false;
      }

    }

    if ((this.painted.find(el => el[0] === this.x
      && el[1] === this.y) === undefined)
      && (this.trail.find(el => el[0] === this.x
        && el[1] === this.y) === undefined)) {
          this.trail_safe = false;
          this.trail.push([this.x, this.y]);
        } else if (Boolean(this.trail.find(el => el[0] === this.x
          && el[1] === this.y))) {
            this.finalScore = this.score();
            this.dead = true;
          } else {
            this.painted = this.painted.concat(this.trail);
            this.trail = [];
            this.painted = this.sortCoords(this.painted);
            this.painted = this.mapAllCoords(this.painted);
          }
  }

  drawCurrentPos(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.cellSize, this.cellSize);
    ctx.fillStyle="#4DA469";
    ctx.closePath();
    ctx.fill();
  }
  draw(ctx) {
    if (this.dead === true) {
      ctx.beginPath();
      ctx.fillStyle="black";
      ctx.font = '100px Bungee Shade';
      ctx.fillText(`DEAD`, 280, 300);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle="black";
      ctx.font = '40px BioRhyme';
      ctx.fillText(`SCORE: ${this.finalScore}%`, 295, 400);
      ctx.closePath();
      ctx.fill();

    } else {
      ctx.beginPath();
      this.trail.forEach( (coord, idx) => {
        ctx.fillStyle="#86e0be";
        ctx.fillRect(coord[0], coord[1], this.cellSize, this.cellSize);
      });
      this.painted.forEach( coord => {
        ctx.fillStyle="#4DA469";
        ctx.rect(coord[0], coord[1], this.cellSize, this.cellSize);
      });
      ctx.closePath();
      ctx.fill();

    }

  }

  sortCoords(arr){
    let sorted = arr.slice();

    const funcSort = (x,  y) => {
      return (x[0] - y[0] || x[1] - y[1]) ;
    };

    sorted = sorted.sort(funcSort);
    return sorted;
  }

  mapAllCoords(sortedArr) {
    let newArr = sortedArr.slice();
    newArr.slice(0, sortedArr.length - 1).forEach( (coord, idx) => {
      if ((newArr[idx][0] === newArr[idx + 1][0])
        && (newArr[idx][1] !== (newArr[idx + 1][1]) - this.cellSize)) {
          newArr.splice(
            (idx + 1), 0, [parseInt(newArr[idx][0]), parseInt(newArr[idx][1]) + this.cellSize]
          );
        }
    });
    return newArr;
  }

  score(){
    return (this.painted.length /
      (this.height * this.width /
        (this.cellSize * this.cellSize)) * 100).toFixed(2);
  }

  trail(){
    return this.trail;
  }
}


export default Painter;
