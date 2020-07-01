/**
 *
 *** Problem Notes ****
 *
 *  Max input size is 10^4. So n^2 -> (10^4)^2 = 10^8 so O(n^2) should be okay for 1 sec run time.
 *
 *  10^8 operations per 1 second
 *  10^7 operations per .1 second
 *  10^6 operations per .01 seconds
 *  10^5 operations per .001 seconds -> 1 ms
 *
 *  For test case 18:
 *      input size is 10^5 -> which means each O(N) operation should take 1ms
 *
 *      graph = getAdjacencyListFromInput(n, p); // O(n) + O(n) + O(n-1)
 *      currentColors = initializeCurrentColors(n+1); // O(n)
 *      addZeroToFrontOfArray(c); // O(n)
 *      bfs(rootNode); // O(n^2), but only does one iteration before everything is pointed O(n)
 *
 *      Estimated run time is O(n) + O(n) + O(n-1) + O(n) + O(n) + (n) = 6ms
 *      Actual run time is 12ms, so each O(n) true run time ~ 2 ms

 */

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


/**
 * This code with a recursive dfs takes only 18ms to run (see test.js).
 * I don't know why on codeforces it causes an error for input_failing.txt
 * I suspect its maximum stack size is exceeded which is causing time delay
 * I rewrote colorGraph method to use array as stack instead of call stack and all test cases pass
 **/
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

        /**
         * This is just a recursive dfs for some starting node, to change colors
         * Not used because I think max call stack being reached with some input
         * @param someNode
         * @param someColor
         */
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

        var stack = [];

        function colorGraphUsingStack(someNode, someColor){
            stack.push(someNode);

            while(stack.length > 0){
                var current = stack.pop();
                currentColors[current] = someColor; // colors current node
                var childNodes = graph[current];

                for(var i = childNodes.length - 1; i >= 0 ; i--){
                    var child = childNodes[i];
                    stack.push(child);
                }

            }
        }

        /**
         * This queue implementation is wrong and only works because I set queue = []
         * once there is a match found.
         *
         * If there is never a match, this code wouldn't work.
         *
         * Check bfs.js for proper implementation of queue
         *
         */
        var queueOffset = 0;
        queue.top = function(){
            var top = queue[queueOffset];
            queueOffset++;
            return top;
            //return queue.shift();
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
            if(colorsMatch(currentColors, endingColors)){
                queue = [];
                return;
            }

            // process current node
            colorToPaint = endingColors[someNode];

            if(currentColors[someNode] !== endingColors[someNode]){
                steps++;
                colorGraphUsingStack(someNode, colorToPaint);
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
        /**
         * @Tigran
         * There has to be a better way of creating an adjacency list from the input.
         *
         * Perhaps I shouldn't be using an adjacency list data structure or I am
         * over complicating this in some way.
         *
         */
        function getAdjacencyListFromInput(n, p){

            /**
             * Creates [[], ..., []] of size n
             * @param n
             * @returns {Array}
             */
            function createEmptyAdjacencyList(n){
                var adjancencyList = [];
                for(var i = 0; i < n; i++){
                    adjancencyList.push([]);
                }

                return adjancencyList;
            }

            /**
             * Creates array [2, 3, ..., n+1]
             * @param n
             * @returns {Array}
             */

            function createI(n){
                var i = [];
                for(var k = 0; k < n; k++){
                    i.push(k + 2);
                }
                return i;
            }

            debugger;

            var c = createEmptyAdjacencyList(n + 1); // [[], ..., []] of size n + 1 (where 0 index isn't used)
            var i = createI(n + 1); // [2, 3, ... n+1]

            for(var k = 0; k < n - 1; k++){
                var p_k = p[k]; // e.g. [1, 2, 2, 1, 5]
                var i_k = i[k]; // e.g. [2, 3, 4, 5, 6]
                c[p_k].push(i_k);
            }

            /**
             *  Above could also be this, but makes it harder to read
             *  */
            // for(var k = 0; k < n-1; k++){
            //     var p_k = p[k]; // e.g. [1, 2, 2, 1, 5]
            //     c[p_k].push(k+2);
            // }


            return c; // e.g. [[], [2, 5], [3, 4], [], [], [6]]
        }

        // currentColors = [0, 0, ..., 0] for size N
        function initializeCurrentColors(n){
            // can't use currentColors var name due to compilation issues in codeforces
            var someColors = new Array(n);
            for(var i=0; i < someColors.length; i++){
                someColors[i] = 0;
            }
            return someColors;
        }

        function addZeroToFrontOfArray(someArray){
            someArray.unshift(0);
        }

        graph = getAdjacencyListFromInput(n, p); // O(n) + O(n) + O(n-1)
        currentColors = initializeCurrentColors(n+1); // O(n)
        addZeroToFrontOfArray(c); // O(n)
        endingColors = c;


        bfs(rootNode); // O(n^2)
        ans = steps;
    }

    var ans = 0;

    const n = parseInt(readline());
    const p = readline().split(" ").map(Number);
    const c = readline().split(" ").map(Number);

    solution(n, p, c);
    print(ans);
}




