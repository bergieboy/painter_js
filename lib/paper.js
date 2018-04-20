import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let game;
  const ctx = canvasEl.getContext("2d");
  game = new Game(canvasEl, ctx);
  canvasEl.addEventListener('click', () => {
    if (game.painter.dead) {
      game = new Game(canvasEl, ctx);
      game.start();
    }
  });
  game.start();
});
