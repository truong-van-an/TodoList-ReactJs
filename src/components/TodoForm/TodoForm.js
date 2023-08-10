import styles from "./Todoform.module.scss"

import { useState, useEffect } from "react";

function TodoForm({addTodo}) {

    const [value, setValue] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        addTodo(value)
        setValue("")
    }

    useEffect(()=>{
        document.title = value || "Todo List";
    }, [value])

    return (
        <form className={styles.TodoForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your task" value={value} onChange={e=> setValue(e.target.value)}/>
            <button type="submit" className={styles.btnAdd} onClick={handleSubmit}>Add</button>
        </form>
    );
}

export default TodoForm;