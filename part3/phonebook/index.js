require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', morgan(':body'), (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'The name or number is missing',
        })
    }

    Person.find({name:body.name}, function(err, docs){
        if(docs.length){
            return res.status(400).json({
                error: 'Name exists already',
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
            })
      
            return person.save()
                .then(() => {
                    return res.json(person)
                })
                .catch(error => {
                    return res.status(400).json({
                        error: error.message
                    })
                })
        }
    })

  
})

app.put('/api/persons/:id',(req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new:true })
        .then(updatedPerson => {
            if(person) {
                res.json(updatedPerson)
            }
            res.status(404).end()
            
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(person => {
            if(person) {
                res.status(204).end()
            } else{
                res.sendStatus(404)
            }
        
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.count({}, function(err, count){
        res.send(
            `<p>Phone book has info for ${count} people</p>
                <p>${new Date()}</p>
            `
        )
    })
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
