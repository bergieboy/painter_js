
class Grid {
  constructor(options){
    this.canvas = options.canvas;
    this.cols = 40;
    this.rows = 24;
  }

  draw(ctx) {
    ctx.shadowBlur=10;
    ctx.shadowColor="black";
    ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    ctx.stroke();
  }
}

export default Grid;
