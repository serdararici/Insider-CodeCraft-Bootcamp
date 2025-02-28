
function collatzSequenceLength(n, memo) {
    if (n in memo) return memo[n];
    
    let original = n;
    let length = 1;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        
        if (n in memo) {
            length += memo[n];
            break;
        }
        
        length++;
    }
    
    memo[original] = length;
    return length;
}

function longestCollatzSequence(limit) {
    let memo = {};
    let longestLength = 0;
    let numberWithLongestSequence = 0;
    
    for (let i = 1; i < limit; i++) {
        let currentLength = collatzSequenceLength(i, memo);
        if (currentLength > longestLength) {
            longestLength = currentLength;
            numberWithLongestSequence = i;
        }
    }
    
    return { number: numberWithLongestSequence, length: longestLength };
}

function calculateCollatz() {
    let limit = 1000000;
    let result = longestCollatzSequence(limit);
    document.getElementById("result").innerHTML = 
        `The number under one million with the longest Collatz sequence is: <b>${result.number}</b><br>
         This number reaches 1 in <b>${result.length}</b> steps.`;

    console.log(`The number under one million with the longest Collatz sequence is: ${result.number}`);
    console.log(`This number reaches 1 in ${result.length} steps.`);
}
