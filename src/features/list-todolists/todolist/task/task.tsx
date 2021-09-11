import s from "./task.module.scss";
import React from "react";
import {TaskType} from "../../../../api/type-api";

type OneTaskType={
task: TaskType
}

export const Task=React.memo((props:OneTaskType)=>{
    return(
        <div className={s.task}>
            <input type={"checkbox"}/>
            <h3>{props.task.title}</h3>
            <div className={s.deleteBtn}>iconDel</div>
        </div>
    )
})