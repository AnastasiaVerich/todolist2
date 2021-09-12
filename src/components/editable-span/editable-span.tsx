import React, {useState} from "react";

type ChahgeInputType={
    title:string
    onClick:any
}

export const ChahgeInput=(props:ChahgeInputType)=>{
    const [value, setValue]=useState(props.title)
    const xxx = () => {
        props.onClick(value)
    }
    return(
        <>
            <h2>{props.title}</h2>
            <input   value={value}onChange={(e)=>setValue(e.currentTarget.value)} onBlur={xxx} />
        </>
    )
}