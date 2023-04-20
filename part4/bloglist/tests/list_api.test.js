const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('it returns the correct amount of blog in JSON format', async () => {
    const response = await api.get('/api/blogs')
                              .expect(200)
                              .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)
})

test('the blog posts should have unique identifier property id', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => expect(blog._id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
})