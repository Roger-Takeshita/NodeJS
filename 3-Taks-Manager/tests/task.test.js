const app = require('../src/app');
const Task = require('../src/models/task');
const request = require('supertest');
const { userOne, userTwo, setupDatabase, taskOne, taskTwo, taskThree } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks/new')
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({ description: 'From my test' })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Shoud get tasks from a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.token}`)
        .expect(200);
    expect(response.body.length).toBe(2);
});

test('Should not delete task from other users', async () => {
    await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .expect(404);
    const task = await Task.findById(taskThree._id);
    expect(task).not.toBeNull();
});

test('Should delete task from his user', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .expect(200);
    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull();
});
