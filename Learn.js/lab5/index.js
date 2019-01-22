/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {

	var uniqueHashes = "";
    if (hashtags.length === 0)
        return uniqueHashes;


    var arrTags = hashtags.slice();

    var filtredHashtag = hashtags.filter(isExist);

    function isExist(hashtag, index){

    	var isExist = true;
    	for (i = index - 1 ; i >= 0; i--){
            if ( typeof hashtag === "string")
    		if ( hashtag.toLowerCase() === arrTags[i].toLowerCase())
    			isExist = false;
    	}
    	return (isExist && hashtag !== "");
    }

    uniqueHashes = filtredHashtag.join(", ").toLowerCase();
    return uniqueHashes;

};
