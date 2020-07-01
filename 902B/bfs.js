var graph = [
    [],
    [5, 2],
    [4, 3],
    [],
    [],
    [6],
    []
];



/**
 * @Tigran
 * There has to be better ways to have a queue in JS using an array but
 * not using array shift method
 *
 * -- Use offset instead
 *
 * You can use linked list or vector for a queue, but the best way would be a linked
 * list.
 *
 * With a double linked list, you can have pointer to both start and end to do all operations for
 * a stack and queue
 *
 */

function Queue(){
    this.length = 0;
    this.offset = 0;
    this.data = [];
}

Queue.prototype.pop = function(){
    // using var conflicts with window.top var but needed for support w/ codeforces
    var someTop = this.data[this.offset];
    this.offset++;
    this.length--;
    return someTop;
};

Queue.prototype.push = function(val){
    this.length++;
    this.data.push(val);
};

var someQueue = new Queue();
function bfs(node){
    someQueue.push(node);
    while(someQueue.length > 0){
        // grab current node
        var currentNode = someQueue.pop();

        // process current node
        console.log(currentNode);

        // add children to queue

        var children = graph[currentNode];
        children.forEach(function(child){
            someQueue.push(child);
        })
    }
}

bfs(1);

function bfs_wrong(node){
    // not needed because seen is only needed for graphs with cycles
    if(seen.has(node)){
        return;
    }

    // process node
    console.log(node);

    // add node as seen
    seen.add(node);

    // add children to queue
    var children = graph[node];

    children.forEach(function(child){
        queue.push(child);
    });

    /**
     * @Tigran
     * Don't think it's necessary to call BFS recursively
     *
     */
    while(queue.length > 0){
        var current = queue.pop();
        // shouldn't be calling bfs recursively. only dfs
        bfs(current);
    }
}