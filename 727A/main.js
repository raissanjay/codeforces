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

    function lastDigitOne(someNo){
        var lastDigit = +someNo.toString().split('').pop();
        return lastDigit === 1;
    }


    var path = [];
    function solution(a, b){
        var c = b;
        while(c > a){
            if(c % 2 === 0) {
                path.push(c);
                c = c/2;
            } else if (lastDigitOne(c)){
                path.push(c);
                c = (c - 1)/10
            }
            else {
                return false;
            }
        }
        if(c === a){
            path.push(a);
            return true;
        } else {
            path = [];
            return false;
        }
    }


    const line1 = readline().split(" ");
    const a = parseInt(line1[0]);
    const b = parseInt(line1[1]);

    var s = solution(a, b);

    if(!s){
        print("NO");
    }
    else {
        print("YES");
        print(path.length);
        var someString = "";
        for(var i = 0; i < path.length; i++){
            someString += path[path.length - 1 - i];
            if(i < path.length - 1){
                someString += " ";
            }

        }
        print(someString);
    }
}


