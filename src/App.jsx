import 'boxicons/css/boxicons.min.css';
import { useEffect, useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo)
    let newTodos = todos.filter(items => {
      return items.id !== id;
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleDel = (e, id) => {
    let newTodos = todos.filter(items => {
      return items.id !== id;
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    const index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    savetoLS()
  }


  const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  const date = new Date().toLocaleDateString("en-US", dateOptions);


  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col bg-slate-300">
        <div className="border border-solid border-black rounded-2xl w-80 h-screen my-4 flex flex-col items-start bg-zinc-500">
          <div className="date my-3 font-medium mx-3 text-xl">
            {formatDate(date)}
          </div>
          <div className='flex justify-between w-9/12 mx-9'>
            <div className="created-tasks">Created Task</div>
            <div className="completed-task">Completed Task</div>
          </div>
          <div className="Add_todo w-full">
            <input name='todo.id' type="text" onChange={handleChange} className='w-4/6 rounded-xl mx-4 mt-3 text-black border-none' value={todo} /><button onClick={handleAdd} disabled={todo.length < 3} className='border border-black Add bg-lime-600'>Add</button>
          </div>
          <div className="todos my-3 mx-5 flex flex-col w-[87%]">
            {todos.length === 0 && <div>No todos to display</div>}
            {todos.map(item => {
              return <div className="checkbox flex items-center my-1" key={item.id}>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" value={todo.isCompleted} className='custom-checkbox flex items-center' />
                <div className={`ml-3 w-5/6 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                <div className="buttons flex">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='text-xl'><i className='bx bx-edit'></i></button>
                  <button onClick={(e) => { handleDel(e, item.id) }} className='text-xl'><i className='bx bx-trash'></i></button>
                </div>
              </div>
            })}
          </div>

        </div>
      </div >

    </>
  )
}

const formatDate = (dateString) => {
  const [weekday, rest] = dateString.split(', ');
  return (
    <span><strong>{weekday}</strong>, {rest}</span>
  )
}

export default App;