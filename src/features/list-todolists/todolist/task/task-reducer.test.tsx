import {taskActions, taskReducer} from "../index";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../../api/type-api";
import {TasksStateType} from "./task-reducer";


const reducer = taskReducer
const {updateTaskTC, deleteTaskTC, getTasksTC, addTaskTC} = taskActions

let startState: TasksStateType

beforeEach(() => {
    startState = {
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
})
test("correct work getTasksTC", () => {
    let task = [{
        id: '1', title: 'Ruslan', status: TaskStatuses.New, todoListId: 'todolistId3', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
    },
        {
            id: '2', title: 'Anastasia', status: TaskStatuses.Completed, todoListId: 'todolistId3', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, completed: true
        }]
    let action = getTasksTC.fulfilled({todolistId: "todolistId3", task: task}, "", {todolistId: "todolistId3"})

    let endState = reducer(startState, action)

    expect(endState['todolistId3'].length).toBe(2)
    expect(endState['todolistId3'][0].title).toEqual('Ruslan')
    expect(endState['todolistId3'][1].title).toEqual('Anastasia')
})
test("correct work deleteTaskTC", () => {

    let action = deleteTaskTC.fulfilled({todolistId: "todolistId2", taskId: "2"}, "", {
        todolistId: "todolistId2",
        taskId: "2"
    })

    let endState = reducer(startState, action)

    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][1].id).toEqual("3")
})
test("correct work updateTaskTC", () => {
    let newTaskStatus = {status: TaskStatuses.New}
    let actionStatus = updateTaskTC.fulfilled({
        todolistId: "todolistId2",
        taskId: "2",
        data: newTaskStatus
    }, "", {todolistId: "todolistId2", taskId: "2", data: newTaskStatus})

    let endStateStatus = reducer(startState, actionStatus)

    expect(endStateStatus['todolistId2'][2].status).toEqual(TaskStatuses.New)
})
test("correct work updateTaskTC title", () => {
    let newTaskTitle = {title: 'Ruslana'}
    let actionTitle = updateTaskTC.fulfilled({
        todolistId: "todolistId1",
        taskId: "2",
        data: newTaskTitle
    }, "", {todolistId: "todolistId1", taskId: "2", data: newTaskTitle})

    let endStateTitle = reducer(startState, actionTitle)

    expect(endStateTitle['todolistId1'][1].title).toEqual("Ruslana")
})