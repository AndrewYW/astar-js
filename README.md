# A* Pathfinder

### [View live](https://www.andrewyw.io/astar-js)

## Background

Graph based search algorithms are used extensively in grid or graph based games for pathfinding, such as the Civilization series. Certain search algorithms, such as Breadth First Search, are incredibly popular introductory algorithms that can have added layers of complexity for specific circumstances.  In an environment where a square node graph (i.e: Each node has 8 neighbors) has movement costs associated with different terrains, the A* search family (BFS, Dijkstra's Algorithm, A*) generally is used more than other search families.

A* Pathfinder is a visualizer of several heuristic functions applied to the A* search family for randomly generated or user designed terrain inspired by maps found in the Civilization games. Users can select an algorithm out of Breadth First Search, Uniform Cost Search (A* with heuristic weight of 0), or A* Search. If the user selects A* Search, then an admissible heuristic function (an 'informed' guess about the distance from one point to the other than is admissible, or never overestimates the cost required to reach) must be selected with a given weight. Heuristic functions implemented are Euclidean, Euclidean Squared, Chebyshev, Octile, and Manhattan.

## Technology

Pathfinder is a Javascript only project, using Canvas and HTML/CSS for display elements, ES6 style syntax and file structure, and Webpack for bundling the files.
The main JS files are:

+ `draw_util.js`
+ `heuristic_util.js`
+ `map.js`
+ `node.js`
+ `queue.js`
+ `astar.js`

All canvas rendering is done through functions in `draw_util.js`.

`heuristic_util.js` includes functions to calculate and assign heuristic function values to nodes across a map. This util is used right before running a search algorithm.

`Map` objects are generated by taking in either user input or randomly. Each map has several features added to an empty map successively:

+ Mountains, which are 32x32 grids where each tile has a 50% chance of having a double travel cost in any direction.
+ Highways, which reduce the cost of travel by 4x if moving horizontally or vertically between two highway tiles. They can only propogate in non diagonal directions.
+ Blocks, which are untraversable tiles. The positioning of blocks is entirely random, but they cannot cover a highway tile.
+ Endpoints, the start and end tile for a given path. Both are generated randomly from the free , but the minimum euclidean distance between the two can be set.

This data is stored as a discretized 2d array, with different characters representing each terrain type. It is then converted into a Node map.

`Node` objects store the information necessary to solving a map. They contain keys for coordinates, type, neighbors, and values used by A* search. These are:

+ `hVal`: The heuristic value calculated using a given heuristic function, the current node, and the target node.
+ `gVal`: A value used to ensure comparison of distances between nodes. On initialization the `gVal` of every node is set to infinity, which ensures comparison.
+ `fVal`: The estimate of the distance to the goal: `fVal = gVal + (hVal * weight)`

`queue.js` is a custom implementation of a Priority Queue, a self-sorting queue that calculates position based on a 'priority' value. For the pathfinder, the priority used is a Node's `fVal`.

The actual algorithms are implemented using an `AStarSearch` class, which takes in `Map` Objects to parse data and find paths. The two main functions, `bfs` and `solve`, implement BFS and A* search respectively. Additionally, there is an `updateNode` helper for `solve`, which sets calculated values for an individual node. Upon completion of a path, the function will return true, with paths found through a node's `parent` key acting as a linked list.


## Search algorithm implementations

### Breadth-First search

```javascript
bfs() {
  if (this.startNode.visited) this.resetVisited();
  
  let startTime = Date.now();
  let queue = [];
  this.startNode.visited = true;

  let currentNode = this.startNode;
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
  return false;
}
```

### A* and Uniform Cost Search

```javascript
solve(weight) {
    
  let startTime = Date.now();
  this.fringe = new PriorityQueue();
  let closed = [];

  this.startNode.gVal = 0;
  this.startNode.parent = this.startNode;
  this.startNode.fVal = this.startNode.gVal + (this.startNode.hVal * weight);
  this.fringe.enqueue(this.startNode);
  while (!this.fringe.isEmpty()) {
    let currentNode = this.fringe.dequeue();
    clearNode(this.ctx, { row: currentNode.row, col: currentNode.col });
    if (currentNode.isEqual(this.endNode)) {
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
```

### Additional info

[Introduction to A* Search by Red Blob Games](https://www.redblobgames.com/pathfinding/a-star/introduction.html)