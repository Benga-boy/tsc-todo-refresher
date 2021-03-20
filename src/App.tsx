import { Fragment, useState } from 'react'

type FormElem = React.FormEvent<HTMLFormElement>

// ! Create a representation of the todos
interface ITodo {
  id: string,
  todo: string,
  isComplete: boolean,
}

const App = () => {
  const [text, setText] = useState<string>('')
  const [list, setList] = useState<ITodo[]>([])
  const [error, SetError] = useState<string>('')


  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    const newTodo: ITodo[] = [...list, {id: Math.random().toString(), todo: text, isComplete: false}]
    if (!list.find(item => item.todo === text)) {
      setList(newTodo)
      SetError('')
    } else {
      SetError('Item already exists')
    }
    setText('')
  }

  const completeTask = (id: string): void => {
    setList(list.map(todo => todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo))
  }

  const deleteTask = (id: string): void => {
    setList(list.filter(item => item.id !== id))
  }


  console.log(list)


  return (
    <Fragment>
      <section id="form">
        <h1>TO-DO LISTS</h1>
        <div className="form">
          {error && <p className="form__err">{error}</p>}
        <form onSubmit={handleSubmit} >
          <input onChange={e => setText(e.target.value)} value={text} type="text" name="todo" placeholder="Enter todo" className="form__input" required/>
          <button className="form__btn">Add Todo</button>
        </form>
        </div>
      </section>
      <section id="todos">
        <div className="todos">
          {
            list.length > 0 && list.map(item => <ul className="todos__list" key={item.id}>
              <li className="todos__item">{item.todo}
              {!item.isComplete ? <button onClick={() => completeTask(item.id)} className={`todos__btn ${item.isComplete ? 'complete': ''}`}>Complete</button> : <button onClick={() => completeTask(item.id)} className={`todos__btn ${item.isComplete ? 'complete': ''}`}>Undo Complete</button>}
              <button onClick={() => deleteTask(item.id)} className="todos__dlt">Delete</button>
              </li>
            </ul>)
          }
        </div>
      </section>
    </Fragment>
  )
}

export default App

