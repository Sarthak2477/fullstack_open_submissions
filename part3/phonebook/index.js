const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const password = encodeURIComponent(process.env.MONGODB_URI || process.argv[2] || 'sarthakP@2407')
const url = `mongodb+srv://admin:${password}@cluster0.a7poaxw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
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
        number: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    // Must match: 2-3 digits + "-" + digits (at least 1)
                    // And total length must be >= 8
                    const regex = /^\d{2,3}-\d+$/;
                    return regex.test(value) && value.length >= 8;
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        }
    });

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

app.use(cors())
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        res.send(`
            <div>
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date()}</p>
            </div>
        `)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name and number are required' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => {
        res.status(400).send(error.message)
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})