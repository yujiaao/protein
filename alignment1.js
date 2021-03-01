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

    // ['>evm.model.6.575', 541, 667, 'BRCA-2_OB1'],
    // ['>evm.model.6.575', 463, 537, 'BRCA-2_helical'],
    // ['>evm.model.6.575', 92, 119, 'BRCA2'],
    // ['>evm.model.6.575', 197, 224, 'BRCA2'],
    ['>evm.model.8.2802', 968, 1064, 'BRCT_3'],
    ['>evm.model.8.777', 9, 71, 'BRCT'],
    // ['>evm.model.8.806', 9, 71, 'BRCT'],
]

//output 'key', 'start', 'end', 'before', 'brct', 'after','name'
//  where name is hmm-name, key is protein sequence id
// brct is BRCT domain
function calcTableData(alignment, brct, cutLength) {
    let data = [];
    let i = 1;
    alignment.map((item, index) => {
        let key = item[0]
        let start = item[1]
        let end = item[2]
        let name = item[3]


        let value = brct[key]
        if (!value) return

        let v = value.replaceAll('\n', '').replaceAll('\r', '')

        let brctCut = v.substr(start, end - start)
        let before = v.substr(start - cutLength, cutLength)
        let after = v.substr(end, cutLength)
        data.push({ No: i++, key: key + "_" + (i - 1), start, end, before, 'brct': brctCut, after, name })
    })
    return data;
}


/**
 *  链接：https://leetcode-cn.com/problems/longest-common-subsequence/solution/js-dian-xing-de-dong-tai-gui-hua-by-hblvsjtu/
 * @param {string} text1
 * @param {string} text2
 * @return {string}  // {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const dp = [];
    for (let i = 0; i <= text1.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= text2.length; j++) {
            if (!i || !j) dp[i][j] = 0;
            else if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    let i = text1.length
    let j = text2.length
    let res = ''
    while (i > 0 && j > 0) {
        if (dp[i][j] == dp[i - 1][j]) {
            i--
        } else if (dp[i][j] == dp[i][j - 1]) {
            j--
        } else if (dp[i][j] > dp[i - 1][j - 1]) {
            res = text2.charAt(j - 1) + res
            i--
            j--
        }
    }

    return res;
};

function createArray(m, n) {
    return Array(m).fill([]).map(() => Array(n).fill(0))
}

function longest_substring(s1, s2) {
    let t = createArray(s1.length + 1, s2.length + 1) 
    let l = 0, xl = 0
    for (let x = 1; x < 1 + s1.length; x++) {
        for (let y = 1; y < 1 + s2.length; y++) {
            if (s1.charAt(x - 1) == s2.charAt(y - 1)) {
                t[x][y] = t[x - 1][y - 1] + 1
                if (t[x][y] > l) {
                    l = t[x][y]
                    xl = x
                }
            }
            else
                t[x][y] = 0
        }
    }
    return s1.substr(xl - l, l)
}


/**
 * v minV~maxV
 */
const scale = (num, in_min, in_max, out_min, out_max) => {
    return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}

function mapColor(v, minV, maxV) {
    let cmin = [0x01,0x74,0x2f] //[198, 255, 221]
    let cmid = [251, 215, 134]
    let cmax = [247, 121, 125]
    let midV = (minV + maxV) / 2;
    let res = []
    if (v > midV) {
        res = [scale(v, midV, maxV, cmid[0], cmax[0]),
        scale(v, midV, maxV, cmid[1], cmax[1]),
        scale(v, midV, maxV, cmid[2], cmax[2])]
    } else {
        res = [scale(v, minV, midV, cmin[0], cmid[0]),
        scale(v, minV, midV, cmin[1], cmid[1]),
        scale(v, minV, midV, cmin[2], cmid[2])]
    }
    return res
}