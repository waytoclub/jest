const express = require('express')

const router = express.Router()

// Controllers
const UserController = require('../server/controller/userController');

// INITIAL ROUTE
router.get('/', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

/**
 * Route Auth 
 * */

router.post('/create-user', UserController.createUser);

module.exports = router;

