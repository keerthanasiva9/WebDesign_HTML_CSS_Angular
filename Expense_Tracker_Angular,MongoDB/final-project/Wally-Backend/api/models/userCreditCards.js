'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for cards object.
 */
let CreditCard = new Schema({
    /**
     * User Name.
     */
    userName: {
        type: String,
        required: "title is required"
    },
    /**
     * Bank Name.
     */
    bankUserName: {
        type: String,
        
    },
    /**
     * Account type.
     */
    accountType: {
        type: String,
        
    },
    /**
     * Bank User.
     */
    bankUser: {
        type: String,
        
    },
    /**
     * Bank Password.
     */
    bankPassword: {
        type: String,
        
    },
    /**
     * Bill due date.
     */
    billDueDate: {
        type: Date,
        
    },
    transactions:[{
        category : String, //grocery,transport, shopping
        date : Date,
        description: String, //place of transaction
        amount: Number
    }]

}, 

{
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
CreditCard.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
CreditCard.set('toJSON');


module.exports = mongoose.model('CreditCard', CreditCard);