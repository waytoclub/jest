const mongoose = require('mongoose')
require('dotenv/config')

/**
 * DB Scope
 */
 mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

 mongoose.connection
 .once('open', () => console.log("Connection is healhy."))
 .on('error', error => {
    console.log('Connection error', error);
 })

module.exports = mongoose;
