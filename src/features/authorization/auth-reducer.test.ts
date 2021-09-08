import {authorizationActions, authorizationReducer} from "./index";
import {LoginDataType} from "../../api/type-api";


const reducer = authorizationReducer
const {logoutTC,loginTC}=authorizationActions



test("correct work loginTC",()=>{
    let param:LoginDataType={
        email:"",
        password:"",
        rememberMe:true,
        captcha: false
    }
    let startState = {
        isLoggedIn: false
    }
    const action=loginTC.fulfilled(param, "requestId", param)
    const endState = reducer(startState,action)
    expect(endState.isLoggedIn).toBe(true)
})
test("correct work logoutTC",()=>{

    let startState = {
        isLoggedIn: true
    }
    const action=logoutTC.fulfilled('', "requestId", '')
    const endState = reducer(startState,action)
    expect(endState.isLoggedIn).toBe(false)
})