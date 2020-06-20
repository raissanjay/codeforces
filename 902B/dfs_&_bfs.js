/**
 * Helper code for dfs in JS
 * @type {*[]}
 */
let someGraph = [[], [2], [3, 4], [4], [1]]; // This is an adjacency list
let visited = new Set();

function dfs(someNode){
    if(visited.has(someNode)){
        return;
    }

    /* mark node as visited */
    visited.add(someNode);

    /* process node */
    console.log(someNode);

    /* process children */
    let children = someGraph[someNode];
    for(var i = 0; i < children.length; i++){
        let child = children[i];
        dfs(child);
    }
}

// dfs(1);

/**
 * Helper code for bfs in JS
 * @type {*[]}
 */

let someOtherGraph = [[], [2, 3], [4, 5], [6, 7], [], [], [], []]; // This is an adjacency list
let someOtherVisited = new Set();

let queue = [];

/**
 *  This operation can go from O(N) to ammortized constant time using offset
 *  That keeps reference to top & cuts array in half once offset reaches half of array size
 *  (Only requires a couple of lines of code)
 *
 *  Didn't implement since wouldn't remember to do so in coding interview
 *  http://code.iamkate.com/javascript/queues/
 *  */
queue.pop = function(){
    return queue.shift();
};

function bfs(someNode){
    if(someOtherVisited.has(someNode)){
        return;
    }

    /* mark node as visited */
    someOtherVisited.add(someNode);

    /* process node */
    console.log(someNode);

    let children = someOtherGraph[someNode];

    for(var i = 0; i < children.length; i++){
        let someChild = children[i];
        queue.push(someChild);
    }

    while(queue.length > 0){
        let someNode = queue.pop();
        bfs(someNode)
    }
}

// bfs(1);