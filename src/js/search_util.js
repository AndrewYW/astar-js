import PriorityQueue from './queue';
class AStarSearch {
  constructor(startNode, endNode, weight) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.weight = weight;
    this.size = 0;
    this.fringe;
    
  }

  solve() {
    var startTime = Date.now();
    var updateTime = setInterval(function(){ 
      document.getElementById("timer").innerHTML = Date.now() - startTime
    }, 1);
    this.fringe = new PriorityQueue();
    this.closed = [];

    this.startNode.gVal = 0;
    this.startNode.parent = this.startNode;

    this.startNode.fVal = this.startNode.gVal + (this.startNode.hVal * this.weight);
    this.fringe.enqueue(this.startNode);

    while(!this.fringe.isEmpty()) {
      currentNode = this.fringe.dequeue();

      if (currentNode.isEqual(this.endNode)) {
        clearInterval(updateTime);
        return true;
      }

      this.closed.push(currentNode);
      this.size = this.closed.length;

      currentNode.neighbors.forEach(neighbor => {
        if (!neighbor.isMemberOf(this.closed)) {
          if (!this.fringe.includes(neighbor)){
            neighbor.gVal = Number.MAX_SAFE_INTEGER;
            neighbor.parent = undefined;
          }

          updateNode(currentNode, neighbor);
        }
      });
    }
    clearInterval(updateTime);
    return false;
  }

  updateNode(currentNode, neighbor) {
    if (currentNode.gVal + currentNode.travelCost(neighbor) < neighbor.gVal) {
      neighbor.gVal = currentNode.gVal + currentNode.travelCost(neighbor);
      neighbor.parent = currentNode;

      if ( this.fringe.includes(neighbor)) this.fringe.remove(neighbor);

      neighbor.fVal = neighbor.gVal + (neighbor.hVal * this.weight);

      this.fringe.enqueue(neighbor);
    }
  }

}



export default AStarSearch;