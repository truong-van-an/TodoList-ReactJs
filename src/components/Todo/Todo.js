import styles from "./Todo.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Todo({todo, value, deleteTodo, editTodo, handleCompleted}) {
    return ( 
        <div className={styles.Todo}>
            <p className={`${todo.completed ? styles.completed : ""}`} onClick={()=> handleCompleted(todo.id)}>{todo.task}</p>
            <div className={styles.Icon}>
                <input type="text" value={value} readOnly hidden/>
                <div className={styles.IconEdit} onClick={()=> editTodo(todo.id)}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </div>
                <div className={styles.IconTrash} onClick={()=> deleteTodo(todo.id, value)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>
        </div>
     );
}
export default Todo;