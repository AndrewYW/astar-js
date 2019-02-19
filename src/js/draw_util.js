export const fadeBlack = ctx => {

};

export const clearTerrain = ctx => {
  ctx.fillStyle = "#66CD00";
  ctx.fillRect(0, 0, 800, 800);
};

export const drawMap = (ctx, map, btn, btn2, btn3, btnText) => {
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

export const drawTerrain = (ctx, {row, col}, fillStyle) => {
  ctx.fillStyle = fillStyle;
  const x = row * 5
  const y = col * 5;

  ctx.fillRect( x, y, 5, 5 );
};

export const drawNode = (ctx, node) => {
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

export const drawPath = (ctx, node) => {

}

const drawPoints = (ctx, start, end) => {
  
  drawTerrain(ctx, {row: start.row, col: start.col}, "yellow");
  drawTerrain(ctx, {row: end.row, col: end.col}, "yellow");
  
}

