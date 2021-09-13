import s from "./task.module.scss";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType, TodolistType} from "../../../../api/type-api";
import {useAction} from "../../../../utils/redux-utils";
import {taskActions} from "./task-reducer";
import {ChahgeInput} from "../../../../components/editable-span/editable-span";
import {MdDelete} from "react-icons/all";

type OneTaskType = {
    task: TaskType
    todolist: TodolistType
}

export const Task = React.memo((props: OneTaskType) => {

    const {deleteTaskTC, updateTaskTC} = useAction(taskActions)
    const deleteTaskCB = useCallback(() => {
         deleteTaskTC({todolistId: props.todolist.id, taskId: props.task.id})
    }, [ props.todolist.id, props.task.id])
    const updateTask = useCallback((title:string) => {
        updateTaskTC({
            todolistId: props.todolist.id,
            // @ts-ignore
            taskId: props.task.id,
            data: {title: title}
        })
    }, [props.task.id, props.todolist.id])
    const updateTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTaskTC({
            todolistId: props.todolist.id,
            taskId: props.task.id,
            data: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [ props.todolist.id, props.task.id])
    console.log(props.task.title, props.task.id)


    return (
        <div key={props.task.id} className={s.task}>
            <input type={"checkbox"} checked={props.task.status === TaskStatuses.Completed} onChange={updateTaskStatus}/>
            <ChahgeInput title={props.task.title} onClick={updateTask}/>
            <div className={s.deleteBtn} onClick={deleteTaskCB}><MdDelete/></div>
        </div>
    )
})