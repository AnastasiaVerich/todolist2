import React from 'react';
import s from './Login.module.scss'
import {useFormik} from "formik";
import {authorizationActions} from "./index";
import {useAppDispatch} from "../../utils/redux-utils";
import {selectIsLoggedIn} from "./selector";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export const Login=()=> {
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const dispatch=useAppDispatch()
    const {loginTC}= authorizationActions
    const formik = useFormik({
      initialValues: {
          email:"",
          password:"",
          rememberMe: false,
          captcha:false
      },
      onSubmit: async (values, formikHelpers)=>{
        await dispatch(loginTC(values));
      }
    })
    console.log(isLoggedIn)
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


