/**
 * Service for user operations.
 */
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const config = require('../config/database.config');
const crytpto = require('crypto');
const aasync = require("async");


/**
 * Saves and returns the new user object.
 *
 * @param {Object} newUser {User object}
 */
exports.addUser = function(newUser, callback){
    console.log("add user function ..... creating user");
    bcrypt.genSalt(10, (err, salt) => {
 
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;

            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

/**
 * Compares the password and returns the user object.
 *
 * @param {Object} newUser {User object}
 */


exports.comparePassword = function(candidatePassword, hash , callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    
       if(err) throw err;
       callback(null, isMatch);
    
    });
}

/**
 * Compares the email of the user and returns the user object.
 *
 * @param {Object} newUser {User object}
 */

exports.getUserByEmail = function(userName, callback){
    const query = {userName: userName}
   User.findOne(query, callback);

};

/**
 * Compares the id of the user and returns the user object.
 *
 * @param {Object} newUser {User object}
 */
exports.getUserById = function(id, callback){

    User.findById(id, callback);
 
 };

 /**
 * Deletes the user object matching the username.
 *
 * @param {string} stickyId {Id of the sticky object}
 */
 exports.delete = function (userName) {
    console.log(userName);
    const promise = User.findOneAndDelete({userName: userName});
    return promise;
};

