import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {applicationReducer} from "../features/application/application-reducer";
import {authorizationReducer} from "../features/authorization/authorization-reducer";
import {todolistReducer} from "../features/list-todolists/todolist/todolist-reducer";
import {taskReducer} from "../features/list-todolists/todolist/task/task-reducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const reducers = combineReducers({
    application: applicationReducer,
    authorization: authorizationReducer,
    todolist: todolistReducer,
    task: taskReducer
})

// непосредственно создаём store

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// redux common types
export type RootReducerType = typeof reducers
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof  store.dispatch
// @ts-ignore
window.store = store
