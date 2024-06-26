import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [newtoDo, setNewToDo] = useState("")
  const [toDo, setToDo] = useState([
    { id: 1, title: "Todo 1", complete: true },
    { id: 2, title: "Todo 2", complete: true },
    { id: 3, title: "Todo 3", complete: true },
  ])


  const handleClick = () => {
    setCount(count + 1);
  }
  const handleDown = () => {
    setCount(count - 1);
  }
  const setToDoValue = (data: any) => {
    setNewToDo(data);
  }
  const handleAddTodo = () => {
    const todo = { id: toDo.length + 1, title: newtoDo, complete: true };
    setToDo([...toDo, todo]);
  }
  const handleDelete = (id: any) => {
    if (window.confirm('Ok ???')) {
      const newToDo = toDo.filter((data) => data.id !== id);
      setToDo(newToDo);
    }
  }
  const handleUpdate = (id: any) => {
    alert(id)
  }


  return (
    <>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input onChange={(e) => setToDoValue(e.target.value)} type="text" className="form-control" name='title' id="title" />
      </div>
      <button onClick={handleAddTodo} type="submit" className="btn btn-primary mb-3">Submit</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {toDo.map((data, index) => (
            <tr>
              <th scope="row" key={index}>{data.id}</th>
              <td>{data.title}</td>
              <td>
                <button onClick={() => handleDelete(data.id)} className='btn btn-danger'>Delete</button>
                <button onClick={() => handleUpdate(data.id)} className='btn btn-warning'>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <h1>Em Hank</h1>
      <h1>{count}</h1>
      <button onClick={handleClick}>Up</button>
      <button onClick={handleDown}>Down</button>
    </>
  )
}

export default App
