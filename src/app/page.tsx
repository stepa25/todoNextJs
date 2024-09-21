'use client'

import { Task } from "@/components/task";
import styles from "./styles.module.scss"
import { useContext } from "react";
import { TodoContext } from "@/providers/todoProvider";

const Home: React.FC = () => {
  const context = useContext(TodoContext)
  
  if (!context) return null
  
  const {inputValue, onClick, onDelete, onToggle, setInputValue, todos } = context

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