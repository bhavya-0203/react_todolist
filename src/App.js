import TodoList from './components/TodoList';
import Form from './components/Form';
import './App.css';
import React, {useState, useEffect} from 'react';
function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([]);
  const filterHandler = ()  => {
    switch(status){
    case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
    case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
    default:
        setFilteredTodos(todos);
        break;    
    }
};
useEffect(() => {
  filterHandler();
}, [todos, status]);
const saveLocalTodos = () => {
  localStorage.setItem("todos",JSON.stringify(todos));
};
const getLocalTodos = () => {
  if (localStorage.getItem("todos") === null){
  localStorage.setItem("todos",JSON.stringify([]));
  } else {
  let todoLocal = JSON.parse(localStorage.getItem('todos'))
  setTodos(todoLocal);
  }
}
useEffect(() => {
                
  filterHandler();
  saveLocalTodos();
}, [todos, status]);
  return (
    <div className="App">
      <header>
                <h1>React Todo List App</h1>
            </header>
            <Form inputText={inputText} todos={todos} setTodos={setTodos}  setInputText={setInputText} setStatus={setStatus} />
            <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
            
    </div>
  );
 
}

export default App;