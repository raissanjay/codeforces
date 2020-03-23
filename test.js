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
        }
        else {
            // swap right
            var temp = this.minHeap[parentNodeIndex];
            this.minHeap[parentNodeIndex] = this.minHeap[rightChildNodeIndex];
            this.minHeap[rightChildNodeIndex] = temp;

            parentNodeIndex = rightChildNodeIndex;
            rightChildNodeIndex = 2 * parentNodeIndex + 2;
        }
    }

};
