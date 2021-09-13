import React, {useCallback, useEffect} from 'react';
import s from './llist-todolists.module.scss'
import {AddItemForm} from "../../components/add-item-form/add-item-form";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../authorization/selector";
import {Redirect} from "react-router-dom";
import {useAction} from "../../utils/redux-utils";
import {AppRootStateType} from "../../app/store";
import {TodolistType} from "../../api/type-api";
import {TasksStateType} from "./todolist/task/task-reducer";
import {todolistActions, TodolistTypeWithFilter} from "./todolist/todolist-reducer";
import {Todolist} from "./todolist/todolist";


export const ListTodolists = React.memo(() => {
    const todolists = useSelector<AppRootStateType, TodolistTypeWithFilter[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {getTodolistTC, addTodolistTC} = useAction(todolistActions);

    const addNewTodolist = useCallback((e: any) => {
        addTodolistTC({title:e})
    }, [])

    useEffect(() => {
        if(!isLoggedIn){return}
        getTodolistTC({});
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    console.log(isLoggedIn)
    return (
        <div className={s.todolistListBlock}>
            <div className={s.topPathContainer}>{/*size in %*/}
                <AddItemForm onClick={addNewTodolist}/>
            </div>
            <div className={s.todolistListBox}>
                {todolists.length!==undefined
                    ? todolists.map((tl: TodolistTypeWithFilter) => {
                        let todolistTask = tasks[tl.id]
                        return <Todolist tasks={todolistTask}
                                         todolist={tl}/>
                    })
                    : <>No Tasks</>
                }
            </div>
        </div>
    );
})