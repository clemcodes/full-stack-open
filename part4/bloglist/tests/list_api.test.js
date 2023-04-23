const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlog = [{
    title: 'Structure of backend application',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
    likes: 52,
    id: '635ab00b1b54a87a1433502f'
  }]

beforeEach(async () => {
    await Blog.deleteMany();
    await Blog.insertMany(initialBlog)
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

test('blog without likes default to 0', async () => {
    const newBlogWithoutLikes = 
        {
            title: 'test blog without likes',
            author: 'test new author',
            url: 'test-new-url'
          }

    await api.post('/api/blogs')
             .send(newBlogWithoutLikes)
        

      let blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd[1].likes).toBe(0)

})

test('blog without title is not added', async () => {
    const newBlogWithoutTitle = {
        author: 'test new author',
        url: 'test-new-url',
        likes: 0
      }

    await api.post('/api/blogs')
             .send(newBlogWithoutTitle)
             .expect(400)

    let blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(initialBlog.length)

}) 

test('blog without url is not added', async () => {

    const newBlogWithoutUrl = {
        title: 'test blog without likes',
        author: 'test new author',
        likes: 0
    }

    await api.post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)


    let blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(initialBlog.length)

})

afterAll(async () => {
    await mongoose.connection.close()
})