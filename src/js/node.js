class Node {
  constructor(row, col, type) {
    this.type = type;
    this.row = row;
    this.col = col;
    this.hVal;
    this.gVal;
    this.fVal;
    this.neighbors = [];
    this.visited = false;
    this.parent = null;
  }

  isEqual(node) {
    return ( this.type === node.type &&
              this.row === node.row &&
              this.col === node.col);
  }

  isMemberOf(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].row === this.row && array[i].col === this.col) return true;
    }
    return false;

    //return true would break the forEach iterator but not return true for the function
    // var self = this;
    // array.forEach(element => {
    //   if (self.row === element.row && self.col === element.col) return true;
    // });

    // return false;
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
    var result = 0;
    straight = (this.row === targetNode.row || this.col === targetNode.col) ? true : false;

    if (straight) {
      switch(this.type) {
        case '1':
          switch (targetNode.type) {
            case '1':
              result = 1.0;
              break;
            case '2':
              result = 1.5;
              break;
            case 'a':
              result = 1.0;
              break;
            case 'b':
              result = 1.5;
              break;
          }
          break;
        case '2':
          switch (targetNode.type) {
            case '1':
              result = 1.5;
              break;
            case '2':
              result = 2.0;
              break;
            case 'a':
              result = 1.5;
              break;
            case 'b':
              result = 2.0;
              break;
          }
          break;
        case 'a':
          switch (targetNode.type) {
            case '1':
              result = 1.0;
              break;
            case '2':
              result = 1.5;
              break;
            case 'a':
              result = .25;
              break;
            case 'b':
              result = .375;
              break;
          }
          break;
        case 'b':
          switch (targetNode.type) {
            case '1':
              result = 1.5;
              break;
            case '2':
              result = 2.0;
              break;
            case 'a':
              result = .375;
              break;
            case 'b':
              result = .25;
              break;
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
              result = Math.sqrt(2);
              break;
            case '2':
            case 'b':
              result = (Math.sqrt(2) + Math.sqrt(8)) / 2;
              break;
          }
          break;
        case '2':
        case 'b':
          switch (targetNode.type) {
            case '1':
            case 'a':
              result = (Math.sqrt(2) + Math.sqrt(8)) / 2;
              break;
            case '2':
            case 'b':
              result = Math.sqrt(8);
              break;
          }
          break;
      }
    }

    return result;
  }
}

export default Node;