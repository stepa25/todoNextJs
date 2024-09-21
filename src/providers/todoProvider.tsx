'use client'

import { Ichildren, Itodos, ItodosContextType } from "@/types"
import { createContext, useEffect, useState } from "react"

export const TodoContext = createContext<ItodosContextType | undefined>(undefined)

export const TodoProvider: React.FC<Ichildren> = ({children}) => {
    const [todos, setTodos] = useState<Itodos[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    useEffect(() => {
        const todo = localStorage.getItem("todo")
        if (todo) {
          try {
            setTodos(JSON.parse(todo))
          } catch (error) {
            console.error("Ошибка при парсинге данных из localStorage", error)
            localStorage.removeItem("todo")
          }
        }
      }, [])
    
    useEffect(() => {
    if (todos.length > 0) {
        localStorage.setItem("todo", JSON.stringify(todos))
    }
    }, [todos])

    const onClick = () => {
    if (inputValue === "") return
    setTodos(prev => [...prev, {
        id: Date.now(),
        text: inputValue,
        completed: false
    }])
    setInputValue("")
    }

    const onToggle = (id: number) => {
    setTodos(prev => prev.map(task => 
        task.id === id 
        ? {...task, completed: !task.completed}
        : task 
    ))
    }

    const onDelete = (id: number) => {
    setTodos(prev => prev.filter(task => id !== task.id))
    }

    return (
        <TodoContext.Provider value={{todos, inputValue, setInputValue, onToggle, onDelete, onClick}}>
            {children}
        </TodoContext.Provider>
    )
}