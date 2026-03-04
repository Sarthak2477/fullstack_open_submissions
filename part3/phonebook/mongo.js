const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const url = `mongodb+srv://admin:${password}@cluster0.a7poaxw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url,{family: 4})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}


