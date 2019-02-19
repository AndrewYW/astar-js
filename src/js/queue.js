
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node) { //push
    var contain = false;

    for (let i = 0; i < this.queue.length; i++){
      if (this.queue[i].compareTo(node) === 1) {
        this.queue.splice(i, 0, node);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.queue.push(node);
    }
  }

  //removes first element, returns undefined if empty
  dequeue() {
    return this.queue.shift();
  }

  remove(node) {
    var i = this.queue.indexOf(node);
    if (i > -1) this.queue.splice(i, 1);
  }

  isEmpty() {
    return (this.queue.length === 0);
  }

  peek() {
    return this.queue[0];
  }

  includes(node) {
    if (this.queue.some(ele => (ele.isEqual(node)))) return true;
    return false;
  }

}

export default PriorityQueue;