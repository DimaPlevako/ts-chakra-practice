import React, { useState } from 'react'
import Todo from "../models/todo";


type TodoType = {
    id: string;
    text: string;
    done: boolean;
};

type TodosContextObj = {
    items: TodoType[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    toggleDone: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {},
    toggleDone: () => {},
});

export const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const addTodoHandler = (todoText: string) => {
        setTodos((prev) => prev.concat({ id: Math.random().toString(), text: todoText, done: false }));
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleDoneHandler = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
        console.log(id);
    };

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
        toggleDone: toggleDoneHandler,
    };

    return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>;
};

export default { TodosContextProvider };