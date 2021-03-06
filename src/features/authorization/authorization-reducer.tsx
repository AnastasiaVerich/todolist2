import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginDataType} from "../../api/type-api";
import {authorizationAPI} from "../../api/api";

// что возвращает(если ничего, то undefinded), что принимает в параметрах(типа проспсов), что возвращает если ошибка
const loginTC = createAsyncThunk<any, LoginDataType, any>('authorization/login',
    async (param, thunkAPI) => {
        try {
            const responce = await authorizationAPI.login(param)
            if (responce.data.resultCode === 0) {
                //диспатчить акшен, но через реджект
                return
            }
            else{
                return alert("неверный запрос или еще что-то, но не глобальное")
            }
        } catch (err) {
           return  alert(err)
        }
    })

const logoutTC = createAsyncThunk<any,any, any>('authorization/logout',
    async (param, thunkAPI) => {
        try {
            const responce = await authorizationAPI.logout()
            if (responce.data.resultCode === 0) {
                //диспатчить акшен, но через реджект
                return
            }
            else{
                return alert("неверный запрос или еще что-то, но не глобальное")
            }
        } catch (err) {
            return  alert(err)
        }
    })



export const slice = createSlice({
    name: 'authorization',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action : PayloadAction<{value: boolean}>){
            state.isLoggedIn= action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state => {
                state.isLoggedIn=true
            }))
            .addCase(logoutTC.fulfilled, state => {
                state.isLoggedIn=false
            })

    }
})
export const authorizationActions={
    loginTC,
    logoutTC,
    ...slice.actions
}
// export const authorizationActions={
//     ...slice.actions,//экшены
//     ...asyncActions//санки
// }
export const authorizationReducer= slice.reducer
//наш редюсер, нужен только в сторе и декораторе, если юзаем сторибук
