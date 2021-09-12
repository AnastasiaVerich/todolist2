import s from "./todolist.module.scss";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/add-item-form/add-item-form";
import {TaskType, TodolistType} from "../../../api/type-api";
import {useAction} from "../../../utils/redux-utils";
import {taskActions} from "./task/task-reducer";
import {Task} from "./task/task";
import {todolistActions} from "./todolist-reducer";
import {ChahgeInput} from "../../../components/editable-span/editable-span";

type OneTodolistType = {
    tasks: TaskType[]
    todolist: TodolistType
}

export const Todolist = React.memo((props: OneTodolistType) => {
    const {getTasksTC, addTaskTC} = useAction(taskActions)
    const {deleteTodolistTC, updateTodolistTC} = useAction(todolistActions)


    useEffect(() => {
        getTasksTC({todolistId: props.todolist.id})
    }, [])
    const addNewTask = useCallback((e: any) => {
        addTaskTC({todolistId: props.todolist.id, title: e})
    }, [])
    const deleteTodolist = useCallback(() => {
        deleteTodolistTC({todolistId: props.todolist.id})
    }, [])
    const updateTodolist = useCallback((title: string) => {
        updateTodolistTC({todolistId: props.todolist.id, title:title})
    }, [])
    return (
        <div className={s.todolist}>
            <div className={s.header}>
                <ChahgeInput title={props.todolist.title} onClick={updateTodolist}/>
                <div className={s.deleteIconBTN} onClick={deleteTodolist}>delete Tl</div>
            </div>
            <AddItemForm onClick={addNewTask}/>
            <div className={s.taskList}>
                {props.tasks.length!==undefined ?
                    props.tasks.map((task: TaskType) => {
                    return <Task task={task} todolist={props.todolist}/>
                })
                :<></>}
            </div>
            <div className={s.filterBtnBox}>
                <div className={s.filterBtn}>all</div>
                <div className={s.filterBtn}>complited</div>
                <div className={s.filterBtn}>active</div>
            </div>
        </div>
    )
})
