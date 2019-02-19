import PriorityQueue from './queue';
class AStarSearch {
  constructor(startNode, endNode, weight) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.weight = weight;
    this.fringe_size = 0;
    this.fringe = new PriorityQueue();
  }

  solve() {

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