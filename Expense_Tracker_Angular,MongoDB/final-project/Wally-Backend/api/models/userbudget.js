const mongoose = require('mongoose');

/**
 * Mongoose schema for budget object.
 */

const Budget = mongoose.Schema({
    /**
     * User Name of the user.
     */
    userName: String,
    /**
     * month.
     */
    month: String,
    /**
     * Budget of the user for that month.
    */
    userBudget: Number
});

module.exports = mongoose.model('Budget', Budget);