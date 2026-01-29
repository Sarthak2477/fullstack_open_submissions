const PersonForm = ({ addPerson, newName, setNewName, newContact, setNewContact }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        contact: <input value={newContact} onChange={(event) => setNewContact(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm