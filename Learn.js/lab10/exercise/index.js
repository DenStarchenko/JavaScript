module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */

function Collection() {
  this.value = [];
};


// Методы коллекции
Collection.prototype.values = function () {
  
    return this.value;
};

Collection.prototype.at = function() {
  if (arguments[0] <= 0 || typeof arguments[0] !== 'number' || arguments[0] > this.value.length ) {
    return null;
  }
  else {
    return this.value[arguments[0] - 1];
  }
};

Collection.prototype.append = function() {

  if ( !(arguments.length === 0) ){
    for (var i=0; i<arguments.length; i++){
    if (arguments[i] instanceof Collection){
       this.value = this.value.concat(Collection.prototype.values.call(arguments[i]));
    } else if ( Array.isArray(arguments[i]) ){
      this.value = this.value.concat(arguments[i]);
    } else this.value.push(arguments[i]);
  }
}
};

Collection.prototype.removeAt = function() {
  if (arguments[0] <= 0 || typeof arguments[0] !== 'number' || arguments[0] > this.value.length ) {
    return false;
  }  else {
    this.value.splice( arguments[0] - 1 , 1);
    return true;
  }
};

Collection.prototype.count = function() {
  if (this.value.length >= 0)
  return this.value.length;
};
/**
 * Создание коллекции из маccива значений
 */
Collection.from = function () {

  var collection = new Collection();

  if (arguments[0] instanceof Collection){
    collection.value = collection.value.concat(Collection.prototype.values.call(arguments[0]));
  }

  if ( arguments.length === 1 && Array.isArray(arguments[0]) ) {
  collection.value = collection.value.concat(arguments[0]);
  }

  if (arguments.length > 1){
  for (var i=0;i<arguments.length; i++){
    collection.value = collection.value.concat(arguments[i]);
  }

}
  return collection;
};


