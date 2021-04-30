/**
 * Service for budget operations.
 */
const userBudget = require('../models/usermodel');

/**
 * Saves and returns the new budget object.
 *
 * @param {Object} budget {Budget object}
 */
exports.addBudget = function(newBudget, callback){
    // console.log("inside add2" + JSON.stringify(newBudget));
    getUserbyBudget(newBudget,(err, budget)=>{
    // console.log("Already found budget" + JSON.stringify(budget));
    if(budget){
    console.log('message Budget already exist');
    }
    else{
        newBudget.save(callback);
}
});
}

/**
 * Returns the sticky object matching the userName.
 *
 * @param {Object} budget {Budget object}
 */

getUserbyBudget = function(budget, callback){
    const query = {userName: budget.userName, month:budget.month}
    userBudget.findOne(query, callback);

}