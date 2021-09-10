import {Login} from "./Login";
import {slice, asyncActions as thunks} from "./authorization-reducer";

// все экшены и санки
const authorizationActions={
    ...slice.actions,//экшены
    ...thunks//санки
}
const authorizationReducer= slice.reducer
//наш редюсер, нужен только в сторе и декораторе, если юзаем сторибук

export {
    authorizationReducer,
    authorizationActions,
    Login
}
