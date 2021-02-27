//seq-id	alignment-start	alignment-end
const alignment = [
['>evm.model.1.10740', 632, 681, 'PTCB-BRCT'],
['>evm.model.1.10808', 265, 338, 'BRCT_2'],
['>evm.model.1.3990', 47, 108, 'BRCT'],
['>evm.model.1.7034', 150, 224, 'BRCT'],
['>evm.model.2.613', 109, 180, 'BRCT'],
['>evm.model.2.613', 917, 981, 'BRCT'],
['>evm.model.3.1134', 595, 704, 'BRCT_2'],
['>evm.model.3.1134', 485, 560, 'BRCT'],
['>evm.model.3.1156', 588, 697, 'BRCT_2'],
['>evm.model.3.1156', 477, 552, 'BRCT'],
['>evm.model.3.1204', 413, 482, 'BRCT'],
['>evm.model.3.1486', 7, 66, 'BRCT'],
['>evm.model.3.1486', 104, 181, 'BRCT'],
['>evm.model.3.1541', 358, 419, 'BRCT'],
['>evm.model.3.1648', 564, 641, 'BRCT'],
['>evm.model.3.1840', 358, 419, 'PTCB-BRCT'],
['>evm.model.3.2233', 667, 728, 'PTCB-BRCT'],
['>evm.model.3.2233', 563, 646, 'BTCT_2'],
['>evm.model.3.2233', 103, 172, 'BRCT'],
['>evm.model.4.1000', 319, 389, 'BRCT'],
['>evm.model.4.27', 78, 139, 'PTCB-BRCT'],
['>evm.model.4.282', 78, 139, 'PTCB-BRCT'],
['>evm.model.4.372', 661, 706, 'PTCB-BRCT'],
['>evm.model.4.4602', 279, 350, 'BRCT'],
['>evm.model.6.1874', 968, 1063, 'BRCT_3'],
['>evm.model.6.575', 541, 667, 'BRCA-2_OB1'],
['>evm.model.6.575', 463, 537, 'BRCA-2_helical'],
['>evm.model.6.575', 92, 119, 'BRCA2'],
['>evm.model.6.575', 197, 224, 'BRCA2'],
['>evm.model.8.2802', 968, 1064, 'BRCT_3'],
['>evm.model.8.777', 9, 71, 'BRCT'],
['>evm.model.8.806', 9, 71, 'BRCT'],
]

//output 'key', 'start', 'end', 'before', 'brct', 'after','name'
//  where name is hmm-name, key is protein sequence id
// brct is BRCT domain
function calcTableData(alignment, brct, cutLength){
    let data =[];

    alignment.map((item, index) => {
        let key = item[0]
        let start = item[1]
        let end = item[2]
        let name = item[3]


        let value = brct[key]
        let v = value.replaceAll('\n', '').replaceAll('\r', '')

        let brctCut = v.substr(start, end - start)
        let before = v.substr(start - cutLength, cutLength)
        let after = v.substr(end, cutLength)
        data.push({ key, start, end, before, 'brct': brctCut, after,name })
    })
    return data;
}


/**
 *  链接：https://leetcode-cn.com/problems/longest-common-subsequence/solution/js-dian-xing-de-dong-tai-gui-hua-by-hblvsjtu/
 * @param {string} text1
 * @param {string} text2
 * @return {string}  // {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const dp = [];
    for(let i = 0; i <= text1.length; i++) {
        dp[i] = [];
        for(let j = 0; j <= text2.length; j++) {
            if (!i || !j) dp[i][j] = 0;
            else if (text1[i - 1] === text2[j - 1]){
             dp[i][j] = dp[i - 1][j - 1] + 1;    
            }
            else{
             dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    let temp='';
    let last = dp[text1.length]; 
    //if(last[0]>0) temp += text2.charAt(0)
    for(let j=0; j<text2.length; j++){
        if(last[j]<last[j+1]){
            temp += text2.charAt(j)
        }
    }
    // console.log(dp);
    // debugger
    //return dp[text1.length][text2.length];
    return temp;
};


