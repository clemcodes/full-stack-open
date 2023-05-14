const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})

  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res, next) => {
  const body =req.body

  if(!body.title || !body.url) {
    res.status(400).send({ error: 'bad request' })
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: req.user.id
    })

    try {
      const savedBlog = await blog.save()
      res.status(201).json(savedBlog)

      req.user.blogs = req.user.blogs.concat(savedBlog._id)
      await req.user.save()
    } catch (exception) {
      next(exception)
    }
  
    
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {

  const blog = await Blog.findById(req.params.id)

  if(blog.user.toString() !== req.user.id.toString()){
    res.status(401).json({ error: 'unauthorized operation' })
  } 

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (req, res, next) => {
  const body = req.body

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: req.user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  if(updatedBlog) {
    res.json(updatedBlog)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter