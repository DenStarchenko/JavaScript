/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

	var time = new Date(date);
	var timeArr = ["years", "months","days","hours","minutes"];

	var Obj = {
		/**
		 * [add description]
		 * @param {[number]} number [число]
		 * @param {[string]} string [дата]
		 */
		add: function(number, changeDate) {

			if (timeArr.includes(changeDate) && (number >= 0)){
				if (changeDate === "years"){

					time = new Date(time.getFullYear() + number, time.getMonth(), time.getDate() , time.getHours(), time.getMinutes());


				} if (changeDate === "months"){

					time = new Date(time.getFullYear(), time.getMonth() + number, time.getDate() , time.getHours(), time.getMinutes());

				} if (changeDate === "days"){


					time = new Date(time.getFullYear() , time.getMonth(), time.getDate() + number , time.getHours(), time.getMinutes());
				} if (changeDate === "hours"){


					time = new Date(time.getFullYear() , time.getMonth(), time.getDate() , time.getHours() + number, time.getMinutes());
				} if (changeDate === "minutes"){


					time = new Date(time.getFullYear() , time.getMonth(), time.getDate() , time.getHours(), time.getMinutes() + number);
				}

			}
			else {
				throw new TypeError("Неверно введены параметры функции!");
			}
			return this;
		},
		/**
		 * [subtract description]
		 * @param  {[type]} number     [description]
		 * @param  {[type]} changeDate [description]
		 */
		subtract: function (number, changeDate){

			if (timeArr.includes(changeDate) && (number >= 0)) {
				if (changeDate === "years"){
					time = new Date(time.getFullYear() - number, time.getMonth(), time.getDate() , time.getHours(), time.getMinutes());
				} if (changeDate === "months"){
					time = new Date(time.getFullYear(), time.getMonth() - number, time.getDate() , time.getHours(), time.getMinutes());
				} if (changeDate === "days"){
					time = new Date(time.getFullYear(), time.getMonth(), time.getDate() - number , time.getHours(), time.getMinutes());
				} if (changeDate === "hours"){
					time = new Date(time.getFullYear(), time.getMonth(), time.getDate() , time.getHours() - number, time.getMinutes());
				} if (changeDate === "minutes"){
					time = new Date(time.getFullYear(), time.getMonth(), time.getDate() , time.getHours(), time.getMinutes() - number);
				}

			} 
			else {
				throw new TypeError("Неверно введены параметры функции!");
			}
			return this;
		},
		get value() {

			var	month = time.getMonth() + 1;
		
			var	days = time.getDate();
			
			var	hours = time.getHours();
			
			var	minutes = time.getMinutes();
	
				if (month < 10){
					month = "0" + month;
				} 
				if (days < 10){
					days = "0" + days;
				} 
				if (hours < 10){
					hours = "0" + hours;
				} 
				if (minutes < 10){
					minutes = "0" + minutes;
				}
			var result =  "" + time.getFullYear() + "-" + month + "-" + days + " " + hours + ":" + minutes;	
			return result;
		}
	};



	return Obj;
};
