import personService from '../services/persons'

const Persons = ({ persons, filter,deletePerson }) => {
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
    }
  }
  return (
    <div>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(person =>
          <p key={person.number}>
            {person.name} {person.number}
            <button onClick={()=>handleDelete(person.id, person.name)}>Delete</button>
          </p>
        )}
    </div>
  )
}

export default Persons