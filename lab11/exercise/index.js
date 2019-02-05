/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  let promises = [];
  
  operations.forEach(operation => {
    let promise = new Promise(function(resolve, reject) {
      let next = function(err, ms) {
        if (err !== null) {
          reject(err);          
        } else {
          resolve(ms);
        };
      };
      operation(next); 

    });
    
    promises.push(promise);
  });

  Promise.all(promises)
      .then( promise => {
      	callback(null,promise);
      })
      .catch( err => {
      	callback(err);
      });
}