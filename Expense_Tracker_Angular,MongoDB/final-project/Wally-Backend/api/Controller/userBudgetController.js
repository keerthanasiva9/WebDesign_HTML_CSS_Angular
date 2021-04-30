const userBudget = require('../models/userbudget');
const userBudgetService = require('../services/userBudgetService');

/**
 * Creates a new budget with the request JSON and
 * returns budget JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.add = (req,res) => {
    const budget = new userBudget({
        userName : req.body.userName,
        month:req.body.month,
        userBudget: req.body.userBudget

    });

    userBudgetService.addBudget(budget, (err, foundbudget) =>{
        console.log("call add budget" + JSON.stringify(budget));
        if(err){
           res.json({success: false, msg: "Failed to register user Budget!"});
        
        }
        else{
            res.json({success: true, msg: "User Budget Saved!"});
         }

    });  

};

/**
 * Returns budget object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.getBudget = (req,res) => {
    var user = req.url.split("/")[2];
    var query = ({ userName: user });
    console.log("console get  user budget for "+user);

    userBudget.find(query,(err,budgetlist)=>{
    if(budgetlist.length ==0 ){
        res.send({'message':'could not find user' + user});
    }
    else{
    console.log("found list"+JSON.stringify(budgetlist));
        res.send(budgetlist);
    }
    });
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */

let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};