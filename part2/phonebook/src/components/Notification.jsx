const Notification = ({name}) =>{
    return (<>
    <div className="error" style={
        {background: 'grey',
        color: 'green',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderColor: 'green',
        padding: '10px',
        marginBottom: '10px'}
    }>
        Added {name}
    </div>
    </>)
}

export default Notification;