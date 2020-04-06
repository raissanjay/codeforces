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

    // triangleNumbers[44722] < 10^9 (max input given in problem)
    const MAX_INPUT_SIZE = 44722;
    const triangleNumbers = new Array(MAX_INPUT_SIZE);
    var sum = 0;

    for(var i = 0; i < MAX_INPUT_SIZE; i++){
        sum = sum + i;
        triangleNumbers[i] = sum;
    }

    function binarySearch(arr, searchVal){
        var low = 0;
        var high = arr.length - 1;

        while(low <= high) {
            var midpoint = low + Math.floor((high-low)/2);
            if(arr[midpoint] === searchVal){
                return midpoint;
            }
            else if(arr[midpoint] < searchVal){
                low = midpoint + 1;
            }
            else if(arr[midpoint] > searchVal){
                high = midpoint - 1;
            }
        }
        return -(low + 1);
    }

    function solution(n){
        // returns how deep in triangleNumbers array to search until
        var limit = Math.abs(binarySearch(triangleNumbers, n));

        for(var i = 1 ; i < limit; i++){
            var someIndex = binarySearch(triangleNumbers, n-triangleNumbers[i]);
            if(someIndex > 0) {
                print("YES");
                return;
            }
        }
        print("NO");
    }

    const n = readline();
    solution(parseInt(n));
}


