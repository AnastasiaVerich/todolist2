import s from "./todolist.module.scss";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/add-item-form/add-item-form";
import {TaskStatuses, TaskType, TodolistType} from "../../../api/type-api";
import {useAction} from "../../../utils/redux-utils";
import {taskActions} from "./task/task-reducer";
import {Task} from "./task/task";
import {FilterType, todolistActions, TodolistTypeWithFilter} from "./todolist-reducer";
import {ChahgeInput} from "../../../components/editable-span/editable-span";

type OneTodolistType = {
    tasks: TaskType[]
    todolist: TodolistTypeWithFilter
}

export const Todolist = React.memo((props: OneTodolistType) => {
    const {getTasksTC, addTaskTC} = useAction(taskActions);
    const {deleteTodolistTC, updateTodolistTC, setFilter} = useAction(todolistActions);

    const onChangeFilter = useCallback((filter: FilterType) => {
        setFilter({filter: filter, todolistId: props.todolist.id})
    }, [props.todolist.id])

    let arrayTask = props.tasks;

        if (props.todolist.filter === "all") {
            arrayTask = props.tasks
        }
        if (props.todolist.filter === "active") {
            arrayTask = props.tasks.filter((t) => t.status === TaskStatuses.New)
        }
        if (props.todolist.filter === "complited") {
            arrayTask = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
        }



    useEffect(() => {
        getTasksTC({todolistId: props.todolist.id})
    }, [])
    const addNewTask = useCallback((e: any) => {
        addTaskTC({todolistId: props.todolist.id, title: e})
    }, [props.todolist.id])
    const deleteTodolist = useCallback(() => {
        deleteTodolistTC({todolistId: props.todolist.id})
    }, [props.todolist.id])
    const updateTodolist = useCallback((title: string) => {
        updateTodolistTC({todolistId: props.todolist.id, title: title})
    }, [props.todolist.id])

    return (
        <div className={s.todolist}>
            <div className={s.header}>
                <ChahgeInput title={props.todolist.title} onClick={updateTodolist}/>
                <div className={s.deleteIconBTN} onClick={deleteTodolist}>delete Tl</div>
            </div>
            <AddItemForm onClick={addNewTask}/>
            <div className={s.taskList}>
                {arrayTask !== undefined && props.tasks.length !== 0
                    ?
                    arrayTask.map((task: TaskType) => {
                        return <Task task={task} todolist={props.todolist}/>
                    })
                    : <div>No Tasks</div>}
            </div>
            <div className={s.filterBtnBox}>
                <div className={s.filterBtn}onClick={()=>onChangeFilter("all")}>all</div>
                <div className={s.filterBtn} onClick={()=>onChangeFilter("complited")}>complited
                </div>
                <div className={s.filterBtn}onClick={()=>onChangeFilter("active")}>active</div>
            </div>
        </div>
    )
})
