/**
 * @param {string} s
 * @return {number}
 */

var times = 5000000;

//method1
var containsDuplicate1 = function(nums) {
   nums.sort();
   for(var i=1; i<nums.length; i++){
       if(nums[i] == nums[i-1]){
           return true;
       }
   }
   return false;
};
//method2
var containsDuplicate2 = function(nums) {
   var newNum = {};
   newNum[String(nums[0])] = true;
   for(var i=1; i<nums.length; i++){
       if(newNum[String(nums[i])]){
           return true;
       }
       newNum[String(nums[i])] = true;
   }
   return false;
};

/***** test 1 ******/
var start_time1 = new Date().getTime();

for (var i=0; i<times; i++) {
    containsDuplicate1([2,3,4,7,6,9,144,1567,1457,1365867,986]);
}

var end_time1 = new Date().getTime();

console.log("avg time=",(end_time1 - start_time1) / times);

/***** test 2 ******/
var start_time2 = new Date().getTime();

for (var i=0; i<times; i++) {
    containsDuplicate2([2,3,4,7,6,9,144,1567,1457,1365867,986]);
}

var end_time2 = new Date().getTime();

console.log("avg time=",(end_time2 - start_time2) / times);
