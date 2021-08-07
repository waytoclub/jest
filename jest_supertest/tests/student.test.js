const request = require('supertest')
const express = require('express')
const { json } = require('body-parser')
const { login } = require('../server/controller/loginController')
const app = express()


require('dotenv/config')

app.use(express.json())

beforeAll(async () => {
    const studentRoute = require('../routes/student')
    app.use('/api/v1', studentRoute)
    const authRoute = require('../routes/auth')
    app.use('/api/auth', authRoute)
})

/************************************Start Cases*********************************/
/*------------------------------------/\/\/\/\--------------------------------*/
  
describe('Students Functional testing', () => {
    
    // token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw
    /**
     * 1.
     * Listing Student
     * Case 1: is JSON
     * Case 2: Status 200
     * Case 3: is json has success
     * Case 4: is data count is more than 0
    */
    xit('student list test cases', async () => {
        try{

            const res = await request(app)
            .get('/api/v1/students')
            .set('Accept', 'application/json')
            .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
            // .expect('Content-Type', /json/)
            .expect(200)

            let data = JSON.parse(res.text)
            console.log(data)
            expect(data.status).toBe('success')
            expect(data.data.length).toBeGreaterThan(0)

            console.log(data)   
        }catch(err){
            console.log(err)
        }
    })

    /**
    * 2.
    * List Student Empty
    * Case 1: is JSON
    * Case 2: Status 200
    * Case 3: is json has success
    * Case 4: is data count is more than 0
    */
    xit('if student list is empty', async () => {
        const res = await request(app)
        .get('/api/v1/students')
        .set('Accept', 'application/json')
        .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
        .expect('Content-Type', /json/)
        .expect(200)

        let data = JSON.parse(res.text);

        expect(data.status).toBe('success')
        expect(data.data.length).toBe(0)
    })

    /**
     * 3.
     * Get Student
     * Case 1: is JSON
     * Case 2: Status 200
     * Case 3: is json has success
     * Case 4: is data equal to sent data
    */
    xit('Get student test cases', async () => {
        try{

            const res = await request(app)
            .get('/api/v1/get-student/604f7c923b99b40a3eea7443')
            .set('Accept', 'application/json')
            .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
            .expect('Content-Type', /json/)
            .expect(200)

            let data = JSON.parse(res.text);

            expect(data.status).toBe('success')
            expect('604f7c923b99b40a3eea7443').toEqual(data.data._id)
            
            console.log(data.data)
        }catch(err){
            console.log(err)
        }
    })

    xit('Get student: id not found test cases', async () => {
        try{

            const res = await request(app)
            .get('/api/v1/get-student/123')
            .set('Accept', 'application/json')
            .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
            .expect('Content-Type', /json/)
            .expect(404)

        }catch(err){
            console.log(err)
        }
    })

    /**
    * 4. 
    * Add Student
    * Case 1: is JSON
    * Case 2: Status 200
    * Case 3: validate data
    */
    xit('student Add test cases', async () => {
        try{
            const res = await request(app)
            .post('/api/v1/add-student')
            .send({
               name: 'Liji Panikar',
               email: 'liji@gmail.com',
               mobile: '9901209017',
               dob: '2021-11-01',
               gender: 'Male',
               address: 'abc',
               active: true
            })
            .set('Accept', 'application/json')
            .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
            // .expect('Content-Type', /json/)
            .expect(201)

            let data = JSON.parse(res.text);

            expect('liji@gmail.com').toBe(data.data.email);
        }catch(err){
            console.log(err)
        }
    })

    /**
    * 5.
    * Add Student, already exist
    * Case 1: is JSON
    * Case 2: Status 400 if redudent
    * Case 3: validate data
    */
    xit('student Add test cases', async () => {
        try{
            const res = await request(app)
            .post('/api/v1/add-student')
            .send({
               name: 'john Thomas1',
               email: 'jogn1@gmail.com',
               mobile: '9901109057',
               dob: '2021-11-01',
               gender: 'Male',
               address: 'abc',
               active: true
            })
            .set('Accept', 'application/json')
            .set('authtoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4ODUyMDd9.Q67bjRWMTlUP3o2YsWtYEPIL1MByqAyYmHup6C0oLBw')
            .expect(403)
        }catch(err){
            console.log(err)
        }
    })

    /**
    * 6. 
    * Update Student
    * Case 1: is JSON
    * Case 2: Status 200
    * Case 3: validate data nModified to be 1
    */
    xit('student Update test cases', async () => {
        try{
            const res = await request(app)
            .patch('/api/v1/update-student/604f74ae27a4897df4a6c88c')
            .send({
               name: 'john Thomas',
            })
            .set('Accept', 'application/json')
            .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4NzU2ODV9.dG61UroNTSru54i9zQreedSA716GZJegSb04QSd_5F4')
            .expect('Content-Type', /json/)
            .expect(200)

            let data = JSON.parse(res.text);

            expect(1).toEqual(data.data.nModified);
        }catch(err){
            console.log(err)
        }
    })

    /**
    * 7. 
    * Delete Student
    * Case 1: is JSON
    * Case 2: Status 200
    * Case 3: validate data nModified to be 1
    */
    xit('student Delete test cases', async () => {
        try{
            const res = await request(app)
            .delete('/api/v1/delete-student/604f8294b621160bc5ad9862')
            .set('Accept', 'application/json')
            .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlMDRkODA4M2FjZjI3YWU1Y2JhZWYiLCJpYXQiOjE2MTU4NzU2ODV9.dG61UroNTSru54i9zQreedSA716GZJegSb04QSd_5F4')
            // .expect('Content-Type', /json/)
            .expect(200)

            let data = JSON.parse(res.text);
            
            expect(1).toEqual(data.data.deletedCount);
        }catch(err){
            console.log(err)
        }
    })

})


/************************************End Cases*********************************/
/*------------------------------------/\/\/\/\--------------------------------*/






