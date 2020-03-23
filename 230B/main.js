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

    var prime = new Array(Math.pow(10, 6));
    prime[0] = true;
    prime[1] = true;

    var tPrimes = new Set();

    function getAllPrimes(){
        for(var i = 2; i <= Math.pow(10, 6); i++){
            if(prime[i] === undefined){
                // number is unmarked so we know it's prime
                prime[i] = true;
                var j = i * i;
                while(j <= Math.pow(10, 6)){
                    prime[j] = false;
                    j = j + i;
                }
            }
        }
    }

    function getAllTPrimes(){
        for(var i = 2; i < prime.length; i++){
            if(prime[i] === true) {
                tPrimes.add(i * i);
            }
        }
    }

    getAllPrimes();
    getAllTPrimes();

    function isTPrime(number){
        if(tPrimes.has(number)){
            print("YES");
        }
        else {
            print("NO");
        }
    }

    const line1 = readline();
    const line2 = readline().split(" ").map(x => parseInt(x));
    for(var i = 0; i < line2.length; i++){
        isTPrime(line2[i]);
    }
}


