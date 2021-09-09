import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {taskAPI} from "../../api/api";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../../api/type-api";
import {asyncActions as asyncActionsTL} from "./todolist-reducer";

// что возвращает(если ничего, то undefinded), что принимает в параметрах(типа проспсов), что возвращает если ошибка
const getTasksTC = createAsyncThunk<{ task: TaskType[], todolistId: string } | any, { todolistId: string }, any>("task/getTask",
    async (param, thunkAPI) => {
        try {
            const response = await taskAPI.getTasks(param.todolistId)
            return {task: response.data.items, todolistId: param.todolistId}
        } catch (err) {
            return alert(err)
        }
    })
const addTaskTC = createAsyncThunk<{ title: string, todolistId: string } | any, { title: string, todolistId: string }, any>("task/addTask",
    async (param, thunkAPI) => {
        try {
            const response = await taskAPI.addTask(param.title, param.title)
            return {task: response.data.data.item, todolistId: param.todolistId}
        } catch (err) {
            return alert(err)
        }
    })
const updateTaskTC = createAsyncThunk<{ title: string, todolistId: string } | any, { taskId: string, todolistId: string, data: UpdateDomainTaskModelType }, any>("task/updateTask",
    async (param, thunkAPI) => {
/// берем наш стейт, который с типом initialСтейта.
        const state = thunkAPI.getState() as any
//ищем в нем нужную нам таску, если не находим ты выводим ошибку
        const task = state.tasks[param.todolistId].find((t: any) => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }
//далее в апиМодель копируем все свойства найденной таски. Это делается потому,
// что мы должны в запросе обязательно по условию документации в запросе put передать в дате все значения,
// а не только измененное
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            completed: task.completed,
            ...param.data
        }
        //дальше как обычно
        try {
            const res = await taskAPI.updateTask(param.taskId, param.todolistId, apiModel)
            return {todolistId: param.todolistId, taskId: param.taskId}
        } catch (err) {
            return alert(err)
        }
    })
const deleteTaskTC = createAsyncThunk<{ taskId: string, todolistId: string } | any, { taskId: string, todolistId: string }, any>("task/deleteTask",
    async (param, thunkAPI) => {
        try {
            const res = await taskAPI.deleteTask(param.todolistId, param.taskId)
            return {taskId: param.taskId, todolistId: param.todolistId}
        } catch (err) {
            return alert(err)
        }
    })
export const asincActions = {
    getTasksTC,
    updateTaskTC,
    deleteTaskTC,
    addTaskTC
}
export const slice = createSlice({
    name: "task",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.task
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                let updateTask = action.payload.data
                let tasks = state[action.payload.todolistId]
                let index = tasks.findIndex((x: TaskType) =>
                    x.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...updateTask}
                }
            })
            .addCase(deleteTaskTC.fulfilled, (state, action) => {
                let tasks = state[action.payload.todolistId]
                let index = tasks.findIndex((x: TaskType) =>
                    x.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(asyncActionsTL.getTodolistTC.fulfilled, (state, action) => {
                let todolists = action.payload.todolists
                todolists.forEach((tl: TodolistType) => state[tl.id] = [])
            })
            .addCase(asyncActionsTL.addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(asyncActionsTL.deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
    }
})

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

////тип, который содежит все свойства для отпавки на сервер
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    completed: boolean

}
//тип, для передоваемых значений в санку UpdateTask.
// Можно передовать только одно значение
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    completed?: boolean
}