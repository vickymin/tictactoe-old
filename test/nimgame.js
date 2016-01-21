/**
  * @param {number} n
  * @return {boolean}
  */
var canWinNim_1 = function(n) {
 	// 方法一：正常求余
     return !(n % 4 === 0);
 };

 var canWinNim_2 = function(n) {
 	// 方法二：位运算求余
 	// 按理说位运算应该快一点，但实际用时反而慢了一点...
     return !!(n & 0x3);
 };
 
var times = 5000000;
 /***** test 1 ******/
 var start_time1 = new Date().getTime();

 for (var i=0; i<times; i++) {
     canWinNim_1(106);
 }

 var end_time1 = new Date().getTime();

 console.log("avg time=",(end_time1 - start_time1) / times);

 /***** test 2 ******/
 var start_time2 = new Date().getTime();

 for (var i=0; i<times; i++) {
     canWinNim_2(106);
 }

 var end_time2 = new Date().getTime();

 console.log("avg time=",(end_time2 - start_time2) / times);
