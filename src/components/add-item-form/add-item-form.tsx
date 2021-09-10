import s from "./add-item-form.module.scss";
import React from "react";

export const AddItemForm =()=>{
    return(
        <div className={s.formBox}>
            <input/>
            <div className={s.addItemBtn}>addIcon</div>
        </div>
    )
}