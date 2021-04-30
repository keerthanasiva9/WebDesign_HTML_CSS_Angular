/**
 * user creation, cards and budget endpoint route definitions.
 */

'use strict';
module.exports = (app) => {
    console.log('route');
    const user = require('../controller/userController');
    const BankAccount = require('../Controller/creditCardController');
    const budget = require('../Controller/userBudgetController');

    //endpoint routes for user creation
    app.post('/users',user.create);
    console.log(user.create);
    app.post('/users/auth',user.getUser)
    app.delete('/users/:userName',user.delete);

    //endpoint routes for cards
    app.post('/creditcard', BankAccount.add);
    app.get('/creditcard/:user', BankAccount.get);

    //endpoint routes for budget
    app.post('/addbudget', budget.add);
    app.get('/getbudget/:userName', budget.getBudget);
    
}