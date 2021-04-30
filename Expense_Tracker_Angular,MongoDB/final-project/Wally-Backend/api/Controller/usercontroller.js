/**
 * Controller for user endpoints.
 */

const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/database.config')
const salt = bcrypt.genSaltSync(10);
//import sticky service.
const userService = require('../services/userService')
const async = require("async_hooks");
const nodemailer = require("nodemailer");

/**
 * Creates a new user with the request JSON and
 * returns user JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.create = (req,res) => {
    console.log(req.body.userName);
    console.log("inside create user");

    const user = new User({
        userName : req.body.userName,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });
    
    userService.addUser(user, (err, user) =>{
        console.log("called add user");
        if(err){
           res.json({success: false, msg: "Failed to register user!"});
        
        }
        else{
            res.json({success: true, msg: "User is registered!"});
         }

    });  
};

/**
 * Returns a user object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.getUser = (req,res) => {

    const userName = req.body.userName;
   const password = req.body.password;

    userService.getUserByEmail(userName, (err, user) => {
       if(err) throw err;
       if (!user){
           return res.json({success :false,  msg:'User not found!' });
       }

     userService.comparePassword(password, user.password ,(err, isMatch) =>{
           console.log("inside node compare function");
           if(err) throw err;
           if(isMatch)
           {
               const token = jwt.sign(user.toJSON(), config.secret, {

                   expiresIn: 604800

               });

               res.json({
                   success: true,
                   token: 'JWT '+token,
                   user: {
                       id:user._id,
                       firstName: user.firstName,
                       lastName: user.lastName,
                       userName: user.userName
                   }
               });
           }else {
               return res.json({success :false , msg: 'Incorrect password!'});

           }
       });
   });
};

/**
 * Deletes a user object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.delete = function (request, response) {
    const resolve = () => {
        response.status(200);
        response.json({
            message: 'Assignment Successfully Deleted'
        });
    };
    userService.delete(request.params.userName)
        .then(resolve)
        .catch(renderErrorResponse(response));
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