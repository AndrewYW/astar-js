import * as DrawUtil from './draw_util';
import { generateMap } from './mapmaker';

export const SIZE = 800;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  


  //TEST
  window.ctx = ctx;
  window.generateMap = generateMap;

  // const mapObject = generateMap();
  window.clearTerrain = DrawUtil.clearTerrain;
  window.drawMap = DrawUtil.drawMap;

  // ctx.fillStyle = "#66cD00";
  // ctx.fillRect(0, 0, 800, 800);

  const map = generateMap();
  console.log(map)
  // debugger;

  DrawUtil.drawMap(ctx, map);
});