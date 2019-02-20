import Node from './node';

export const generateMap = (centerCount, pathCount, blockRate, minDist) => {
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

export const generateRandomMap = () => {
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
  let count = 0;
  let centers = [];
  let hardCoordinates = [];
  while (count < centerCount) {
    let repeat = false;
    let row = randomInt(160);
    let col = randomInt(160);

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
  let highways = [];
  let tries = 0;
  let paths = 0;

  while(paths < pathCount) {
    if (tries === 100000) {
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

const isBlocked = (x, y, nodeMap) => {
  return (nodeMap[x][y].type === '0');
}
const createNodePoints = (nodeMap, minDist) => {
  let startRow = 0;
  let startCol = 0;
  let endRow = 0;
  let endCol = 0;
  while (!euclidDistance(startRow, startCol, endRow, endCol, minDist) || (isBlocked(startRow, startCol, nodeMap) || isBlocked(endRow, endCol, nodeMap))) {
    startRow = randomInt(160);
    startCol = randomInt(160);
    endRow = randomInt(160);
    endCol = randomInt(160);

  }
  
  return { startNode: nodeMap[startRow][startCol],
           endNode: nodeMap[endRow][endCol],
  }
};

const createNodeMap = map => {
  let nodeMap = Array(160).fill().map(() => Array(160));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      nodeMap[i][j] = new Node(i, j, map[i][j]);
    }
  }

  for (let i = 0; i < nodeMap.length; i++) {
    for (let j = 0; j < nodeMap.length; j++) {
      nodeMap[i][j].addNeighbors(nodeMap);
    }
  }
  return nodeMap;
}
