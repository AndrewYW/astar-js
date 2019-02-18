import * as DrawUtil from './draw_util';
import { generateMap, generateRandomMap } from './mapmaker';

export const SIZE = 800;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const random = document.getElementById("random-button")
  const create = document.getElementById("create-button")
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
      createRandomMap(ctx);
      random.innerHTML = "Create another map!"
      random.disabled = false;
  };

  create.onclick = function() {
    const centerCount = parseInt(hardOutput.innerHTML);
    const pathCount = parseInt(pathOutput.innerHTML);
    const blockRate = parseFloat(blockOutput.innerHTML / 100);
    const minDist = parseInt(distOutput.innerHTML);
    createMap(ctx, centerCount, pathCount, blockRate, minDist);
  }
  
  DrawUtil.clearTerrain(ctx);
  
});

function createRandomMap(ctx) {
  var map = generateRandomMap();
  DrawUtil.drawMap(ctx, map);
}

function createMap(ctx, centerCount, pathCount, blockRate, minDist) {
  var map = generateMap(centerCount, pathCount, blockRate, minDist);
  DrawUtil.drawMap(ctx, map);
}