require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/persons', morgan(':body'), (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'The name or number is missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
  })
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phone book has infor for ${persons.length}</p>
         <p>${new Date()}</p>
        `
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
