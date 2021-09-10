import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todolistAPI} from "../../../api/api";
import {TodolistType} from "../../../api/type-api";

const getTodolistTC = createAsyncThunk<{ todolists: TodolistType[] } | any, any, any>("todolist/getTodolist",
    async (param, thunkAPI) => {
        try {
            const res = await todolistAPI.getTodolists()
            return {todolists: res.data}
        } catch (e) {
            return alert(e)
        }
    })
const addTodolistTC = createAsyncThunk<{ todolist: TodolistType } | any, {title: string}, any>("todolist/addTodolist",
    async (param, thunkAPI) => {
        try {
            const res = await todolistAPI.addTodolist(param.title)
            return {todolist: res.data.data.item}
        } catch (e) {
            return alert(e)
        }
    })
const updateTodolistTC = createAsyncThunk<{ todolistId: string, title: string } | any, {todolistId: string, title: string}, any>("todolist/updateTodolist",
    async (param, thunkAPI) => {
        try {
            const res = await todolistAPI.updateTodolist(param.todolistId, param.title)
            return {todolistId: param.todolistId, title: param.title}
        } catch (e) {
            return alert(e)
        }
    })
const deleteTodolistTC = createAsyncThunk<{ todolistId: string } | any, {todolistId: string}, any>("todolist/deleteTodolist",
    async (param, thunkAPI) => {
        try {
            const res = await todolistAPI.deleteTodolist(param.todolistId)
            return {todolistId: param.todolistId}
        } catch (e) {
            return alert(e)
        }
    })
export const asyncActions={
   getTodolistTC,
   addTodolistTC,
   updateTodolistTC,
   deleteTodolistTC
}

export const slice = createSlice({
    name: "todolist",
    initialState: {} as TodolistType[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTodolistTC.fulfilled, (state, action) => {
               return  action.payload.todolists
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTC.fulfilled, (state, action) => {
                let index = state.findIndex(x=>x.id===action.payload.todolistId)
                state[index].title=action.payload.title
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                let index = state.findIndex(x=> x.id===action.payload.todolistId)
                if(index>-1){
                    state.splice(index,1)
                }
            })
    }
})