import {slice, asyncActions as thunks} from "./application-reducer";


const applicationActions={
    ...slice.actions,//экшены
    ...thunks
}

const applicationReducer=slice.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук


export {
    applicationReducer,
    applicationActions
}