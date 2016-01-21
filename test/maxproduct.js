/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function(words) {
    var max = 0;
    for(var i = 0; i < words.length; i++){
        for(var j = 0; j < words.length; j++){
            if(i != j && _h(words[i], words[j])){
                max = Math.max(max, words[i].length * words[j].length);
            }
        }
    }
    return max;
};

var _h = function(w1, w2) {
    var a = w1.split("");
    a.sort();
    var b = w2.split("");
    b.sort();
    var i = 0;
    var j = 0;
    while(i < a.length && j < b.length){
        if (a[i] == b[j]){
            return false;
        }else if (a[i] < b[j]){
            i++;
        }else{
            j++;
        }
    }
    return true;
};

var test = ["dfbefeecfbbcacce","bcbdfbbdabfdcb","cfefcbbdcfcaddbcbfcba","dafbbdadfdfebaeacc","ceaadbafffbbaedefbdde","ceaeebedfacdfcacabaab","decaaafccdfc","be","bffbddcebfb","dceaf","beafd","dcaafcdceeedabcb","efecdbcdbabadcffbddc","ccedaeeddfdbeabfdeeaf","fed","bfaefdbbce","ddbabfdafddfded","daddedeadeafab","bbbefddcadddecbfb","fbffcefbbccbc","eddbfffeacfddbbac","accdc","fdfabcf","edcbcafebddfdede","fafdddecafdadcafabc","aecbcaddaadad","ecfeeadc","eebffaadfecacabfaecdd","acddeeec","feecccbbddbf","daadfafbcafbdfdaacd","bb","dcbbccfed","deee","adbaebfddafeffefaeebf","bccaccadafcdc","ecaffaadafaccab","bbbbbbedefb","faecafedfefe","ceedbffdbdcdacffbe","dad","fbccbfbbeabcfdfcff","ddddfbbbeeccdabdccdf","fea","faff","fdcfcadebffda","cebedbebebaadbdfede","befbaadaebebcdd","acbbcae","efffdcedcbda","bdedccee","cbcbddfdeeebbcfbfecfd","efbcbceedeccfba","bdbefddaeabcbdf","cf","dfcbfbbffcadbfdcf","fbcedaadafaaaaabda","dfbfdabdffedbabcaee","ebbcfaceedbaefeefefa","dbfacaecddfcfbcfbdcc","fefecccfbdfcec","fdabcefef","dddebcabfddd","bbfecdcabbfb","cabafcafe","baeafbdf","badeacdccdab","accccffcaecbfcf","feacbafd","eafeafcabbaaebb","afefbaedcfafcced","faebbcef","cddacbb","fcbedabdcadbdffefe","defedcebacfeeeb","cdfff","aadafcedcfeda","cfaaea","ffceab","edfbcdacccabcaaaabdfd","cbdbefdd","bdacbaecfbbcfdbac","cfcdcdafffddafafa","ba","bdcceebecafaf","dcffbefebe","dfaaabd","bcafddfddfd","bbceddcd","bebfacbebbacbbbaaafd","aaed","ecfbabbc","debaaacaedceaccad","badcefccebaeafefac","ecfdaedddceefbaed","cdbbd","bedecccbfcddafc","dbbecffbcadbccfcacfc","fdcbfcdfaeddbbacedaf","fdafcbfdfbfaefbbfe","adebceacbbafec","ddfcb","fdfaecfcca","abecaeacccfa","acfdfeebbdffcdffadbbf","badfebb"]
var test2 = ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
var res = maxProduct(test);
console.log(res);
