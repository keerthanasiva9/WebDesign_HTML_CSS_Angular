
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for user object.
 */

let User = new Schema({
    /**
     * First Name of the user.
     */
    firstName: {
        type: String,
        required: "firstName is required"
    },
    /**
     * Last Name of the user.
     */
    lastName: {
        type: String,
        // required: "title is required"
    },
    /**
     * User Name of the user.
     */
    userName: {
        type: String,
        required: "title is required"
    },
    /**
     * Password of the user.
     */
    password: {
        type: String,
    }
}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
User.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
User.set('toJSON');


module.exports = mongoose.model('User', User);