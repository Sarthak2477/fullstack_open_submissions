import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newContact, setNewContact] = useState('')
  const [filter, setFilter] = useState('')
  const [isNotificationVisible, setisNotificationVisible] = useState(false)
  const [showError, setshowError] = useState(false)
  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const deletePerson = (id) => {
    personService.deletePerson(id).then(response => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert(`Enter contact name`)
      return
    }
    if (newContact === '') {
      alert(`Enter contact number`)
      return
    }
    let existingPerson = false
    personService.getAll().then(response => {
      console.log(response.data)
      existingPerson = persons.find(p => p.name === newName)
      console.log(existingPerson)
      if (existingPerson) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          if (response.data.find(person => person.name === newName)) {
            personService.update(existingPerson.id, { name: newName, number: newContact }).then(response => {
              setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))
              setNewName('')
              setNewContact('')
              setisNotificationVisible(true);

              setTimeout(() => {
                setisNotificationVisible(false);
              }, 3000);
            })
          } else {
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setshowError(true)
            setTimeout(() => {
              setshowError(false);
              setNewName('')
              setNewContact('')
            }, 3000);
          }
        }
        return
      } else {
        personService.create({ name: newName, number: newContact }).then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewContact('')
        })
        setisNotificationVisible(true);

        setTimeout(() => {
          setisNotificationVisible(false);
        }, 3000);
      }
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      {isNotificationVisible && <Notification name={persons[persons.length - 1]?.name} />}
      {showError && <ErrorMessage message={`${newName} not found`} />}
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newContact={newContact}
        setNewContact={setNewContact}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App