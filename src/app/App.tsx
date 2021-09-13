import React, {useCallback, useEffect} from 'react';
import {ListTodolists} from "../features/list-todolists/list-todolists";
import s from "./App.module.scss";
import {Route, Switch} from "react-router-dom";
import {useAction} from "../utils/redux-utils";
import {Login} from "../features/authorization/Login";
import {authorizationActions} from "../features/authorization/authorization-reducer";
import {applicationActions} from "../features/application/application-reducer";
import {useSelector} from "react-redux";
import {selectIsInitialized} from "../features/application/selector";

function App() {
    const{logoutTC}=useAction(authorizationActions)
    const{initializedTC}=useAction(applicationActions)
    const isInitialized=useSelector(selectIsInitialized)
     useEffect(() => {
         initializedTC({})
     }, [])
    const logoutHandler = useCallback(() => {
        logoutTC({})
    }, [])
if (!isInitialized){return <div>wait a few minut</div>}

    return (
        <div className={s.block}>
            <div className={s.headerBlock}>
                <div className={s.mainContainer}>
                    <div className={s.appInfoBox}>
                        <img src={""}/>
                        <h2>AppName</h2>
                    </div>
                    <div className={s.loginBtn} onClick={logoutHandler}>LogOut</div>
                </div>
            </div>
            <Switch>
                <Route exact path={'/'} render={()=> <ListTodolists/>}/>
                <Route path={'/login'} render={()=><Login/>}/>
                <Route  path={'*'} render={()=> <ListTodolists/>}/>
            </Switch>

        </div>
    );
}


export default App;
