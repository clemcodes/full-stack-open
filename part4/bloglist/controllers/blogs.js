const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if(!decodedToken.id){
    return res.status(401).json({ error: 'Token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!req.body.title || !req.body.url) {
    res.status(400).send({ error: 'bad request' })
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    try {
      const savedBlog = await blog.save()
      res.status(201).json(savedBlog)

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
    } catch (exception) {
      next(exception)
    }
  
    
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