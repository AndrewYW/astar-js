class Node {
  constructor(row, col, type) {
    this.type = type;
    this.row = row;
    this.col = col;
    this.hVal = 0.0;
    this.gVal = 0.0;
    this.fVal = 0.0;
    this.neighbors = [];
    
  }

  coordinates() {
    return [this.row, this.col];
  }

  
}