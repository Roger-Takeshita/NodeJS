const app = require('../src/app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const request = require('supertest');

let userToken = '';
const userOne = {
    name: 'Mike',
    email: 'mike.cabecinha@gmail.com',
    password: 'bananinha'
};
const userTwo = {
    name: 'Roger',
    email: 'Roger@gmail.com',
    password: 'bananinha'
};

//! Before all task
beforeAll(async () => {
    await User.deleteMany();
    const user = await new User(userOne).save();
    userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    userOne._id = user._id;
});

// afterEach(() => {
//     console.log('after each');
// });

test('Should signup a new user', async () => {
    const response = await request(app).post('/users/new').send(userTwo).expect(201);

    //! Check if the database was changed correctly
    const user = await User.findById(response.body.user._id);
    //! check if we found an user
    expect(user).not.toBeNull();
    //! Assertions about the response
    // expect(response.body.user.name).toBe('Roger')
    //! Assertions about the response using an Object (a better way)
    //+ It doesn't matter if the object has extra fields, but the ones that
    //+ We specify has to match
    expect(response.body).toMatchObject({
        user: {
            name: 'Roger',
            email: 'roger@gmail.com'
        }
    });
    userToken = response.body.token;
    userTwo._id = response.body._id;
});

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
    userToken = response.body.token;
});

test('Should loging existing user bad credentials', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'badCredentials'
        })
        .expect(400);
});

test('Should get profile for user', async () => {
    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userToken}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401);
});

test('Should fail to delete account of  unauthenticated user', async () => {
    await request(app).delete('/users/me').send().expect(401);
});

test('Should delete account for authenticated user', async () => {
    await request(app).delete('/users/me').set('Authorization', `Bearer ${userToken}`).send().expect(200);
});

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userTwo.email,
            password: userTwo.password
        })
        .expect(200);
    userToken = response.body.token;
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = User.findById(userTwo._id);
    expect({}).toEqual({});
});
