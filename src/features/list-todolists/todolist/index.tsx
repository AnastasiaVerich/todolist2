import {slice as sliceTodolist, asyncActions as thunkTodolist} from "./todolist-reducer";
import {Todolist} from "./todolist";



const todolistActions={
    ...sliceTodolist.actions,
    ...thunkTodolist
}
const todolistReducer=sliceTodolist.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук


export {
    todolistActions,
    todolistReducer,
    Todolist
}