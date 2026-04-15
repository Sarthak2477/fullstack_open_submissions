import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"
import useField from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField("")
  const author = useField("")
  const info = useField("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputs.value,
      author: author.inputs.value,
      info: info.inputs.value,
      likes: 0
    })

    navigate("/")
  }

  const onReset = () => {
    content.reset()
    author.reset()
    info.reset()

    console.log(content.value)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputs} />
        </div>
        <div>
          author
          <input {...author.inputs} />
        </div>
        <div>
          url for more info
          <input {...info.inputs} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={onReset}>reset</button>
      </form>
    </div>
  )

}

const Top = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
    </div>
  )
}

const Home = ({ anecdotes, notification }) => {
  console.log(anecdotes)
  return (
    <div>
      <Top />
      <Notification notification={notification} />
      <AnecdoteList anecdotes={anecdotes} />
      <Footer />
    </div>
  )
}

const CreatePage = ({ addNew, vote }) => {
  return (
    <div>
      <Top />
      <CreateNew addNew={addNew} vote={vote} />
      <Footer />
    </div>
  )
}

const AboutPage = () => {
  return (
    <div>
      <Top />
      <About />
      <Footer />
    </div>
  )
}

const AnecdotePage = ({ anecdote }) => {
  return (
    <div>
      <Top />
      <li key={anecdote.id} >{anecdote.content}</li>
      <Footer />
    </div>
  )
}

const Notification = ({ notification }) => {
  return (
    notification ?
      <div style={{ border: "1px solid green" }}>
        {notification}
      </div>
      : null
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`${anecdote.content} added`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch("/anecdotes/:id")
  const matchedAnecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home anecdotes={anecdotes} notification={notification} />} />
        <Route path="/create" element={<CreatePage addNew={addNew} vote={vote} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="anecdotes/:id" element={<AnecdotePage anecdote={matchedAnecdote} />} />
      </Routes>
    </div>
  )
}

export default App
