import {combineReducers} from "redux";
import {applicationReducer} from "../features/application";
import {authorizationReducer} from "../features/authorization";
import { todolistReducer} from "../features/list-todolists/todolist";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {taskReducer} from "../features/list-todolists/todolist/task";


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
