import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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

export const asyncActions={
    loginTC,
    logoutTC
}

export const slice = createSlice({
    name: 'authorization',
    initialState: {isLoggedIn: false},
    reducers: {},
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