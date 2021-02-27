	 function getLongestCommonSequencesBetweenTwoSequences(sequence1,
			sequence2) {
		let commonSequences = getCommonSequencesBetweenTwoSequences(sequence1, sequence2,
				[]);
		let longestCommonSequence = "";
		commonSequences.forEach((commonSequence) =>{
			// debugger
			if (commonSequence.length > longestCommonSequence.length) {
				longestCommonSequence = commonSequence;
			}
		})
		return longestCommonSequence;
	}

	function getCommonSequencesBetweenTwoSequences(sequence1, sequence2,
			commonSequences) {
		if (sequence1.length == 0) {
			return commonSequences;
		}
		// caracter to be tested
		let toBeTested = sequence2.charAt(0)
		if (!sequence1.startsWith(toBeTested)) {
			// A
			return getCommonSequencesBetweenTwoSequences(sequence1.substring(1), sequence2, commonSequences);
		} else {
			let commonGeneSequence = "";
			commonGeneSequence += toBeTested;
			let hasFirstCaracterInCommonBeenAdded = false;
			for (let i = 1; i < sequence2.length; i++) {
				if (sequence1.length > i) {
					if (sequence2.charAt(i) == sequence1.charAt(i)) {
						commonGeneSequence += sequence2.charAt(i);
						commonSequences.push(commonGeneSequence);
						hasFirstCaracterInCommonBeenAdded = true;
					} else {
						break;
					}
				}
			}
			if (hasFirstCaracterInCommonBeenAdded == false) {
				commonSequences.push(toBeTested);
			}
			return getCommonSequencesBetweenTwoSequences(sequence1.substring(commonGeneSequence.length), sequence2,
					commonSequences);

		}
	}