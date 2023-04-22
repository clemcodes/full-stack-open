const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlog = {
    title: 'Structure of backend application',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
    likes: 52,
    id: '635ab00b1b54a87a1433502f'
  }

  beforeEach(async () => {
    await Blog.deleteMany();
    await new Blog(initialBlog).save()
  });

test('it returns the correct amount of blog in JSON format', async () => {
    const response = await api.get('/api/blogs')
                              .expect(200)
                              .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)
})

test('the blog posts should have unique identifier property id', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => expect(blog.id).toBeDefined())
})

test('a blog can be added', async () => {
    const newBlog = 
        {
            title: 'test new blog',
            author: 'test new author',
            url: 'test-new-url',
            likes: 0,
          }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(201)
             .expect('Content-Type', /application\/json/)


      let blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(2)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
        'test new blog'
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})