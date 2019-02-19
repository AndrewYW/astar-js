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

  isMemberOf(array) {
    array.forEach(element => {
      if (this.isEqual) return true;
    });

    return false;
  }

  inBounds(row, col, map) {
    const MAX_SIZE = map.length;

    return ((row < MAX_SIZE) && (col < MAX_SIZE) && (row > -1) && (col > -1));
  }

  addNeighbors(nodeMap) {
    for (let i = this.row - 1 ; i < this.row + 2; i++) {
      for (let j = this.col - 1; j < this.col + 2; j++) {
        if (this.inBounds(i, j, nodeMap) && !(this.row === i && this.col === j)) {
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
    var straight;

    straight = (this.row === targetNode.row || this.col === targetNode.col) ? true : false;

    if (straight) {
      switch(this.type) {
        case '1':
          switch (targetNode.type) {
            case '1':
              return 1.0;
            case '2':
              return 1.5;
            case 'a':
              return 1.0;
            case 'b':
              return 1.5;
          }
          break;
        case '2':
          switch (targetNode.type) {
            case '1':
              return 1.5;
            case '2':
              return 2.0;
            case 'a':
              return 1.5;
            case 'b':
              return 2.0;
          }
          break;
        case 'a':
          switch (targetNode.type) {
            case '1':
              return 1.0;
            case '2':
              return 1.5;
            case 'a':
              return .25;
            case 'b':
              return .375;
          }
          break;
        case 'b':
          switch (targetNode.type) {
            case '1':
              return 1.5;
            case '2':
              return 2.0;
            case 'a':
              return .375;
            case 'b':
              return .25;
          }
          break;
      }
    } else {
      switch (this.type) {
        case '1':
        case 'a':
          switch (targetNode.type) {
            case '1':
            case 'a':
              return Math.sqrt(2);
            case '2':
            case 'b':
              return (Math.sqrt(2) + Math.sqrt(8)) / 2;
          }
          break;
        case '2':
        case 'b':
          switch (targetNode.type) {
            case '1':
            case 'a':
              return (Math.sqrt(2) + Math.sqrt(8)) / 2;
            case '2':
            case 'b':
              return Math.sqrt(8);
          }
          break;
      }
    }

    return 0;
  }
}

export default Node;