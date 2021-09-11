import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../../../api/type-api";
import {todolistActions, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task/task-reducer";

const reducer =todolistReducer
const reducerTask = taskReducer
let startStateTL: TodolistType[];
const {deleteTodolistTC,updateTodolistTC, getTodolistTC,addTodolistTC}=todolistActions
beforeEach(()=>{
    startStateTL=[
        {id: "todolistId1", title: 'What to learn', addedDate: '', order: 0},
        {id: "todolistId2", title: 'What to buy', addedDate: '', order: 0}
    ]
})


test("corect work getTodolistTC", ()=>{
    let todolists = [
        {id: "todolistId3", title: '33333333', addedDate: '', order: 0},
        {id: "todolistId4", title: '444444444', addedDate: '', order: 0}
    ]/// 1) что возвращаетю 2) хз. 3) что принимает
    const action = getTodolistTC.fulfilled({todolists: todolists },'',"")

    const endState = reducer([],action)
    const endTask= reducerTask({}, action)

    expect(endState[1].title).toBe("444444444")
    expect(endTask["todolistId3"]).toStrictEqual([])
    expect(endTask["todolistId4"]).toStrictEqual([])
    expect(endTask["todolistId1"]).toBe(undefined)

})
test("corect work addTodolistTC", ()=>{
    let todolist =
        {id: "todolistId4", title: '444444444', addedDate: '', order: 0}
    /// 1) что возвращаетю 2) хз. 3) что принимает
    const action = addTodolistTC.fulfilled({todolist: todolist},'',{title: "444444444"})

    const endState = reducer(startStateTL,action)
    const endTask= reducerTask({}, action)



    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("444444444")
    expect(endTask["todolistId4"]).toStrictEqual([])

})
test("corect work updateTodolistTC", ()=>{
    /// 1) что возвращаетю 2) хз. 3) что принимает
    const action = updateTodolistTC.fulfilled({todolistId: "todolistId1", title: "string" },'',{todolistId: "todolistId1", title: "string"})

    const endState = reducer(startStateTL,action)

    expect(endState[0].title).toBe("string")
})
test("corect work deleteTodolistTC", ()=>{
    let startStateTask={
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
            }
        ],
        'todolistId3': []

    }

    /// 1) что возвращаетю 2) хз. 3) что принимает
    const action = deleteTodolistTC.fulfilled({todolistId: "todolistId1" },'',{todolistId: "todolistId1"})

    const endState = reducer(startStateTL,action)
    const endTask= reducerTask(startStateTask, action)


    expect(endState[0].title).toBe('What to buy')
    expect(endTask["todolistId1"]).toStrictEqual(undefined)

})