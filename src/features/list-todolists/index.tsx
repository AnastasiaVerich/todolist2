import {slice as sliceTask, asincActions as thunksTask} from "./task-reducer";
import {slice as sliceTodolist, asyncActions as thunkTodolist} from "./todolist-reducer";


const taskActions={
    ...sliceTask.actions,//экшены
    ...thunksTask
}
const todolistActions={
    ...sliceTodolist.actions,
    ...thunkTodolist
}
const taskReducer=sliceTask.reducer
const todolistReducer=sliceTodolist.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук


export {
    taskActions,
    taskReducer,

    todolistActions,
    todolistReducer
}