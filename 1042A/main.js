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

    function SomeHeap() {
        this.minHeap = [];
        this.maxValue = Number.NEGATIVE_INFINITY;
    }

    SomeHeap.prototype.insert = function(val){
        if(val > this.maxValue){
            this.maxValue = val;
        }
        this.minHeap.push(val);
        var lastElement = this.minHeap.length - 1;
        this.bubbleIntoPlace(lastElement)
    };

    SomeHeap.prototype.bubbleIntoPlace = function(childNodeIndex){
        while(childNodeIndex > 0){
            var parentNodeIndex = Math.ceil(childNodeIndex/2) - 1;
            var parentNodeValue = this.minHeap[parentNodeIndex];
            var childNodeValue = this.minHeap[childNodeIndex];

            // if parent is greater than child
            if ( parentNodeValue > childNodeValue) {
                // swap
                var temp = this.minHeap[parentNodeIndex];
                this.minHeap[parentNodeIndex] = this.minHeap[childNodeIndex];
                this.minHeap[childNodeIndex] = temp;
            }

            childNodeIndex = parentNodeIndex;
        }
    };

    SomeHeap.prototype.incrementMin = function(){
        var parentNodeIndex = 0;
        var leftChildNodeIndex = 1;
        var rightChildNodeIndex = 2;

        this.minHeap[parentNodeIndex]++;
        if(this.minHeap[parentNodeIndex] > this.maxValue){
            this.maxValue = this.minHeap[parentNodeIndex];
        }

        while(this.minHeap[parentNodeIndex] > this.minHeap[leftChildNodeIndex] || this.minHeap[parentNodeIndex] > this.minHeap[rightChildNodeIndex]) {
            if(this.minHeap[parentNodeIndex] > this.minHeap[leftChildNodeIndex]){
                // swap left
                var temp = this.minHeap[parentNodeIndex];
                this.minHeap[parentNodeIndex] = this.minHeap[leftChildNodeIndex];
                this.minHeap[leftChildNodeIndex] = temp;

                parentNodeIndex = leftChildNodeIndex;
                leftChildNodeIndex = 2 * parentNodeIndex + 1;
                rightChildNodeIndex = 2 * parentNodeIndex + 2;
            }
            else {
                // swap right
                var temp = this.minHeap[parentNodeIndex];
                this.minHeap[parentNodeIndex] = this.minHeap[rightChildNodeIndex];
                this.minHeap[rightChildNodeIndex] = temp;

                parentNodeIndex = rightChildNodeIndex;
                leftChildNodeIndex = 2 * parentNodeIndex + 1;
                rightChildNodeIndex = 2 * parentNodeIndex + 2;
            }
        }

    };


    var numberOfBenches = parseInt(readline());
    var additionalPeopleComing = parseInt(readline());
    var someHeap = new SomeHeap();

    for(var i = 0; i < numberOfBenches; i++){
        someHeap.insert(parseInt(readline()));
    }

    var maxValue = someHeap.maxValue + additionalPeopleComing;

    while(additionalPeopleComing > 0){
        someHeap.incrementMin();
        additionalPeopleComing--;
    }



    var minValue = someHeap.maxValue;

    print(minValue + " " + maxValue);
}


