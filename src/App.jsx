import 'boxicons/css/boxicons.min.css';
import { useEffect, useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((items) => {
      return items.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleDel = (e, id) => {
    let newTodos = todos.filter((items) => {
      return items.id !== id;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    savetoLS();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && todo.length >= 3) {
      handleAdd();
    }
  }


  const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  const date = new Date().toLocaleDateString("en-US", dateOptions);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col bg-gradient-to-br from-green-400 to-blue-500">
        <div className=" border border-solid border-gray-300 rounded-2xl sm:w-96 min-h-[500px] h-auto flex flex-col items-start bg-white shadow-lg">
          <div className="date my-5 font-medium mx-5 text-xl">
            {formatDate(date)}
          </div>
          <div className='flex justify-between w-9/12 mx-9'>
            <div className="created-tasks text-center"><div>{todos.length}</div> <strong>Created Task</strong> </div>
            <div className="completed-task text-center"><div>{(() => {                 //an example of iife (Immediately Invoked Function Expression)
              return todos.filter(todo => todo.isCompleted).length;
            })()}</div><strong>Completed Task</strong></div>
          </div>
          <div className="Add_todo w-full flex items-center my-2">
            <input
              name='todo.id'
              type="text"
              onChange={handleChange}
              onKeyPress={handleEnter}
              className='w-4/6 rounded-lg mx-5 mt-3 text-black border border-gray-300 px-2 py-1'
              value={todo}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className='border border-gray-300 rounded-lg bg-green-600 text-white px-4 py-2 mx-1 my-3 hover:bg-green-700'
            >
              Add
            </button>
          </div>
          <div className="todos my-3 mx-5 flex flex-col w-[87%]">
            {todos.length === 0 && <div>No todos to display</div>}
            {todos.map((item) => {
              return (
                <div className="checkbox flex items-center my-1" key={item.id}>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='custom-checkbox'
                  />
                  <div className={`ml-3 w-5/6 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                  <div className="buttons flex">
                    <button
                      onClick={(e) => { handleEdit(e, item.id); }}
                      className='text-xl mx-1 text-blue-500 hover:text-blue-700'
                    >
                      <i className='bx bx-edit'></i>
                    </button>
                    <button
                      onClick={(e) => { handleDel(e, item.id); }}
                      className='text-xl text-red-500 hover:text-red-700'
                    >
                      <i className='bx bx-trash'></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const formatDate = (dateString) => {
  const [weekday, rest] = dateString.split(', ');
  return (
    <span><strong>{weekday}</strong>, {rest}</span>
  );
}

export default App;
