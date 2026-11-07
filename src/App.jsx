import { useState ,useEffect} from 'react'
import { TodoProvider } from './context';
import { TodoForm, TodoItem } from './components';


function App() {
const [todos, setTodos] = useState([])

const addTodo = (todo) => {
    setTodos((prev) => [
        ...prev,
        { ...todo, id: Date.now() }
    ])
}
//date.now means each time i will give different id to each todo item. it will give the current time in milliseconds since 1970. so each time we add a todo item it will have a unique id.

const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)))
}
//map is used to iterate over the todos array and check if the id of the todo item matches the id passed to the function. if it matches then we update the todo item with the new todo object passed to the function. otherwise we return the existing todo item.

const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
}
//filter is used to iterate over the todos array and check if the id of the todo item matches the id passed to the function. if it matches then we remove the todo item from the array. otherwise we return the existing todo item.


const toggleComplete = (id) => {
    setTodos((prev) =>
        prev.map((t) =>
            t.id === id
                ? { ...t, completed: !t.completed }
                : t
        )
    )
}
//map is used to iterate over the todos array and check if the id of the todo item matches the id passed to the function. if it matches then we toggle the completed property of the todo item. otherwise we return the existing todo item.
//the spread operator is used to create a new object with the existing properties of the todo item and update the completed property to its opposite value.

useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
    }

    if(storedTodos && JSON.parse(storedTodos).length > 0){
        setTodos(JSON.parse(storedTodos))
    }
}, [])
//this useEffect is used to get the todos from localstorage when the app is loaded. it will run only once when the app is loaded. it will check if there are any todos in localstorage and if there are then it will set the todos state with the todos from localstorage.

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                       {todos.map((todo) => (
                        <div key={todo.id}
                        className="w-full bg-[#1e2f4c] border border-black/10 rounded-lg shadow-sm px-3 py-1.5 text-white">
                            <TodoItem todo={todo} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
 
</TodoProvider>
  )
}
export default App
//we use state bcz todo ayegy osko save kregy tu state chnge hungy