
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node) { //push
    var contain = false;

    for (let i = 0; i < this.queue.length; i++){
      if (this.queue[i].fVal > node.fVal) {
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
    var i = -1;
    for(let j = 0; j < this.queue.length; j++){
      if (this.queue[j].isEqual(node)) i = j;
    }
    if (i > -1) this.queue.splice(i, 1);
  }

  isEmpty() {
    return (this.queue.length === 0);
  }


  includes(node) {
    return (this.queue.some(ele => (ele.isEqual(node))))
  }

}

export default PriorityQueue;