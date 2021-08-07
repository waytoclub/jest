const Joi = require('@hapi/joi');

const studentValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        mobile: Joi.number().min(10).positive().required(),
        dob: Joi.date().required(),
        gender: Joi.string().required(),
        address: Joi.string().max(100).required(),
        active: Joi.boolean().required()
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(data)
}

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        username: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(data)
}

module.exports.studentValidation   = studentValidation;
module.exports.loginValidation     = loginValidation;
module.exports.userValidation      = userValidation;