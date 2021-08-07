const express = require('express');

const router = express.Router()

// Controllers
const StudentController = require('../server/controller/studentController');
const verify = require('../server/middleware/varifyToken')


// INITIAL ROUTE
router.get('/', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

router.get('/api', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

/**
 * Route Students CRUD
 * */
router.get('/students', StudentController.listStudent);
router.get('/get-student/:id', verify, StudentController.getStudent);
router.post('/add-student', verify, StudentController.createStudent);
router.patch('/update-student/:id', verify, StudentController.updateStudent);
router.delete('/delete-student/:id', verify, StudentController.removeStudent);

module.exports = router;