# A* Pathfinder

## Background, Overview

Graph based search algorithms are used extensively in grid or graph based games for pathfinding, such as the Civilization series. Certain search algorithms, such as Breadth First Search, are incredibly popular introductory algorithms that can have added layers of complexity for specific circumstances.  In an environment where a square node graph (i.e: Each node has 8 neighbors) has movement costs associated with different terrains, the A* search family (BFS, Dijkstra's Algorithm, A*) generally is used more than other search families.

Heuristic Pathfinder is a visualizer of several heuristic functions applied to the A* search family for randomly generated or user designed terrain inspired by maps found in the Civilization games. Users will be able to select which search algorithm to implement, which heuristic to apply, how much weight to apply to that heuristic, and compare the time/space complexity of results with each algorithm.


## Functionality, MVP

+ Users can choose to randomly or manually generate terrain based within specific guidelines
+ Users can specify which heuristic or algorithm to apply, with specific weighting also determinable when applicable.
+ The grid will render the result paths on the terrain, and show time/space analysis of each used option.

## Technologies

+ Vanilla JS for backend logic, structure
+ Canvas for rendering and manipulating DOM output
+ Webpack to bundle and serve scripts as needed

#### File Structure

+ Models
  + map.js: File holding data regarding the grid (start and end nodes, grid 2d array, etc.)
  + node.js (object): custom nodes for each grid position. Includes data necessary for algorithms
  + queue.js: Custom implementation of a priority queue, necessary for A* search.
  + index.js: Webpack entry file.
  + search_util.js: File containing search algorithm functions.
  + heuristic_util.js: File containing functions for setting heuristic values.
  + draw_util.js: Canvas rendering functions.

## Implementation Timeline

+ Day 1
  + Webpack and file structure setup
  + Refactor structure from old JavaFX MVC framework
  + Create basic logic for generating graphs, rendering
+ Day 2
  + Implement user entry for graph generation
  + Create search algorithm structure
    + Search algorithms: Breadth first search, Dijkstra's, Weighted A*
    + Heuristics: Euclidean Distance, Manhattan Distance, Chebyshev Distance, Octile Distance, Euclidean squared distance
    + Add user selection for algorithm/heuristic
    
+ Day 3
  + Adding extraneous links:
    + Github, Linkedin, etc
  + Styling:
    + Rendering options for graph - real time path searching/making, overlaying paths

+ Day 4
  + Additional styling as necessary
  + Filling in information about each algorithm, maybe some visual depictions

## Bonuses

  + Implementing additional algorithms
    + Sequential heuristics, Jump point search
  + [Fancy styling options](https://bost.ocks.org/mike/algorithms/) if time permits