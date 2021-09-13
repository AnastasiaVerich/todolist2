import React, {ChangeEvent, useState} from "react";
import s from "./editable-span.tsx.module.scss"

type ChangeInputType = {
    title: string
    onClick: any
}

export const ChahgeInput = (props: ChangeInputType) => {
    const [value, setValue] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onBlur=()=>{
        setEdit(false)
        props.onClick(value)
    }
   const  onChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
    }
    return (
        <>{!edit
            ? <p className={s.title} onDoubleClick={()=>setEdit(true)}>{props.title}</p>
            : <input className={s.titleEdit} autoFocus onBlur={onBlur} value={value} onChange={onChange} />}
        </>
    )
}