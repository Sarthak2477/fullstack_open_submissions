import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"


const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      event.preventDefault()
      const content = event.target.value
      dispatch(updateFilter(content))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter