'use client'

import { Task } from "@/components/task";
import { Itodos } from "@/types";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

const Home: React.FC = () => {
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
    <div className={styles.wrapper}>
        <div className={styles.app}>
            <div className={styles.appControls}>
                <input 
                 className={styles.appControlsSearch} 
                 value={inputValue} 
                 onChange={(e) => setInputValue(e.target.value)}/>

                <button className={styles.appControlsClick} onClick={onClick}>Отправить</button>
            </div>
            <div className={styles.appList}>
                {todos.map(task => <Task {...task} key={task.id} onToggle={() => onToggle(task.id)} onDelete={() => onDelete(task.id)}/>)}
            </div>
        </div>
    </div>
  );
}

export default Home