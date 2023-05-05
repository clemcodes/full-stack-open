const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if(!req.body.title || !req.body.url) {
    res.status(400).send({ error: 'bad request' })
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
  
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  if(updatedBlog) {
    res.json(updatedBlog)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter