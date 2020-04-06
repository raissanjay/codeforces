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

    var MARGIN_OF_ERROR_LIMIT = Math.pow(10, -6);


    // Trying to get a to converge via binary search to this equation
    // d = a^2 / (a - 1)
    function getValue(a){
        var numerator = Math.pow(a, 2);
        var denominator = a - 1;
        return numerator / denominator;
    }

    function solution(d){
        var low = 0;
        var high = d;
        var mid = low + (low + high)/2;
        var val = getValue(mid);

        // TODO: Figure out cases for d: 0 -> d: 4
        if(d === 0) {
            print("Y 0 0");
        }
        if(d < 4) {
            print("N");
            return;
        }

        while(Math.abs(d - val) >= MARGIN_OF_ERROR_LIMIT){
            if(d - val > 0) {
                low = mid ;
            }
            else {
                high = mid;
            }
            mid = low + (high - low)/2;
            val = getValue(mid);
        }
        print("Y " + mid + " " + (d-mid));
    }

    const length = readline();
    for(var i = 0; i < length; i++){
        solution(parseInt(readline()));
    }

}


