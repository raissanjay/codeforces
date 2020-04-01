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

    function solution(numberOfProblems, minutesToGetToParty){
        const totalTime = 240;
        var timeRemaning = totalTime - minutesToGetToParty;
        var problemsSolved = 0;

        while(timeRemaning - 5 * (problemsSolved + 1) >= 0){
            problemsSolved++;
            timeRemaning = timeRemaning - 5 * problemsSolved;

        }
        return Math.min(problemsSolved, numberOfProblems);
    }

    const line1 = readline().split(" ");
    const numberOfProblems = line1[0];
    const minutesToGetToParty = line1[1];

    print(solution(numberOfProblems, minutesToGetToParty));
}


