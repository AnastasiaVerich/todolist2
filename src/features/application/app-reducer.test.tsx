import {applicationActions, applicationReducer} from "./index";


const reducer =applicationReducer
const {initializedTC}=applicationActions

test("correct work initializedTC",()=>{
    let startState={isInitialized: false};
    let actions = initializedTC.fulfilled("","requestId","")

    let endState = reducer(startState, actions)


    expect(endState.isInitialized).toBe(true)
})