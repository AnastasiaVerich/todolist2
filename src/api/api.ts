import axios from "axios";
import {LoginDataType, ResponseType, TaskType, TodolistType} from "./type-api";
import {UpdateDomainTaskModelType} from "../features/list-todolists/todolist/task/task-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers:{
        'API-KEY': '603ef8c0-4933-4294-ab5f-b170d3ebe6d8'
    }
})

export const authorizationAPI={
    me(){
        return instance
            .get<ResponseType<{id: number, email:string, login: string }>>('/auth/me')
    },
    login(data:LoginDataType){
        return instance
            .post<ResponseType<{ userId?: number }>>("/auth/login", data)
    },
    logout(){
        return instance
            .delete<ResponseType>('/auth/login')
    }
}
export const todolistAPI={
    getTodolists(){
        return instance
            .get<TodolistType[]>('/todo-lists')
    },
    addTodolist(title: string){
        return instance.post<ResponseType<{ item:TodolistType }>>("/todo-lists", {title: title})
    },
    updateTodolist(todolistId: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title:title})
    },
    deleteTodolist(todolistId: string){
        return  instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    reorderTodolists(todolistId: string, putAfterItemId: string){
        return  instance.put<ResponseType>(`/todo-lists/${todolistId}`, {putAfterItemId:putAfterItemId})
    },
}
export const taskAPI={
    getTasks(todolistId: string, count?:string, page?: string){
        return instance.get<{items: TaskType[], totalCount:number,error: string }>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string){
        return  instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, data:UpdateDomainTaskModelType ){
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {data:data})
    },
    deleteTask(todolistId: string, taskId: string){
        return  instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    reorderTask(todolistId: string, taskId: string, putAfterItemId:string){
        return   instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId:putAfterItemId})
    },
}
