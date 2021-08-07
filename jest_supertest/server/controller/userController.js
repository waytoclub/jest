/**
 * Imports
 * User Model
 * Validation File
 */
const User = require('../model/user')
const {userValidation} = require('../validation/validation')
const bcrypt = require('bcryptjs');

//******************** User Functions *************************/

/**
 * 
 * @param {*} req 
 * @param {*} res 200
 * @returns json
 * Create Single Students
 */
exports.createUser = async (req, res) =>{

    /**
     * Error Scope
     */
    const {error} = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    if(await User.findOne({email: req.body.email})) return res.status(400).send("Email already exist")
    if(await User.findOne({username: req.body.email})) return res.status(400).send("Username already exist")

    /**
     * Password Scope
     */

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)


    /**
     * Creation Scope
     */
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })

    /**
     * Response Scope
     */
    try{
        const data = await user.save();
        return res.status(200).json({
            'status': 'success',
            'data': data
        });
    }catch(err){
        return res.status(500).json({
            'status': 'error',
            'message': err
        });
    }
}

//******************** User Functions End*************************/