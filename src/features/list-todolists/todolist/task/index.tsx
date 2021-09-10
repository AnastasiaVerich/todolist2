import {slice as sliceTask, asincActions as thunksTask} from "./task-reducer";
import {Task} from "./task";

const taskActions={
    ...sliceTask.actions,//экшены
    ...thunksTask
}

const taskReducer=sliceTask.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук


export {
    taskActions,
    taskReducer,
    Task

}