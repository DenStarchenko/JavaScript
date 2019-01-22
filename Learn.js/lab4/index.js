/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
	var space = " ";
	var arrayString = tweet.split(space);

	var result = [];
	for ( var i = 0 ; i< arrayString.length ; i++){
		if (arrayString[i].charAt(0) === "#"){
			result.push(arrayString[i].slice(1));
		}

	}
	return result;
};

