import s from "./todolist.module.scss";
import React from "react";
import {AddItemForm} from "../../../components/add-item-form/add-item-form";
import {Task} from "./task";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../authorization/selector";
import {Redirect} from "react-router-dom";
import {authorizationActions} from "../../authorization";

export const Todolist = () => {

    return (
        <div className={s.todolist}>
            <h2>Title Todolist</h2>
            <AddItemForm/>
            <div className={s.taskList}>
                <Task/>
                <Task/>
                <Task/>
            </div>
            <div className={s.filterBtnBox}>
                <div className={s.filterBtn}>all</div>
                <div className={s.filterBtn}>complited</div>
                <div className={s.filterBtn}>active</div>
            </div>
        </div>

    )
}