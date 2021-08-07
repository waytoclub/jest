const mongoose = require('mongoose')
require('../../db/database')
require('dotenv/config')

/**
 * Imports
 * User Model
 * Validation File
 * Bcrypt lib
 * JWT lib
 */
const User              = require('../model/user')
const {loginValidation} = require('../validation/validation')
const bcrypt            = require('bcryptjs')
const jwt               = require('jsonwebtoken')

//******************** Auth Functions *************************/

/**
 * @param {*} req (email, password)
 * @param {*} res 200 
 * @returns json
 * Login User
 */
exports.login = async (req, res) =>{
    try{
        /**
         * Validation Scope
         */
        const {error} = loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({email: req.body.email}) 
        
        if(!user) return res.status(400).send("Email not registered")

        bcrypt.compare(req.body.password, user.password, function(err, res) {
            if(err) throw err;
        });
        
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send("Email or Password wrong")

        /**
         * JWT Token Scope
         */
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
            // expiresIn: "10h" // it will be expired after 10 hours
            //expiresIn: "20d" // it will be expired after 20 days
            //expiresIn: 120 // it will be expired after 120ms
            //expiresIn: "120s" // it will be expired after 120s
        })
        res.header('authtoken', token)

        /**
         * Response Scope
         */
        return res.status(200).json({
            'status': 'success',
            'message': 'Logged In',
            'authtoken': token
        });
    }catch(err){
        return res.status(500).json({
            'status': 'error',
            'message': err
        });
    }
}



//******************** Auth Functions End*************************/