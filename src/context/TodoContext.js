
import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [],
    addTodo: () => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;

//as we used the lightmode nd darkmode fuctions nd defined it in app so same we did addtodo