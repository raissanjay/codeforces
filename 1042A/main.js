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

    function getMaxValue(mostOccupiedBench, additionalPeopleComing){
        return mostOccupiedBench + additionalPeopleComing;

    }

    var numberOfBenches = parseInt(readline());
    var initialPeopleOnBench = 0;
    var additionalPeopleComing = parseInt(readline());
    var mostOccupiedBench = Number.NEGATIVE_INFINITY;


    for(var i = 0; i < numberOfBenches; i++){
        var initialPeopleOnIthBench = parseInt(readline());
        if(mostOccupiedBench < initialPeopleOnIthBench){
            mostOccupiedBench = initialPeopleOnIthBench;
        }
        initialPeopleOnBench += initialPeopleOnIthBench;
    }

    var totalNumberOfPeople = additionalPeopleComing + initialPeopleOnBench;
    var maxValue = getMaxValue(mostOccupiedBench, additionalPeopleComing);
    var minValue = null;

    if(additionalPeopleComing <= mostOccupiedBench * numberOfBenches - initialPeopleOnBench){
        minValue = mostOccupiedBench;
    }  else {
        minValue = Math.ceil(totalNumberOfPeople/numberOfBenches);
    }

    print(minValue + " " + maxValue);
}


