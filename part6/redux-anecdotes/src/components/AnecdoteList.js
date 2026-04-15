import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state=> state.filter)
    const dispatch = useDispatch()

    const vote = ({id, content}) => {
        console.log(id, content)
        dispatch(voteAnecdote(id))
        
        dispatch(setNotification(`You voted ${content}`, 5))
        
      }

    const anecdotesToShow = () => {
        return anecdotes
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
         
    }

    return (
        <div>
            {anecdotesToShow().sort((a, b) => b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>


            )}
        </div>
    )
}

export default AnecdoteList