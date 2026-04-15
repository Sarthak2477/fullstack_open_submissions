import { useState } from "react"

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue("")
    }

    const { ...inputs } = { type, value, onChange }
    return {
        inputs,
        reset
    }
}

export default useField