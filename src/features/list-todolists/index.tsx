import {slice as sliceTask, asincActions as thunksTask} from "./task-reducer";


const taskActions={
    ...sliceTask.actions,//экшены
    ...thunksTask
}

const taskReducer=sliceTask.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук


export {
    taskActions,
    taskReducer
}