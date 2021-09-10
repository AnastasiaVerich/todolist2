import React from 'react';
import {ListTodolists} from "../features/list-todolists/list-todolists";
import s from "./App.module.scss";
import {AddItemForm} from "../components/add-item-form/add-item-form";
import {authorizationActions, Login} from "../features/authorization";
import {Route, Switch} from "react-router-dom";
import {useAction} from "../utils/redux-utils";

function App() {
    const{logoutTC}=authorizationActions


    return (
        <div className={s.block}>
            <div className={s.headerBlock}>
                <div className={s.mainContainer}>
                    <div className={s.appInfoBox}>
                        <img src={""}/>
                        <h2>AppName</h2>
                    </div>
                    <div className={s.loginBtn} onClick={useAction(logoutTC)}>LogOut</div>
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
