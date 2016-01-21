/**
 * @param {string} s
 * @return {number}
 */

var times = 5000000;

var titleToNumber = function(s) {
    var sum = 0;
    var len = s.length-1;
    var base = 1;
    for(var j= len; j>=0; j--){
        sum = sum + (s.charCodeAt(j)-64)*base;
        base = base*26;
    }
    return sum;
};

var titleToNumber2 = function(s) {
    var sum = 0;
    var len = s.length-1;
    for(var j= len; j>=0; j--){
        sum = sum + (s.charCodeAt(j)-64)*Math.pow(26, len-j);
    }
    return sum;
};

/***** test 1 ******/
var start_time1 = new Date().getTime();

for (var i=0; i<times; i++) {
    titleToNumber("AAZAABBBCC");
}

var end_time1 = new Date().getTime();

console.log("avg time=",(end_time1 - start_time1) / times);

/***** test 2 ******/
var start_time2 = new Date().getTime();

for (var i=0; i<times; i++) {
    titleToNumber2("AAZAABBBCC");
}

var end_time2 = new Date().getTime();

console.log("avg time=",(end_time2 - start_time2) / times);


