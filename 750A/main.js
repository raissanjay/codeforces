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

    const timeTillParty = 240;
    function canAttendParty(timeToSolveProblems, minutesToGetToParty){
        return timeTillParty - minutesToGetToParty - timeToSolveProblems >= 0;

    }

    // returns 5 + 10 + ... + N
    function timeToSolveNProblems(N){
        return 5 * (N+1) * (N/2);
    }

    function solution(numberOfProblems, minutesToGetToParty){
        var startIndex = 0;
        var endIndex = numberOfProblems;

        while(startIndex < endIndex){
            var average = ((startIndex) + parseInt(endIndex))/2;
            var midpoint = Math.ceil(average);
            var timeToSolveProblems = timeToSolveNProblems(midpoint);

            if(canAttendParty(timeToSolveProblems, minutesToGetToParty, timeToSolveProblems)){
                // try to solve more problems
                startIndex = midpoint;

            }else {
                // try to solve less problems
                endIndex = Math.floor((startIndex + endIndex)/2);
            }
        }

        return startIndex;
    }

    const line1 = readline().split(" ");
    const numberOfProblems = line1[0];
    const minutesToGetToParty = line1[1];

    print(solution(numberOfProblems, minutesToGetToParty));
}


