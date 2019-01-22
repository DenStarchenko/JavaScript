1// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

 	let arrString = command.split(' ');
    let commandName = arrString[0];
    arrString.shift();
 
    if(commandName === 'ADD') { return AddContact(arrString);}
    if(commandName === 'REMOVE_PHONE') {return DeleteContact(arrString);}
    if(commandName === 'SHOW') {return ShowContacts();}
};
 
/**
 * [AddContact description]
 * @param {[Array]} text [description]
 */
function AddContact(text) {
    
    if ( text.length < 2) {
        return false;
    }

 	let emptyArr = [];
    let nameStr = text[0]; 
    let phoneNumber = text[1].split(','); 

    if (phoneBook.hasOwnProperty(nameStr))
    {
        for (let i = 0; i < phoneNumber.length; i++) {
        	if (phoneBook[nameStr].join().indexOf(phoneNumber[i]) < 0 ) {
            phoneBook[nameStr].push(phoneNumber[i]);
        	}
        }
    }
    else {
       phoneBook[nameStr] = phoneNumber;
    }
}

 /**
 * [DeleteContact description]
 * @param {[Array]} text [description]
 */
function DeleteContact(text) {
 
 	let phoneNumber = text[0];
    let keys = Object.keys(phoneBook);
    let remove = false;

    for(var i = 0; i < keys.length; i++){
    	for (var index = 0; index < keys[i].length; index++ ){  		
 				if (phoneBook[keys[i]][index] === phoneNumber){
 					remove = true;
 					phoneBook[keys[i]].splice(index,1);
 				}
 			}
    	}
        if (remove) {return true;}
            else {return false;}
    }
 
function ShowContacts() {
 
    var keys = Object.keys(phoneBook);
    keys.sort();
 
    let result = [];
    for (var i = 0; i < keys.length ; i++){
        if (phoneBook[keys[i]].length > 0)
        result.push(keys[i] + ': ' + phoneBook[keys[i]].join(', '));
    }
 
    return result;
}
