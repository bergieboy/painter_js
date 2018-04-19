/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["default"].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["default"].DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["default"](canvasEl, ctx);
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__painter__ = __webpack_require__(3);



class Game {
  constructor(canvas, ctx) {
    this.grid = [];
    this.painter = new __WEBPACK_IMPORTED_MODULE_1__painter__["a" /* default */](canvas);

    this.ctx = ctx;
    this.canvas = canvas;
    this.addGrid(canvas);

    this.fps = 10; // five frames per second
    this.fpsInterval = 1000 / this.fps;
    this.then = 0;

    // this.addPainter(canvas);
  }

  addGrid(canvas) {
    let grid = new __WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */]({canvas: canvas});
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

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Game = __webpack_require__(1);

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

    this.x = (this.width - 2 * this.cellSize) / 2;
    this.y = (this.height - 2 * this.cellSize) / 2;
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
      if (!(this.x > this.cellSize && this.x < this.width)) {
        this.keyPress.leftPressed = false;
      }

    } else if (this.keyPress.downPressed) {
      this.y -= this.cellSize;
      if (!(this.y > this.cellSize && this.y < this.height)) {
        this.keyPress.downPressed = false;
      }

    } else if (this.keyPress.rightPressed) {
      this.x += this.cellSize;
      if (!(this.x > this.cellSize && this.x < this.width - 2 * this.cellSize)) {
        this.keyPress.rightPressed = false;
      }

    } else if (this.keyPress.upPressed) {
      this.y += this.cellSize;
      if (!(this.y > this.cellSize && this.y < this.height)) {
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
    // ctx.shadowBlur=20;
    ctx.closePath();
    ctx.fill();
  }
  draw(ctx) {
    if (this.dead === true) {
      ctx.beginPath();
      ctx.font = '100px Bungee Shade';
      ctx.fillText(`DEAD`, 325, 300);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.font = '40px BioRhyme';
      ctx.fillText(`SCORE: %${this.finalScore}`, 325, 400);
      ctx.fillStyle="black";
      ctx.closePath();
      ctx.fill();

    } else {
      ctx.beginPath();
      this.trail.forEach( (coord, idx) => {
        ctx.fillRect(coord[0], coord[1], this.cellSize, this.cellSize);
        ctx.fillStyle="#4DA469";
      });
      this.painted.forEach( coord => {
        ctx.rect(coord[0], coord[1], this.cellSize, this.cellSize);
        ctx.fillStyle="#4DA469";
        // ctx.shadowBlur=20;
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
    console.log(this.painted.count);
    return (this.painted.length /
      (this.height * this.width /
        (this.cellSize * this.cellSize)) * 100).toFixed(2);
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Painter);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map