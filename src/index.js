import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import AddTodo from './addTodo';
import SearchTodo from './searchTodo';
import axios from 'axios';
import './app.css';
// let i = -1;

function App() {
  const [todo, setTodo] = useState([]);
  const [item, setItem] = useState('');
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    // if (localStorage.getItem("todo")) {
    //   setTodo(JSON.parse(localStorage.getItem("todo")))
    // } else {
    //   localStorage.setItem("todo", JSON.stringify([]));
    // }
    axios.get('http://127.0.0.1:3000/todos')
      .then(res => {
        setTodo(res.data)
      })
      .catch(error => console.log(error))
  }, []);

  const addTodo = (title) => {
    if (item !== '') {
      // i = i + 1;
      // let x = [...todo, { id: i, text: item, complete: false }];
      // setTodo(x);
      // localStorage.setItem("todo", JSON.stringify(x));
      const data = {title : title, completed: '0'}
      axios.post("http://127.0.0.1:3000/todos/createTodo", data)
        .then(res => {
          setTodo(res.data)
        })
        .catch(error => console.log(error))
      setItem('');
    }
  }

  const deleteTodo = (id) => {
    // let x = todo.filter((todo) => {
    //   return todo.id !== id;
    // });
    // setTodo(x);
    // localStorage.setItem("todo", x);
    axios.delete(`http://127.0.0.1:3000/todos/${id}`)
    .then(res => {
      setTodo(res.data)
    })
    .catch(error => console.log(error))

  }

  const updateTodo = (title,completed,id) =>{
    if(title !== ''){
      console.log({title,completed,id})
      const data = {title : title, completed: completed}
      axios.put(`http://127.0.0.1:3000/todos/${id}`,data)
      .then(res => {
        console.log(res.data)
        setTodo(res.data)
      })
      .catch(error => console.log(error))
    }
  }

  const handleOnChange = (title,completed,id) => {
    console.log(id)
    const mapped = todo?.map(task => {
      return task.id === id ? { ...task, completed: task.completed === '0' ? '1' : '0'} : { ...task };
    })
    updateTodo(title, completed === '0' ? '1' : '0', id)
    setTodo(mapped);
    // localStorage.setItem("todo", JSON.stringify(mapped));
  }

  let todoList = '';
  if (searchValue === "") {
    todoList = todo?.map((t, index) => {
      return (
        <div className='todo'>
          <input checked={t.completed === '1'} className='checkbox' type="checkbox" onChange={() => handleOnChange(t.title, t.completed, t.id)}></input>
          <div className='row'>
            <span className={t.completed === '0' ?  "text" : "line"}>{t.title}</span>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => deleteTodo(t.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    });
  } else {
    todoList = todo?.map((t, i) => {
      if (t.title.search(searchValue) !== -1) {
        return (
          <div className='todo'>
            <input checked={t.completed === '1'} className='checkbox' type="checkbox" onChange={() => handleOnChange(t.id)}></input>
            <span className={t.completed === '0' ? "text" : "line"}>{t.title}</span>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => deleteTodo(t.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <h1>Todo</h1>
      <SearchTodo searchValue={searchValue} setSearchValue={setSearchValue} />
      <br></br>
      <AddTodo addTodo={addTodo} setItem={setItem} item={item} />
      <div className='todoList'>
        {todoList.length !== 0 ? todoList : <h2>No Todos!!!</h2>}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
