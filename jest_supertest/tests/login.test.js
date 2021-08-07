const request = require('supertest')
const express = require('express')
const { json } = require('body-parser')
const app = express()

require('dotenv/config')
app.use(express.json())

beforeAll(async () => {
    const authRoute = require('../routes/auth')
    app.use('/api/auth', authRoute)
})

/************************************Start Cases*********************************/
/*------------------------------------/\/\/\/\--------------------------------*/
  
describe('Login Function Test Cases', () => {
    
    /**
     * 1.
     * Login User
     * Case 1: is JSON
     * Case 2: Status 200
     * Case 3: check header token
     * Case 4: is success
    */
    xit('Login user auth', async () => {
        try{
            const res = await request(app)
            .post('/api/auth/login')
            .send({
                'email': 'sanju@gmail.com',
                'password': 'Hello@123'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

            expect(res.headers.authtoken).toBeTruthy()
            
            let data = JSON.parse(res.text);
            expect(data.status).toBe('success')

            console.log(res.headers.authtoken)

        }catch(err){
            console.log(err)
        }
    })

})

/************************************End Cases*********************************/
/*------------------------------------/\/\/\/\--------------------------------*/






