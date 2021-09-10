import React from 'react';
import s from './llist-todolists.module.scss'
import {Todolist} from "./todolist";
import {AddItemForm} from "../../components/add-item-form/add-item-form";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../authorization/selector";
import {authorizationActions} from "../authorization";
import {Redirect} from "react-router-dom";

export const ListTodolists = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if (!isLoggedIn){
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={s.todolistListBlock}>
            <div className={s.topPathContainer}>{/*size in %*/}
                <AddItemForm/>
            </div>
            <div className={s.todolistListBox}>
                <Todolist/>
            </div>
        </div>
    );
}