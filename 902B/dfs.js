/**
 * @Tigran
 * Have Tigran review this
 *
 */
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

function dfs(node){
    if(seen.has(node)){
        return;
    }

    // process node
    console.log(node);
    seen.add(node);

    // get children
    var children = graph[node];
    children.forEach(function(child){
        dfs(child);
    });
}

dfs(1);