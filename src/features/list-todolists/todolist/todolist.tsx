import s from "./todolist.module.scss";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/add-item-form/add-item-form";
import {TaskType, TodolistType} from "../../../api/type-api";
import {useAction} from "../../../utils/redux-utils";
import {taskActions} from "./task/task-reducer";
import {Task} from "./task/task";

type OneTodolistType = {
    tasks: TaskType[]
    todolist: TodolistType
}

export const Todolist = React.memo((props: OneTodolistType) => {
    const {getTasksTC,addTaskTC} = useAction(taskActions)
    
    useEffect(() => {
        getTasksTC({todolistId: props.todolist.id})
    }, [])
    const addNewTodolist = useCallback((e: any) => {
        addTaskTC({todolistId:props.todolist.id ,title:e})
    }, [])
    return (
        <div className={s.todolist}>
            <h2>{props.todolist.title}</h2>
            <AddItemForm onClick={addNewTodolist}/>
            <div className={s.taskList}>
                {props.tasks.map((task: TaskType) => {
                    return <Task task={task}/>
                })}
            </div>
            <div className={s.filterBtnBox}>
                <div className={s.filterBtn}>all</div>
                <div className={s.filterBtn}>complited</div>
                <div className={s.filterBtn}>active</div>
            </div>
        </div>

    )
})