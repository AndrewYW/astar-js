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
  let slider = document.getElementById("slider");
  let output = document.getElementById("slider-output");
  let pathSlider = document.getElementById("path-slider");
  let pathOutput = document.getElementById("path-output");
  let hardSlider = document.getElementById("hard-slider");
  let hardOutput = document.getElementById("hard-output");
  let blockSlider = document.getElementById("block-slider");
  let blockOutput = document.getElementById("block-output");
  let distSlider = document.getElementById("dist-slider");
  let distOutput = document.getElementById("dist-output");
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

  let map;
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

  let count = 0;
  solve.onclick = function() { 
    
    DrawUtil.fillBlack(ctx2);
    solveMap(solve, map, output, count, ctx, ctx2);
    count++;
  };

  
  
});

function swapZIndex(canvas, canvas2) {
  canvas2.style.zIndex = [canvas.style.zIndex, canvas.style.zIndex = canvas2.style.zIndex][0];
}

function createRandomMap(ctx, btn, btn2, btn3, btnText) {
  let map = generateRandomMap();
  DrawUtil.drawMap(ctx, map, btn, btn2, btn3, btnText);
  
  return map;
}

function createMap(ctx, centerCount, pathCount, blockRate, minDist, btn, btn2, btn3, btnText) {
  let map = generateMap(centerCount, pathCount, blockRate, minDist);
  DrawUtil.drawMap(ctx, map, btn, btn2, btn3, btnText);

  return map;
}

function solveMap(btn, map, output, count, ctx, blackctx) {
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
        
        let aStar = new AStar(map.startNode, map.endNode, map.nodeMap, blackctx);
        if (alg === "astar"){
          setHVals(map.nodeMap, map.endNode, heu);
          const weight = parseFloat(output.innerHTML);
          if (aStar.solve(weight)){
            setTimeElapsed(aStar.time);
            setCoverage(aStar.size);
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode, count);
            btn.innerHTML = "Solve!";
          } 
        } else if (alg === "bfs"){  //who cares about weight here 
          if (aStar.bfs()){
            setTimeElapsed(aStar.time);
            setCoverage(aStar.size);
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode, count);
            btn.innerHTML = "Solve!";
          }
        } else if (alg === "uniform") { //weight = 0
          if (aStar.solve(0)){
            setTimeElapsed(aStar.time);
            setCoverage(aStar.size);
            DrawUtil.drawPath(ctx, aStar.startNode, aStar.endNode, count);
            btn.innerHTML = "Solve!";
          }
        }
      }
    }
    console.log(alg);
    console.log(heu);
  }
  
}

function setTimeElapsed(time) {
  document.getElementById("timer").innerHTML = time;
};

function setCoverage(num) {
  document.getElementById("size-count").innerHTML = num;
  document.getElementById("size-percent").innerHTML = (num / 25600 * 100).toFixed(3);

}