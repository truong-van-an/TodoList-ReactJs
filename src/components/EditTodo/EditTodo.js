import styles from "./EditTodo.module.scss"

import { useState, useEffect } from "react";

function EditTodo({editTodo, task, index}) {

    const [value, setValue] = useState(task.task)
    const handleSubmit = (e)=>{
        e.preventDefault();
        editTodo(value, task.id, index)
        setValue("")
    }
    useEffect(()=>{
        document.title = value;
    },[value])

    return (
        <form className={styles.TodoForm} onSubmit={handleSubmit}>
            <input type="text" value={index} readOnly hidden/>
            <input type="text" className={styles.valueInput} placeholder="Update task" value={value} onChange={e=> setValue(e.target.value)}/>
            <button type="submit" className={styles.btnEdit} onClick={handleSubmit}>Update</button>
        </form>
    );
}
export default EditTodo;