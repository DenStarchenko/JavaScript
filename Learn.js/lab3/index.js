/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {

		hours = (hours + Math.floor((minutes + interval)/60)) % 24;

		minutes = (minutes + interval) % 60;

		if (hours <= 10 && minutes <= 10){
			return "0" + hours + ":0" + minutes;
		}
		else if (hours <=10) {
			return "0" + hours + ":" + minutes;
		}
		else if ( minutes <= 10){
			return hours + ":0" + minutes; 
		}
		else return hours + ":" + minutes;
};
