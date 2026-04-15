import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = []

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { vote, addNew, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const liked = anecdotes.find(a => a.id === id)
    const newObj = {
      ...liked, votes: liked.votes+1
    }
    const newAnecdote = await anecdoteService.update(id, newObj)
    dispatch(setAnecdotes(anecdotes.map(a => a.id !== id ? a : newAnecdote)))
  }
}


export default anecdotesSlice.reducer