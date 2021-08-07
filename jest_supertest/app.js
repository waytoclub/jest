const express = require('express')
require('./db/database')
require('dotenv/config')

const userRoute = require('./routes/user')
const studentRoute = require('./routes/student')
const authRoute = require('./routes/auth')

const app = express()

// Import Routes
app.use(express.json())

/**
 * Main Route Scope
 */
app.use('/api/user', userRoute)
app.use('/api/v1', studentRoute)
app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
   res.send('We are in home.')
})

let server = app.listen(process.env.PORT, function (req, res) {
   console.log('App listening on port ' + process.env.PORT);
});

module.exports = server;
module.exports = app;
