const app = require('../src/app');
const User = require('../src/models/user');
const request = require('supertest');
const { userOne, userTwo, setupDatabase } = require('./fixtures/db');

//! Before each task
beforeEach(setupDatabase);

//! After each task
// afterEach(() => {});

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users/new')
        .send({ name: 'Roger', email: 'roger@gmail.com', password: 'bananinha' })
        .expect(201);

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
});

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
});

test('Should not loging existing user bad credentials', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'badCredentials'
        })
        .expect(400);
});

test('Should get profile for user', async () => {
    await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.token}`).send().expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401);
});

test('Should fail to delete account of unauthenticated user', async () => {
    await request(app).delete('/users/me').send().expect(401);
});

test('Should delete account for authenticated user', async () => {
    await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.token}`).send().expect(200);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOne._id);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    const newName = 'Mike Wazowski';
    await request(app)
        .put(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({ name: newName })
        .expect(200);
    const user = await User.findById(userOne._id);
    expect(user.name).toEqual(newName);
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .put(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({ firstName: 'Mike W' })
        .expect(400);
});

test('Should not signup with invalid/name/email/pasword', async () => {
    await request(app)
        .post('/users/new')
        .send({ name: 'new', email: 'invalid@gmail.com', password: '1234' })
        .expect(400);
});

test('Should not update user if unauthenticated', async () => {
    await request(app).put(`/users/${userTwo._id}`).send({ name: 'Mike Wazowski' }).expect(401);
});

test('Should not update user with invalid name/email/password', async () => {
    await request(app)
        .put(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({ name: '', email: '', password: '' })
        .expect(500);
});

test('Should not delete user if unauthenticated', async () => {
    await request(app).delete(`/users/me`).expect(401);
});
