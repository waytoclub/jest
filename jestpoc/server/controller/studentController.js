const mongoose = require('mongoose')
require('../../db/database')
require('dotenv/config')

/**
 * ImportseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4OTIxMjd9.ywm5pBYi2_eCkvFSDWk4t3t6NFheVg_rOFh5dKlI7eY
 * Student Model,
 * Validation File
 */

const Student = require('../model/student')
const {studentValidation} = require('../validation/validation')

//******************** Student Functions *************************/

/**
 * 
 * @param {*} req 
 * @param {*} res 200 
 * @returns json
 * List Students
 */
exports.listStudent = async (req, res) =>{
    try{
        const student = await Student.find()
        return res.status(200).json({
            'status': 'success',
            'data': student
        });
    }catch(err){
       return res.status(500).json({
           'status': 'error',
           'message': err
       });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 200
 * @returns json
 * Get Single Students
 */
exports.getStudent = async (req, res) =>{
    try{
        const student = await Student.findById(req.params.id);
        return res.status(200).json({
            'status': 'success',
            'data': student
        });
    }catch(err){
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 200
 * @returns json
 * Create Single Students
 */
exports.createStudent = async (req, res) =>{

    /**
     * Error Scope
     */
    const {error} = studentValidation(req.body)
    if(error) return res.status(403).send(error.details[0].message)

    emailError = await Student.findOne({email: req.body.email})
    console.log(emailError)
    if(emailError) return res.status(403).send("Email already exist")


    mobileError = await Student.findOne({mobile: req.body.mobile})
    console.log(mobileError)
    if(mobileError) return res.status(403).send("Mobile number already exist")

    /**
     * Creation Scope
     */
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        active: req.body.active
    })
    
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser.json({
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

/**
 * 
 * @param {*} req 
 * @param {*} res 200
 * @returns json
 * Update Student
 */
exports.updateStudent = async (req, res) =>{
    try{
        const data = await Student.updateOne(
            { _id: req.params.id},
            { $set: { name: req.body.name } }
        );

        // user.name = req.body.name;
        // const result = await user.save();
        // res.json(result);
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

/**
 * 
 * @param {*} req 
 * @param {*} res 200
 * @returns json
 * Remove Student
 */
exports.removeStudent = async (req, res) =>{
    try{
        const data = await Student.remove({ _id: req.params.id });
        return res.status(200).json({
            'status': 'success',
            'data': data
        });
    }catch(err){
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}

//******************** Student Functions End*************************/


