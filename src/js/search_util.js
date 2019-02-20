import PriorityQueue from './queue';
import { clearNode } from './draw_util';
class AStarSearch {
  constructor(startNode, endNode, blackctx) {
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
    // var startTime = Date.now();
    // // var updateTime = setInterval(function(){ 
    // //   document.getElementById("timer").innerHTML = Date.now() - startTime;
    // // }, 1);
    // this.fringe = new PriorityQueue();
    // var closed = [];

    // this.startNode.gVal = 0;
    // this.startNode.parent = this.startNode;

    // // debugger;
    // this.startNode.fVal = this.startNode.gVal + (this.startNode.hVal * weight);
    // this.fringe.enqueue(this.startNode);

    // while(!this.fringe.isEmpty()) {
    //   var currentNode = this.fringe.dequeue();

    //   if (currentNode.isEqual(this.endNode)) {
    //     debugger;
    //     this.time = Date.now() - startTime;
    // //     clearInterval(updateTime);
    //     return true;
    //   }
    //   clearNode(this.ctx, {row: currentNode.row, col: currentNode.col});
    //   if (!currentNode.isMemberOf(closed)) {
    //     closed.push(currentNode);
    //     this.size = closed.length;
    //     console.log(this.size);
    //   }
      
    //   currentNode.neighbors.forEach(neighbor => {
    //     // debugger;
    //     if (!neighbor.isMemberOf(closed)) {
    //       if (!this.fringe.includes(neighbor)){
    //         // debugger;
    //         neighbor.gVal = Number.MAX_SAFE_INTEGER;
    //         neighbor.parent = null;
    //       }
    //       this.updateNode(currentNode, neighbor, weight);
    //     }
    //   });
    // }
    // // clearInterval(updateTime);
    // debugger
    // return false;

    this.fringe = new PriorityQueue();
    var closed = [];

    this.startNode.gVal = 0;
    this.startNode.parent = this.startNode;
    this.startNode.fVal = this.startNode.gVal + (this.startNode.hVal * weight);
    this.fringe.enqueue(this.startNode);
    while (!this.fringe.isEmpty()) {
      var currentNode = this.fringe.dequeue();
      if (currentNode.isEqual(this.endNode)) {
        console.log("found target");
        return true;
      }

      closed.push(currentNode);
      // debugger;
      currentNode.neighbors.forEach(node => {
        if (!node.isMemberOf(closed)) {
          if (!this.fringe.includes(node)) {
            // debugger;
            node.gVal = Infinity;
            node.parent = null;
          }
          // debugger;
          this.updateNode(currentNode, node, weight);
        }
      });
    }

    console.log("target not found");
    return false;
  }

  updateNode(currentNode, neighbor, weight) {
    // if (currentNode.gVal + currentNode.travelCost(neighbor) < neighbor.gVal) {
    //   neighbor.gVal = currentNode.gVal + currentNode.travelCost(neighbor);
    //   if (neighbor.parent === null) neighbor.parent = currentNode;

    //   if ( this.fringe.includes(neighbor)) this.fringe.remove(neighbor);

    //   neighbor.fVal = neighbor.gVal + (neighbor.hVal * weight);
    //   // debugger
    //   this.fringe.enqueue(neighbor);


    // }

    if (currentNode.gVal + currentNode.travelCost(neighbor) < neighbor.gVal) {
      neighbor.gVal = currentNode.gVal + currentNode.travelCost(neighbor);
      neighbor.parent = currentNode;

      if(this.fringe.includes(neighbor)) this.fringe.remove(neighbor);

      neighbor.fVal = neighbor.gVal + (neighbor.hVal * weight);

      this.fringe.enqueue(neighbor);
    }
  }

}



export default AStarSearch;