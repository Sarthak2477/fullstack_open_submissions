import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button id="open-togglable" onClick={toggleVisibility}>{props.viewlabel}</button>
            </div>
            <div id="content" style={showWhenVisible}>
                {props.children}
                <button id="close-togglable" onClick={toggleVisibility}>{props.cancellabel}</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    viewlabel: PropTypes.string.isRequired,
    cancellabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable