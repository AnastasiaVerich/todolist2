import s from "./task.module.scss";
import React from "react";

export const Task=()=>{
    return(
        <div className={s.task}>
            <input type={"checkbox"}/>
            <h3>Task1</h3>
            <div className={s.deleteBtn}>iconDel</div>
        </div>
    )
}