const ErrorMessage = ({message}) =>{
    return(
        <div style={
            {background: 'grey',
            color: 'red',
            borderStyle: 'solid',
            borderRadius: '5px',
            borderColor: 'red',
            padding: '10px',
            marginBottom: '10px'}
        }>{message}</div>
    )
}

export default ErrorMessage