var graph = [
    [],
    [5, 2],
    [4, 3],
    [],
    [],
    [6],
    []
];

var seen = new Set();

var queue = [];

/**
 * @Tigran
 * There has to be better ways to have a queue in JS using an array but
 * not using array shift method
 *
 */
queue.pop = function(){
    return this.shift();
};

function bfs(node){
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
        bfs(current);
    }
}