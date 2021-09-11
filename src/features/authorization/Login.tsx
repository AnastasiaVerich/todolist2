import React from 'react';
import s from './Login.module.scss'
import {useFormik} from "formik";
import {useAction, useAppDispatch} from "../../utils/redux-utils";
import {selectIsLoggedIn} from "./selector";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import { authorizationActions} from "./authorization-reducer";

export const Login=()=> {
    const dispatch=useAppDispatch()
    const {loginTC}= useAction(authorizationActions)
    const isLoggedIn=useSelector(selectIsLoggedIn)

    const formik = useFormik({
      initialValues: {
          email:"",
          password:"",
          rememberMe: false,
          captcha:false
      },
      onSubmit: async (values, formikHelpers)=>{
          await loginTC(values);

      }
    })


    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.block}>
            <div className={s.container}>
                <h3>Login</h3>
                <form className={s.loginForm} onSubmit={formik.handleSubmit}>
                    <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}/>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                    <div className={s.rememberMeBox}>
                        <input type="checkbox"
                               name="rememberMe"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               checked={formik.values.rememberMe}
                        />
                        <p>remember me</p>
                    </div>
                    <button type={'submit'} className={s.btnSubmit}>logIn</button>
                </form>
            </div>
        </div>
    );
}


