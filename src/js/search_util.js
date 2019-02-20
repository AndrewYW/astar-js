import PriorityQueue from './queue';
import { clearNode } from './draw_util';
class AStarSearch {
  constructor(startNode, endNode, nodeMap, blackctx) {
    this.nodeMap = nodeMap;
    this.startNode = startNode;
    this.endNode = endNode;
    this.ctx = blackctx;
    this.size = 0;
    this.fringe;
    this.time;
    this.solve = this.solve.bind(this);
    this.updateNode = this.updateNode.bind(this);
  }

  bfs() {
    if (this.startNode.visited) this.resetVisited();
    
    var startTime = Date.now();
    var queue = [];
    this.startNode.visited = true;

    var currentNode = this.startNode;
    clearNode(this.ctx, {
      row: currentNode.row,
      col: currentNode.col
    });

    currentNode.neighbors.forEach(node => {
      node.parent = currentNode;
      queue.push(node);
    });
    while (queue.length != 0) {
      currentNode = queue.shift();
      if (!currentNode.visited){
        currentNode.visited = true;
        this.size += 1;
        clearNode(this.ctx, { row: currentNode.row, col: currentNode.col })
        if (currentNode.isEqual(this.endNode)) {
          this.time = Date.now() - startTime;
          return true;
        } else {
          currentNode.neighbors.forEach(node => {

              if(node.parent === null) node.parent = currentNode;
              if(!node.visited) queue.push(node);
          });
        }
      }
    }
    debugger;
    return false;
  }
  solve(weight) {
    
    var startTime = Date.now()
    this.fringe = new PriorityQueue();
    var closed = [];

    this.startNode.gVal = 0;
    this.startNode.parent = this.startNode;
    this.startNode.fVal = this.startNode.gVal + (this.startNode.hVal * weight);
    this.fringe.enqueue(this.startNode);
    while (!this.fringe.isEmpty()) {
      var currentNode = this.fringe.dequeue();
      clearNode(this.ctx, { row: currentNode.row, col: currentNode.col });
      if (currentNode.isEqual(this.endNode)) {
        console.log("found target");
        this.time = Date.now() - startTime;
        this.size = closed.length;
        return true;
      }

      closed.push(currentNode);
      currentNode.neighbors.forEach(node => {
        if (!node.isMemberOf(closed)) {
          if (!this.fringe.includes(node)) {
            node.gVal = Infinity;
            node.parent = null;
          }
          this.updateNode(currentNode, node, weight);
        }
      });
    }

    console.log("target not found");
    return false;
  }

  updateNode(currentNode, neighbor, weight) {

    if (currentNode.gVal + currentNode.travelCost(neighbor) < neighbor.gVal) {
      neighbor.gVal = currentNode.gVal + currentNode.travelCost(neighbor);
      neighbor.parent = currentNode;

      if(this.fringe.includes(neighbor)) this.fringe.remove(neighbor);

      neighbor.fVal = neighbor.gVal + (neighbor.hVal * weight);

      this.fringe.enqueue(neighbor);
    }
  }

  resetVisited() {
    this.startNode.visited = false;
    this.endNode.visited = false;
    
    for (let i = 0; i < this.nodeMap.length; i++) {
      for (let j = 0; j < this.nodeMap.length; j++) {
        this.nodeMap[i][j].visited = false;
      }
    }
  }
}



export default AStarSearch;