const request = require('supertest');
const user = require('../models/user.js');
const { signup, signin, signout} = require('../controllers/auth');
const {getUser} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
let signin_data={email:"suyash@gmail.com", password:"qwerty123456"}
let signup_data = {
    name: 'kaustubh',
    email: 'kaustubh1@gmail.com',
    password: 'qwerty123456'
   };
const app = require('../app');

describe('Test For Signup', function () {
    it('Case 1 : Existing user', function(done){
                
        request("http://localhost:8080")
        .post('/signup',signup)
        .send(signup_data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });  
});

describe('Test For Signin', function(){
        it(' Case :Successful Signin', function(){
            request('http://localhost:8080')
            .post('/signin', signin)
            .send(signin_data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /JSON/)
            .expect(200,user)
        });

        
    });
    describe('Test For Signin', function(){
        it(' Case :Unsuccessful Signin', function(){
            let signin_data={email:"suyash@gmail.com", password:"qwert1234"};
            request('http://localhost:8080')
            .post('/signin', signin)
            .send(signin_data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401,user);
        });
    });
    

    describe('Test For Get User By ID', function(){
        it('Case: Get User Successfully', function(){
            // let userid = "5e3d05d613bbd14a2b05c8cb"
            request('http://localhost:8080')
            .get('/user/5e3d05d613bbd14a2b05c8cb',requireSignin,getUser)
            .expect(200,user);
        });
    });

    describe('Test For Signout', function(){
        it('Successful Signout', function(){
            request('http://localhost:8080')
            .get('/signout',signout)
            .expect(304,user);
        });
    });

    // Reference https://hackernoon.com/api-testing-using-supertest-1f830ce838f1