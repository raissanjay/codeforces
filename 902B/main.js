'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });

    main();
});

function readline() {
    return inputString[currentLine++];
}

function print(x) {
    console.log(x);  // with auto '\n' (newline)
}

function printSameLine(x) {
    process.stdout.write(x);
}

// Make a Snippet for the code above this and then write your logic in main();



function main(){
    function solution(n, p, c){
        var graph = [];
        var rootNode = 1;
        var visited = new Set();
        var currentNode = 1;
        var queue = [];
        var currentColors = []; // [0, 0, 0, ..., 0]
        var endingColors = [];
        var steps = 0;
        var colorToPaint = "";

        // var graph = [
        // 	[],
        // 	[2, 5],
        // 	[4, 3],
        // 	[],
        // 	[],
        // 	[6],
        // 	[]
        // ];

        function colorGraph(someNode, someColor){
            if(visited.has(someNode)){
                return;
            }

            currentColors[someNode] = someColor;
            visited.add(someNode);

            var childNodes = graph[someNode];

            if(!childNodes){
                return;
            }

            for(var i = 0; i < childNodes.length; i++){
                var childNode = childNodes[i];
                colorGraph(childNode, someColor);
            }
        }

        // better way to do this with offset to prevent O(N) top operation
        queue.top = function(){
            return queue.shift();
        };

        // This operation is O(n), where n is the number of verticies
        function colorsMatch(currentColors, endingColors){
            for(var i = 0; i < endingColors.length; i++){
                if(currentColors[i] !== endingColors[i]){
                    return false;
                }
            }
            return true;
        }

        function bfs(someNode){
            debugger;
            if(colorsMatch(currentColors, endingColors)){
                queue = [];
                return;
            }

            // process current node
            colorToPaint = endingColors[someNode];

            if(currentColors[someNode] !== endingColors[someNode]){
                steps++;
                colorGraph(someNode, colorToPaint);
                visited = new Set();
            }

            // get next nodes to process
            var childNodes = graph[someNode];

            if(!childNodes){
                return;
            }

            for(var i = 0; i < childNodes.length; i++){
                var childNode = childNodes[i];
                queue.push(childNode);
            }

            while(queue.length > 0){
                var nextNode = queue.top();
                bfs(nextNode);
            }
        }


        /* A bunch of code needed just to map input into adjacency list */
        function getAdjacencyListFromInput(n, p){

            function createEmptyAdjacencyList(n){
                var adjancencyList = [];
                for(var i = 0; i < n; i++){
                    adjancencyList.push([]);
                }

                return adjancencyList;
            }

            function createI(n){
                var i = [];
                for(var k = 0; k < n; k++){
                    i.push(k + 2);
                }
                return i;
            }

            var c = createEmptyAdjacencyList(n);
            var i = createI(n);

            for(var k = 0; k < n-1; k++){
                var p_k = p[k];
                var i_k = i[k];
                c[p_k].push(i_k);
            }

            return c;
        }

        function initializeCurrentColors(n){
            currentColors = new Array(n);
            for(var i=0; i < currentColors.length; i++){
                currentColors[i] = 0;
            }
        }

        graph = getAdjacencyListFromInput(n, p);
        initializeCurrentColors(n+1);
        c.unshift(0);
        endingColors = c;
        bfs(rootNode);
        ans = steps;
    }

    var ans = 0;

    const n = parseInt(readline());
    const p = readline().split(" ").map(Number);
    const c = readline().split(" ").map(Number);

    solution(n, p, c);
    print(ans);
}




