import { useEffect, useState } from 'react';
import './App.css';


interface ITodo {
  id?: number | string;
  title: string;
  complete: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id?: number | string, title: string }>({ id: undefined, title: '' });

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTodos(data);
      });
  }, []);

  const handleClickAdd = () => {
    const data: ITodo = {
      title: newTodo,
      complete: true
    };
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then((data: ITodo) => {
        setTodos([...todos, data]);
        setNewTodo(''); // Clear input after adding
        alert("Thêm mới thành công");
      });
  };

  const setNewTodoValue = (value: string) => {
    setNewTodo(value);
  };

  const setEditTodoValue = (id: number | string, value: string) => {
    setEditTodo({
      id: id,
      title: value
    });
  };

  const onDelete = (id: number | string) => {
    if (confirm("Are you sure you want to delete")) {
      fetch("http://localhost:3000/todos/" + id, {
        method: "DELETE"
      }).then(() => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        alert("Xóa thành công");
      });
    }
  };

  const changeStatus = (id: number | string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, complete: !todo.complete };
        fetch("http://localhost:3000/todos/" + id, {
          method: "PUT",
          body: JSON.stringify(updatedTodo),
          headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
          .then(() => {
            setTodos(prevTodos => prevTodos.map(t => t.id === id ? updatedTodo : t));
          });
      }
      return todo;
    });
  };

  const updateTodo = (id: number | string) => {
    const updatedTodo = { ...todos.find(todo => todo.id === id)!, title: editTodo.title, complete: true };
    fetch("http://localhost:3000/todos/" + id, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then(() => {
        setTodos(prevTodos => prevTodos.map(t => t.id === id ? updatedTodo : t));
        setEditTodo({ id: undefined, title: '' });
      });
  };

  return (
    <>
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodoValue(e.target.value)}
      />
      <button onClick={handleClickAdd}>Thêm danh sách</button>
      <ul>
        {todos.map((todo: ITodo) => (
          todo.complete ? (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => changeStatus(todo.id!)}>Sửa</button>
              <button onClick={() => onDelete(todo.id!)}>Xóa</button>
            </li>
          ) : (
            <li key={todo.id}>
              <input
                type='text'
                value={editTodo.id === todo.id ? editTodo.title : todo.title}
                onChange={(e) => setEditTodoValue(todo.id!, e.target.value)}
              />
              <button onClick={() => updateTodo(todo.id!)}>Lưu</button>
              <button onClick={() => changeStatus(todo.id!)}>Hủy</button>
            </li>
          )
        ))}
      </ul>
    </>
  );
}

export default App;