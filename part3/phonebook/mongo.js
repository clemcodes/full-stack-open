const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://clemiscoding:${password}@cluster0.cbsk4s8.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema ({
    name: String,
    number: String 
})

const Person = mongoose.model('Person', personSchema);

mongoose
    .connect(url)
    .then(result => {
        console.log('connected')
        if(!name && !number){
           return Person.find({})
                        .then(result => {
                            console.log('phonebook:')
                            result.map(person => {
                                console.log(person.name, person.number)
                            })
                        })
        }

        const person = new Person({
            name,
            number
        })
        console.log(`added ${name} number ${number} to phonebook`)
        return person.save()
    })
    .then(() => {    
        return mongoose.connection.close()
    })
    .catch(err => console.log(err))