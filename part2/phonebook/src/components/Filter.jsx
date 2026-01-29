const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder='Search...'/>
    </div>
  )
}

export default Filter