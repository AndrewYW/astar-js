class Node {
  constructor(row, col, type) {
    this.type = type;
    this.row = row;
    this.col = col;
    this.hVal = 0.0;
    this.gVal = 0.0;
    this.fVal = 0.0;
    this.neighbors = [];
    this.parent = undefined;
  }

  isEqual(node) {
    return ( this.type === node.type &&
              this.row === node.row &&
              this.col === node.col);
  }

  inBounds(row, col, map) {
    const MAX_SIZE = map.length;

    return ((row < MAX_SIZE) && (col < MAX_SIZE) && (row > -1) && (col > -1));
  }
  addNeighbors(nodeMap) {
    for (let i = this.row - 1 ; i < this.row + 2; i++) {
      for (let j = this.col - 1; j < this.col + 2; j++) {
        if (this.inBounds(i, j, nodeMap)) {
          if (nodeMap[i][j].type != '0') this.neighbors.push(nodeMap[i][j]);
        }
      }
    }
  }
  
  compareTo(node) {
    if (this.fVal < node.fVal) return -1;
    if (this.fVal > node.fVal) return 1;
    return 0;
  }


  travelCost(targetNode) {
    
  }
}

export default Node;