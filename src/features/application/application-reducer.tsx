import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authorizationAPI} from "../../api/api";
import {authorizationActions} from "../authorization/authorization-reducer";

const
    initializedTC = createAsyncThunk<any, any, any>("application/initialized",
        async (param, thunkAPI) => {

            try {
                const response = await authorizationAPI.me()
                if (response.data.resultCode === 0) {
                    thunkAPI.dispatch(authorizationActions.setIsLoggedInAC({value: true}))
                } else {
                    return alert("пользователь не инизиализирован(либо не верный запрос, н не глобальное)")
                }
            } catch (err) {
                return alert(err)
            }
        })
export const applicationActions = {
    initializedTC
}

export const slice = createSlice({
    name: "application",
    initialState: {isInitialized: false},
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializedTC.fulfilled, state => {
                state.isInitialized = true
            })

    }
})
/*export const applicationActions={
    ...slice.actions,//экшены
    ...asyncActions
}*/
export const applicationReducer = slice.reducer
//наш редюсер, нужен только в сторе, тестах и еще декораторе, если юзаем сторибук
