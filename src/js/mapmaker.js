export const generateMap = () => {
  map = Array(160).fill().map(() => Array(160).fill('1'));
  setHards(map);
  setHighways(map);
  setBlocked(map);
  setNodes(map);
  return map;
}

const randomInt = ceiling => {
  return Math.floor(Math.random() * (ceiling+1));
}

const euclidDistance = (xRow, xCol, yRow, yCol) => {
  const a = Math.pow((xRow - yRow), 2);
  const b = Math.pow((xCol - yCol), 2);

  return !(Math.sqrt(a+b) < 100);
}

const inBounds = (row, col, size) => {
  return ((row > -1) && (row < size) && (col > -1) && (col < size));
}
const randomBoolean = () => {
  return (Math.random() < .5);
}

const setHards = map => {
  var count = 0;
  var hardCoordinates = [];
  while (count < 8) {
    var repeat = false;
    var row = randomInt(160);
    var col = randomInt(160);

    for (let i = 0; i < count; i++) {
      if (hardCoordinates.includes([row, col])) repeat = true;
    }

    if (!repeat) {
      hardCoordinates.push([row, col]);

      for (let i = -15; i < 16; i++){
        for(let j = -15; j < 16; j++){
          if(inBounds(row+i, col+j, 160) && randomBoolean()){
            map[row+i][col+j] = '2';
          }
        }
      }
    }
  }
};

const setHighways = map => {

};

const setBlocked = map => {

};

const setNodes = map => {

}