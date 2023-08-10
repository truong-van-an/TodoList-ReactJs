import { useEffect, useRef, useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";
import {v4 as uuidv4} from 'uuid';
import Swal from "sweetalert2";

import styles from "./TodoWrapper.module.scss"
import EditTodo from "../EditTodo/EditTodo";

uuidv4();


function TodoWrapper() {
    const dataLocal = JSON.parse(localStorage.getItem("todos"));
    const [todos, setTodos] = useState(dataLocal ?? [])
    const waperTodo = useRef(null)
    useEffect(()=>{
        if(todos.length === 0){
            waperTodo.current.style.borderWidth = "0px"
        }
        else{
            waperTodo.current.style.borderWidth = "2px"
        }
    },[todos])

    const addTodo = todo =>{
        var inputAdd = document.querySelector("input[type='text']")
        if(inputAdd.value.length > 0){
            setTodos(()=>{
                const newTodo =[...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]
                const jsonTodo = JSON.stringify(newTodo);
                localStorage.setItem("todos", jsonTodo)
                return newTodo
            })
            Swal.fire(
                '',
                'Thêm mới thành công',
                'success'
              )
        }
        else{
            Swal.fire(
                '',
                'Vui lòng nhập thông tin',
                'error'
              )
        }
    }

    const editTodo = id =>{
        setTodos(todos.map(todo=> todo.id === id ? {...todo,isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id, index) =>{
        let editLocal = JSON.parse(localStorage.getItem("todos"));
        let valInputEditTodo = document.querySelector(".EditTodo_valueInput__zbNC4").value;
        editLocal[index].task = valInputEditTodo;
        localStorage.setItem('todos', JSON.stringify(editLocal))
        setTodos(todos.map(todo=> todo.id === id ? {...todo, task, isEditing: !todo.isEditing}: todo))
        Swal.fire(
            '',
            'Sửa thông tin thành công',
            'success'
          )
    }

    const deleteTodo = (id, value) =>{
        let dataLocal = JSON.parse(localStorage.getItem("todos"));
        dataLocal.splice(value,1)
        localStorage.setItem('todos', JSON.stringify(dataLocal))
        setTodos(()=>{
            const deleteLocal = todos.filter((todo) => todo.id !==id);
            return deleteLocal
        })
        Swal.fire(
            '',
            'Xóa thông tin thành công',
            'success'
          )
    }

    const handleCompleted = id =>{
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))
    }

    return (
        <div className={styles.TodoWrapper}>
            <h2>Todo List</h2>
            <TodoForm addTodo={addTodo}></TodoForm>
            <div ref={waperTodo} className={styles.ListTodo}>
                {todos.map((todo,index)=>(
                    todo.isEditing ? (
                        <EditTodo key={index} editTodo={editTask} task={todo} index={index}/>
                    ): (
                        <Todo key={index} value={index} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} handleCompleted={handleCompleted}/>
                    )
                ))}
            </div>
        </div>
    );
}

export default TodoWrapper;