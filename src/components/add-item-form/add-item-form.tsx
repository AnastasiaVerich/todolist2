import s from "./add-item-form.module.scss";
import React, {useState} from "react";
import {IoAdd, IoAddCircleOutline} from "react-icons/all";

type addItemForm ={
    onClick:any
}

export const AddItemForm =(props:addItemForm)=>{
    let [value, setValue]=useState("")
    return(
        <div className={s.formBox}>
            <input value={value} onChange={(e)=>setValue(e.currentTarget.value)}/>
            <div className={s.addItemBtn} onClick={()=>props.onClick(value)}><IoAdd size={"30px"} /></div>
        </div>
    )
}