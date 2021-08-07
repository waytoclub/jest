const mongoose = require('mongoose')
require('../db/database')
require('dotenv/config')

/**
 * Imports
 * Student Model,
 * Validation File
 */

const Student = require('../tests/student.test')
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
      console.log(err)
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
 * Create Single Students
 */
exports.createStudent = async (req, res) =>{

    /**
     * Error Scope
     */
    const {error} = studentValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    if(await Student.findOne({email: req.body.email})) return res.status(400).send("Email already exist")
    if(await Student.findOne({mobile: req.body.mobile})) return res.status(400).send("Mobile number already exist")

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

    /**
     * Response Scope
     */
    try{
        const data = await student.save();
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
        return res.status(500).json({
            'status': 'error',
            'message': err
        });
    }
}

//******************** Student Functions End*************************/


