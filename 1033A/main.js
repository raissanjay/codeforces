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

    function kingBehindQueenX(kingXCoor, queenXCoor){
        return kingXCoor < queenXCoor;
    }

    function kingBehindQueenY(kingYCoor, queenYCoor){
        return kingYCoor < queenYCoor;
    }

    function kingInFrontOfQueenX(kingXCoor, queenXCoor){
        return kingXCoor > queenXCoor;
    }

    function kingInFrontOfQueenY(kingYCoor, queenYCoor){
        return kingYCoor > queenYCoor;
    }

    function targetSquareInFrontOfQueenX(targetXCoor, queenXCoor){
        if(targetXCoor > queenXCoor){
            return true;
        }
    }

    function targetSquareBehindQueenX(targetXCoor, queenXCoor){
        if(targetXCoor < queenXCoor){
            return true;
        }
    }

    function targetSquareInFrontOfQueenY(targetYCoor, queenYCoor){
        if(targetYCoor > queenYCoor){
            return true;
        }
    }

    function targetSquareBehindQueenY(targetYCoor, queenYCoor){
        if(targetYCoor < queenYCoor){
            return true;
        }
    }

    function solution(n, a, b, c){
        // var boardDimensions = n;
        var queenXCoor = parseInt(a[0]);
        var queenYCoor = parseInt(a[1]);

        var kingXCoor = parseInt(b[0]);
        var kingYCoor = parseInt(b[1]);

        var targetXCoor = parseInt(c[0]);
        var targetYCoor = parseInt(c[1]);


        if(kingBehindQueenX(kingXCoor, queenXCoor)){
            // target square x must be behind
            if(targetSquareInFrontOfQueenX(targetXCoor, queenXCoor)){
                return false;
            }
        }

        if(kingInFrontOfQueenX(kingXCoor, queenXCoor)){
            // target square x must be in front
            if(targetSquareBehindQueenX(targetXCoor, queenXCoor)){
                return false;
            }
        }

        if(kingBehindQueenY(kingYCoor, queenYCoor)){
            // target square y must be behind
            if(targetSquareInFrontOfQueenY(targetYCoor, queenYCoor)){
                return false;
            }
        }

        if(kingInFrontOfQueenY(kingYCoor, queenYCoor)){
            // target square y must be behind
            if(targetSquareBehindQueenY(targetYCoor, queenYCoor)){
                return false;
            }
        }

        return true;
    }


    const line1 = readline().split(" ");
    const n = parseInt(line1[0]);
    const a = readline().split(" ");
    const b = readline().split(" ");
    const c = readline().split(" ");

    var s = solution(n, a, b, c);

    if(s){
        print("YES");
    }
    else {
        print("NO");
    }
}


