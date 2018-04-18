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
  game.start(ctx);
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
    this.painter = [];

    this.ctx = ctx;
    this.canvas = canvas;
    this.addGrid(canvas);
    this.addPainter(canvas);
  }

  addGrid(canvas) {
    let grid = new __WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */]({canvas: canvas});
    console.log(grid.width);
    this.grid.push(grid);
  }

  addPainter(canvas) {
  let player = new __WEBPACK_IMPORTED_MODULE_1__painter__["a" /* default */](canvas);
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
    ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map