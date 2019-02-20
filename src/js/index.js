import * as DrawUtil from './draw_util';
import { generateMap, generateRandomMap } from './mapmaker';
import AStar from './search_util';
import { setHVals } from './heuristic_util';

export const SIZE = 800;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const canvas2 = document.getElementById("canvas2");
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
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  pathOutput.innerHTML = pathSlider.value;
  hardOutput.innerHTML = hardSlider.value;
  blockOutput.innerHTML = blockSlider.value;
  distOutput.innerHTML = distSlider.value;
  output.innerHTML = slider.value;

  slider.oninput = function() { output.innerHTML = this.value; }
  pathSlider.oninput = function() { pathOutput.innerHTML = this.value; }
  blockSlider.oninput = function() { blockOutput.innerHTML = this.value; }
  hardSlider.oninput = function() { hardOutput.innerHTML = this.value; }
  distSlider.oninput = function() { distOutput.innerHTML = this.value; }

  canvas.style.zIndex = 1;
  canvas2.style.zIndex = -1;
  canvas.onclick = function () {
    swapZIndex(canvas, canvas2)
  };
  canvas2.onclick = function () {
    swapZIndex(canvas2, canvas)
  };

  DrawUtil.clearTerrain(ctx);
  DrawUtil.fillBlack(ctx2);

  var map;
  random.onclick = function() { 
      random.disabled = true;
      create.disabled = true;
      solve.disabled = true;
      random.innerHTML = "Creating...";
      map = createRandomMap(ctx, random, create, solve, "Create random map!");
      DrawUtil.fillBlack(ctx2);
      console.log(map);
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
    map = createMap(ctx, centerCount, pathCount, blockRate, minDist, create, random, solve, "Create Map!");
    DrawUtil.fillBlack(ctx2);
    console.log(map);
  }

  solve.onclick = function() { solveMap(solve, map, output, ctx, ctx2) };

  
  
});

function swapZIndex(canvas, canvas2) {
  canvas2.style.zIndex = [canvas.style.zIndex, canvas.style.zIndex = canvas2.style.zIndex][0];
}

function createRandomMap(ctx, btn, btn2, btn3, btnText) {
  var map = generateRandomMap();
  DrawUtil.drawMap(ctx, map, btn, btn2, btn3, btnText);
  
  return map;
}

function createMap(ctx, centerCount, pathCount, blockRate, minDist, btn, btn2, btn3, btnText) {
  var map = generateMap(centerCount, pathCount, blockRate, minDist);
  DrawUtil.drawMap(ctx, map, btn, btn2, btn3, btnText);

  return map;
}

function solveMap(btn, map, output, ctx, blackctx) {
  if(typeof map === 'undefined') {
    btn.innerHTML = "Create map first!"
  } else {
    btn.innerHTML = "Solve!";
    const alg = document.getElementById("algorithms").value;
    const heu = document.getElementById("heuristics").value;
    
  
    if(alg === "bloop") {
      btn.innerHTML = "Select an algorithm!";
    } else {
      if (heu === "blorp" && alg === "astar") {
        btn.innerHTML = "Select a heuristic!";
      } else {
        btn.innerHTML = "Solving...";
        
        var aStar = new AStar(map.startNode, map.endNode, blackctx);
        if (alg === "astar"){
          setHVals(map.nodeMap, map.endNode, heu);
          const weight = parseFloat(output.innerHTML);
          if (aStar.solve(weight)){
            debugger;
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode);
          } 
        } else if (alg === "bfs"){  //who cares about weight here 
          if (aStar.bfs()){
            setTimeElapsed(aStar.time);
            setCoverage(aStar.size);
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode);
            btn.innerHTML = "Solve!";
          }
        } else if (alg === "uniform") { //weight = 0
          if (aStar.solve(0)){
            debugger;
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode);
          }
        }
      }
    }
    console.log(alg);
    console.log(heu);
    // console.log(weight);

  }
  
}

function setTimeElapsed(time) {
  document.getElementById("timer").innerHTML = time;
};

function setCoverage(num) {
  document.getElementById("size-count").innerHTML = num;
  document.getElementById("size-percent").innerHTML = (num / 25600 * 100).toFixed(3);

}