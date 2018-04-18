
class Grid {
  constructor(options){
    this.canvas = options.canvas;
    this.cols = 40;
    this.rows = 24;
  }

  draw(ctx) {
    ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
    ctx.stroke();
  }
}

export default Grid;
