//Euclidean and Euclidean squared distance
export const euclidean = (start_node, end_node, heuristic) => {
  const a = Math.pow(start_node.row - end_node.row, 2);
  const b = Math.pow(start_node.col - end_node.col, 2);

  heuristic === "euclidean" ? start_node.hVal = Math.sqrt(a+b) : start_node.hVal = a + b;
}

//Manhattan distance
export const manhattan = (start_node, end_node) => {
  const x = start_node.row - end_node.row;
  const y = start_node.col - end_node.col;

  start_node.hVal = x + y;
}

// Chebyshev and Octile heuristics
export const diagonal = (start_node, end_node, heuristic) => {
  const cost = (heuristic === "chebyshev" ? 1 : Math.sqrt(2));

  const x = Math.abs(start_node.row - end_node.row);
  const y = Math.abs(start_node.col - end_node.col);

  start_node.hVal = (x + y) + ((cost-2) * Math.min(x, y));
}