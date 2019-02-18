import * as DrawUtil from './draw_util';
import { generateMap } from './mapmaker';

export const SIZE = 800;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const random = document.getElementById("create-button")
  var slider = document.getElementById("slider");
  var output = document.getElementById("slider-output");
  output.innerHTML = slider.value;


  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  slider.oninput = function() {
    output.innerHTML = this.value;
  }
  random.onclick = function() { 
    createRandomMap(ctx); 
    random.innerHTML = "Create another map!"
  };
  
  DrawUtil.clearTerrain(ctx);
  
});

function createRandomMap(ctx) {
  const map = generateMap();
  DrawUtil.drawMap(ctx, map);
}