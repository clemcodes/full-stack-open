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

app.put('/api/persons/:id',(req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new:true })
        .then(updatedPerson => {
            if(updatedPerson === null) {
                res.status(404).end()
            }
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
        if(result === null) {
            res.status(404).end()
        }
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phone book has infor for ${persons.length}</p>
         <p>${new Date()}</p>
        `
  )
})

const errorHandler = (error, req, res, next) => {
    console.log('error message', error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({ error:'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
