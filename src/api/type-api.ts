export type LoginDataType = {
    email: string,
    password: string
    rememberMe: boolean
    captcha: boolean
}
export type FieldErrorType = { field: string; error: string }
export type ResponseType<DataType = {}> = {

    resultCode: number
    messages: any,
    data: DataType
    fieldsErrors?: Array<FieldErrorType>

}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}