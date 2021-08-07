const express = require('express')

const router = express.Router()

// Controllers
const LoginController = require('../server/controller/loginController');

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

router.post('/login', LoginController.login);

module.exports = router;

