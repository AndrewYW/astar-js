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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/draw_util.js":
/*!*****************************!*\
  !*** ./src/js/draw_util.js ***!
  \*****************************/
/*! exports provided: fadeBlack, clearTerrain, drawMap, drawTerrain, drawNode, drawPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeBlack", function() { return fadeBlack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTerrain", function() { return clearTerrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawMap", function() { return drawMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawTerrain", function() { return drawTerrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawNode", function() { return drawNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawPath", function() { return drawPath; });
const fadeBlack = ctx => {

};

const clearTerrain = ctx => {
  ctx.fillStyle = "#66CD00";
  ctx.fillRect(0, 0, 800, 800);
};

const drawMap = (ctx, map, btn, btn2, btn3, btnText) => {
  clearTerrain(ctx);
  var offset = 0;

  map.hardCoordinates.forEach(coord => {
    setTimeout(function(){ drawTerrain(ctx, coord, '#708090')}, offset);
    offset += 1;
  })
  
  map.highways.forEach(coord => {
    setTimeout(function(){drawTerrain(ctx, coord, '#00FFFF')}, offset);
    offset += 5;
  })

  map.blocked.forEach(coord => {
    setTimeout(function(){drawTerrain(ctx, coord, '#2f4f4f')}, offset);
    // offset += 1;
  });

  setTimeout(function(){ drawPoints( ctx, map.startNode, map.endNode )}, offset);

  setTimeout(function(){ 
    btn.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn.innerHTML = btnText;
  }, offset+5);
}

const drawTerrain = (ctx, {row, col}, fillStyle) => {
  ctx.fillStyle = fillStyle;
  const x = row * 5
  const y = col * 5;

  ctx.fillRect( x, y, 5, 5 );
};

const drawNode = (ctx, node) => {
  switch (node.type) {
    case '0':   //Blocked
      ctx.fillStyle = '#2f4f4f'; //Darkslategray
      break;
    case '1':   //Regular unblocked
      ctx.fillStyle = "#66CD00"  //Chartreuse green
      break;
    case '2':   //Hard to traverse
      ctx.fillStyle = "#708090";  //Slate gray
      break;
    case 'a':   //Regular highway
    case 'b':   //Hard traverse highway
      ctx.fillStyle = "#00FFFF"; //Cyan
      break;
  }

  const x = node.row * 5;
  const y = node.col * 5;

  ctx.fillRect(x, y, 5, 5);
};

const drawPath = (ctx, node) => {

}

const drawPoints = (ctx, start, end) => {
  
  drawTerrain(ctx, {row: start.row, col: start.col}, "yellow");
  drawTerrain(ctx, {row: end.row, col: end.col}, "yellow");
  
}



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: SIZE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIZE", function() { return SIZE; });
/* harmony import */ var _draw_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw_util */ "./src/js/draw_util.js");
/* harmony import */ var _mapmaker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapmaker */ "./src/js/mapmaker.js");



const SIZE = 800;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const random = document.getElementById("random-button");
  const create = document.getElementById("create-button");
  const solve = document.getElementById("solve-button");
  var slider = document.getElementById("slider");
  var output = document.getElementById("slider-output");
  var pathSlider = document.getElementById("path-slider");
  var pathOutput = document.getElementById("path-output");
  var hardSlider = document.getElementById("hard-slider");
  var hardOutput = document.getElementById("hard-output");
  var blockSlider = document.getElementById("block-slider");
  var blockOutput = document.getElementById("block-output");
  var distSlider = document.getElementById("dist-slider");
  var distOutput = document.getElementById("dist-output");

  pathOutput.innerHTML = pathSlider.value;
  hardOutput.innerHTML = hardSlider.value;
  blockOutput.innerHTML = blockSlider.value;
  output.innerHTML = slider.value;


  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  slider.oninput = function() { output.innerHTML = this.value; }
  pathSlider.oninput = function() { pathOutput.innerHTML = this.value; }
  blockSlider.oninput = function() { blockOutput.innerHTML = this.value; }
  hardSlider.oninput = function() { hardOutput.innerHTML = this.value; }
  distSlider.oninput = function() { distOutput.innerHTML = this.value; }

  random.onclick = function() { 
      random.disabled = true;
      create.disabled = true;
      solve.disabled = true;
      random.innerHTML = "Creating...";
      createRandomMap(ctx, random, create, solve, "Create random map!");
  };

  create.onclick = function() {
    create.disabled = true;
    random.disabled = true;
    solve.disabled = true;
    create.innerHTML = "Creating...";
    const centerCount = parseInt(hardOutput.innerHTML);
    const pathCount = parseInt(pathOutput.innerHTML);
    const blockRate = parseFloat(blockOutput.innerHTML / 100);
    const minDist = parseInt(distOutput.innerHTML);
    createMap(ctx, centerCount, pathCount, blockRate, minDist, create, random, solve, "Create Map!");
  }
  
  _draw_util__WEBPACK_IMPORTED_MODULE_0__["clearTerrain"](ctx);
  
});

function createRandomMap(ctx, btn, btn2, btn3, btnText) {
  var map = Object(_mapmaker__WEBPACK_IMPORTED_MODULE_1__["generateRandomMap"])();
  _draw_util__WEBPACK_IMPORTED_MODULE_0__["drawMap"](ctx, map, btn, btn2, btn3, btnText);
}

function createMap(ctx, centerCount, pathCount, blockRate, minDist, btn, btn2, btn3, btnText) {
  var map = Object(_mapmaker__WEBPACK_IMPORTED_MODULE_1__["generateMap"])(centerCount, pathCount, blockRate, minDist);
  _draw_util__WEBPACK_IMPORTED_MODULE_0__["drawMap"](ctx, map, btn, btn2, btn3, btnText);
}



/***/ }),

/***/ "./src/js/mapmaker.js":
/*!****************************!*\
  !*** ./src/js/mapmaker.js ***!
  \****************************/
/*! exports provided: generateMap, generateRandomMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMap", function() { return generateMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRandomMap", function() { return generateRandomMap; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/js/node.js");


const generateMap = (centerCount, pathCount, blockRate, minDist) => {
  let map = Array(160).fill().map(() => Array(160).fill('1'));
  let hardCoordinates = setHards(map, centerCount);
  let highways = setHighways(map, pathCount);
  let blocked = setBlocked(map, blockRate); 
  let nodeMap = createNodeMap(map);
  let { startNode, endNode } = createNodePoints(nodeMap, minDist);

  const result = {  
    map,
    nodeMap,
    startNode,
    endNode,
    hardCoordinates,
    highways,
    blocked
  };
  return result;
}

const generateRandomMap = () => {
  const centerCount = Math.floor(Math.random() * 16);
  const pathCount = Math.floor(Math.random() * 10);
  const blockRate = Math.random() * .3;
  const minDist = Math.floor(Math.random() * (150 - 50 + 1)) + 50;

  const result = generateMap(centerCount, pathCount, blockRate, minDist);
  return result;
}

const randomInt = ceiling => {
  return Math.floor(Math.random() * (ceiling));
}

const randomBoolean = () => {
  return (Math.random() < .5);
}

const euclidDistance = (xRow, xCol, yRow, yCol, minDist) => {
  const a = Math.pow((xRow - yRow), 2);
  const b = Math.pow((xCol - yCol), 2);

  return !(Math.sqrt(a+b) < minDist);
}

const inBounds = (row, col, size) => {
  return ((row > -1) && (row < size) && (col > -1) && (col < size));
}

const setHards = (map, centerCount = 8) => {
  var count = 0;
  var centers = [];
  var hardCoordinates = [];
  while (count < centerCount) {
    var repeat = false;
    var row = randomInt(160);
    var col = randomInt(160);

    for (let i = 0; i < count; i++) {
      if (centers.includes([row, col])) repeat = true;
    }

    if (!repeat) {
      centers.push([row, col]);

      for (let i = -15; i < 16; i++){
        for(let j = -15; j < 16; j++){
          if(inBounds(row+i, col+j, 160) && randomBoolean()){
            hardCoordinates.push({ row: row + i, col: col + j });
            map[row+i][col+j] = '2';
          }
        }
      }
      count++;
    }
  }

  return hardCoordinates;
};

const setHighways = (map, pathCount) => {
  var highways = [];
  let tries = 0;
  let paths = 0;

  while(paths < pathCount) {
    if (tries === 100000) {
      console.log(`try count: ${tries}`)
      highways = [];
      tries = 0;
    } else {
      let path = makePath(map, highways, setStartCoords(map.length));
      if (path != null) {
        highways = highways.concat(path);
        paths++;
      } else {
        tries++;
      }
    }
  }

  highways.forEach(coord => {
    if (map[coord.row][coord.col] === '1'){
      map[coord.row][coord.col] = 'a';
    } else {
      map[coord.row][coord.col] = 'b';
    }
  });

  return highways;
};

const setStartCoords = (size) => {
  let row = 0;
  let col = 0;
  let border = 0;
  let setStart = false;

  while(!setStart) {
    if(randomBoolean()){
      if(randomBoolean()){
        row = 0;
        col = randomInt(size);
        border = 1;
      } else {
        row = size - 1;
        col = randomInt(size);
        border = 2;
      }
    } else {
      if (randomBoolean()) {
        row = randomInt(size);
        col = 0;
        border = 3;
      } else {
        row = randomInt(size);
        col = size - 1;
        border = 4;
      }
    }

    if (!isCorner(row, col, size)) setStart = true;
  }

  return {
    startCoords: {row, col},
    border
  };
}

const isCorner = (row, col, size) => {
  return (
  (row === size - 1 && col === size - 1) ||
  (row === 0 && col === 0) || 
  (row === 0 && col === size - 1) ||
  (row === size - 1 && col === 0));
}

const makePath = (map, highways, { startCoords, border } ) => {
  let path = [];
  let row = startCoords.row;
  let col = startCoords.col;
  let dir = border;

  let currentRow = row;
  let currentCol = col;

  while (true) {
    for (let i = 0; i < 20; i++) {
      let coords = {};
      
      switch (dir) {
        case 1:
          coords = {row: row+i, col};
          currentRow = row+i;
          break;
        case 2:
          coords = {row: row-i, col};
          currentRow = row-i;
          break;
        case 3:
          coords = { row, col: col + i };
          currentCol = col + i;
          break;
        case 4:
          coords = { row, col: col - i };
          currentCol = col - i;
          break;
      }

      if (!hasCoords(highways, path, coords)) {
        if (inBounds(coords.row, coords.col, map.length)) {
          path.push(coords);
        } else {
          return (path.length > 99 ? path : null);
        }
      } else {
        return null;
      }
    }

    dir = changeDirection(dir);
    switch(dir) {
      case 1:
        row = currentRow + 1;
        col = currentCol;
        break;
      case 2: 
        row = currentRow - 1;
        col = currentCol;
        break;
      case 3:
        row = currentRow;
        col = currentCol + 1;
        break;
      case 4:
        row = currentRow;
        col = currentCol - 1;
        break;
    }
  }
}

const hasCoords = (highways, path, {row, col}) => {

  if (highways.some(el => el.row === row && el.col === col)) return true;
  if (path.some(el => el.row === row && el.col === col)) return true;

  return false;
}

const changeDirection = dir => {
  let newDir;
  switch (dir) {
    case 1:
      if (Math.random() < .6) {
        newDir = 1;
      } else if (randomBoolean()) {
        newDir = 3;
      } else {
        newDir = 4;
      }
      break;
    case 2:
      if (Math.random() < .6) {
        newDir = 2;
      } else if (randomBoolean()) {
        newDir = 3;
      } else {
        newDir = 4;
      }
      break;
    case 3:
      if (Math.random() < .6) {
        newDir = 3;
      } else if (randomBoolean()) {
        newDir = 1;
      } else {
        newDir = 2;
      }
      break;
    case 4:
      if (Math.random() < .6) {
        newDir = 4;
      } else if (randomBoolean()) {
        newDir = 1;
      } else {
        newDir = 2;
      }
      break;
  }

  return newDir;
};


const setBlocked = (map, blockRate) => {
  const MAX_BLOCKED = Math.floor(Math.pow(map.length, 2) * blockRate);
  let blocked = [];
  let blockCount = 0;
  while (blockCount != MAX_BLOCKED) {
    let row = randomInt(map.length);
    let col = randomInt(map.length);

    if(map[row][col] === '1' || map[row][col] === '2') {
      map[row][col] = '0';
      blocked.push({row: row, col: col})
      blockCount++;
    }
  }

  return blocked;
};

const createNodePoints = (nodeMap, minDist) => {
  let startRow = 0;
  let startCol = 0;
  let endRow = 0;
  let endCol = 0;
  while (!euclidDistance(startRow, startCol, endRow, endCol, minDist)) {
    startRow = randomInt(160);
    startCol = randomInt(160);
    // if (randomBoolean()) startRow += (nodeMap.length - 160);
    // if (randomBoolean()) startCol += (nodeMap.length - 160);
    endRow = randomInt(160);
    endCol = randomInt(160);
    // if (randomBoolean()) endRow += (nodeMap.length - 160);
    // if (randomBoolean()) endCol += (nodeMap.length - 160);
  }
  
  return { startNode: nodeMap[startRow][startCol],
           endNode: nodeMap[endRow][endCol],
  }
};

const createNodeMap = map => {
  let nodeMap = Array(160).fill().map(() => Array(160));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      nodeMap[i][j] = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](i, j, map[i][j]);
    }
  }

  for (let i = 0; i < nodeMap.length; i++) {
    for (let j = 0; j < nodeMap.length; j++) {
      nodeMap[i][j].addNeighbors(nodeMap);
    }
  }
  return nodeMap;
}

/***/ }),

/***/ "./src/js/node.js":
/*!************************!*\
  !*** ./src/js/node.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Node {
  constructor(row, col, type) {
    this.type = type;
    this.row = row;
    this.col = col;
    this.hVal = 0.0;
    this.gVal = 0.0;
    this.fVal = 0.0;
    this.neighbors = [];
    this.parent = undefined;
  }

  isEqual(node) {
    return ( this.type === node.type &&
              this.row === node.row &&
              this.col === node.col);
  }

  inBounds(row, col, map) {
    const MAX_SIZE = map.length;

    return ((row < MAX_SIZE) && (col < MAX_SIZE) && (row > -1) && (col > -1));
  }
  addNeighbors(nodeMap) {
    for (let i = this.row - 1 ; i < this.row + 2; i++) {
      for (let j = this.col - 1; j < this.col + 2; j++) {
        if (this.inBounds(i, j, nodeMap)) {
          if (nodeMap[i][j].type != '0') this.neighbors.push(nodeMap[i][j]);
        }
      }
    }
  }
  
  compareTo(node) {
    if (this.fVal < node.fVal) return -1;
    if (this.fVal > node.fVal) return 1;
    return 0;
  }


  travelCost(targetNode) {
    
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Node);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map