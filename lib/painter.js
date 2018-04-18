const Game = require("./game");

class Painter {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellSize = 25;
    document.addEventListener('keydown', this.keyDown.bind(this), false);

  //   this.height = options.dim;
  //   this.width = options.dim;
    this.x = 0.5 * this.width - 15;
    this.y = 0.5 * this.height - 15;
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
  }

  keyDown(e) {
    switch(e.keyCode) {
      case 37:
        this.x -= this.cellSize;
        break;
      case 38:
        this.y -= this.cellSize;
        break;
      case 39:
        this.x += this.cellSize;
        break;
      case 40:
        this.y += this.cellSize;
        break;
    }
    if ((this.painted.find(el => el[0] === this.x
      && el[1] === this.y) === undefined)
     && (this.trail.find(el => el[0] === this.x
       && el[1] === this.y) === undefined)) {
      this.trail_safe = false;
      this.trail.push([this.x, this.y]);
    } else {
      this.painted = this.painted.concat(this.trail);
      this.trail = [];
      this.painted = this.sortCoords(this.painted);
      this.painted = this.mapAllCoords(this.painted);
    }
    console.log(this.sortCoords(this.painted));
    console.log(this.sortCoords(this.trail));
  }

  draw(ctx) {
  ctx.beginPath();
    this.trail.forEach( coord => {
      ctx.fillRect(coord[0], coord[1], this.cellSize, this.cellSize);
      ctx.fillStyle="#86E0BE";

    });
    this.painted.forEach( coord => {
      ctx.rect(coord[0], coord[1], this.cellSize, this.cellSize);
      ctx.fillStyle="#58A45C";
    });
    ctx.closePath();
    ctx.fill();
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
        && (newArr[idx][1] !== (newArr[idx + 1][1]) - 25)) {
          newArr.splice(
            (idx + 1), 0, [parseInt(newArr[idx][0]), parseInt(newArr[idx][1]) + 25]
          );
        }
    });
    return newArr;
  }

  fillPath(ctx) {
    ctx.beginPath();
    this.painted.forEach( coord => {
      ctx.rect(coord[0], coord[1], this.cellSize, this.cellSize);
    });
    ctx.fillStyle="#58A45C";
    ctx.closePath();
    ctx.fill();
  }
}



export default Painter;
