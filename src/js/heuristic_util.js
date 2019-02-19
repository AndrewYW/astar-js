//Euclidean and Euclidean squared distance
const euclidean = (startNode, endNode, heuristic) => {
  const a = Math.pow(startNode.row - endNode.row, 2);
  const b = Math.pow(startNode.col - endNode.col, 2);

  return (heuristic === "euclidean" ? Math.sqrt(a+b) : a + b);
}

//Manhattan distance
const manhattan = (startNode, endNode) => {
  const x = startNode.row - endNode.row;
  const y = startNode.col - endNode.col;

  return x + y;
}

// Chebyshev and Octile heuristics
const diagonal = (startNode, endNode, heuristic) => {
  const cost = (heuristic === "chebyshev" ? 1 : Math.sqrt(2));

  const x = Math.abs(startNode.row - endNode.row);
  const y = Math.abs(startNode.col - endNode.col);

  return (x + y) + ((cost-2) * Math.min(x, y));
}

export const setHVals = (nodeMap, endNode, heuristic) => {
  for (let i = 0; i < nodeMap.length; i++) {
    for (let j = 0; j < nodeMap.length; j++) {
      var node = nodeMap[i][j];

      switch (heuristic) {
        case 'euclidean':
        case 'euclidean-squared':
          node.hVal = euclidean(node, endNode, heuristic);
          break;
        case 'manhattan':
          node.hVal = manhattan(node, endNode);
          break;
        case 'chebyshev':
        case 'octile':
          node.hVal = diagonal(node, endNode, heuristic);
          break;
        default:
          console.log("No heuristic selected");
      }
    }
  }
}