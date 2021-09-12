import s from "./task.module.scss";
import React, {useCallback} from "react";
import {TaskStatuses, TaskType, TodolistType} from "../../../../api/type-api";
import {useAction} from "../../../../utils/redux-utils";
import {taskActions} from "./task-reducer";
import {ChahgeInput} from "../../../../components/editable-span/editable-span";

type OneTaskType = {
    task: TaskType
    todolist: TodolistType
}

export const Task = React.memo((props: OneTaskType) => {
    const {deleteTaskTC,updateTaskTC} = useAction(taskActions)
    const deleteTaskCB=useCallback(()=>{ // @ts-ignore
       return  deleteTaskTC({todolistId:props.todolist.id, taskId: props.task.id})},[])
 const updateTask=useCallback((e:any)=>{ // @ts-ignore
       updateTaskTC({todolistId:props.todolist.id, taskId: props.task.id, data:{status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}})},[])


    return (
        <div className={s.task}>
            <input type={"checkbox"} checked={props.task.status===TaskStatuses.Completed} onChange={updateTask} />
            <ChahgeInput title={props.task.title} onClick={updateTask}/>
            <div className={s.deleteBtn} onClick={deleteTaskCB}>iconDel</div>
        </div>
    )
})