class Node {
  constructor(row, col, type) {
    this.type = type;
    this.row = row;
    this.col = col;
  }

  coordinates() {
    return [this.row, this.col];
  }

  
}