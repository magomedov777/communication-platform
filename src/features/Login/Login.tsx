import React, { FC } from 'react';
import { connect } from "react-redux";
import { login } from "../../app/auth-reducer";
import { FormDataType, LoginReduxForm } from './LoginForm/LoginForm';
import { AppStateType } from "../../app/redux-store";
import { Redirect } from "react-router-dom";
import style from "./Login.module.scss"
import { LoginInfo } from "./LoginInfo/LoginInfo";


type LoginType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    captcha: string | null
}

const Login = (props: LoginType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div className={style.loginBlock}>
            <div className={style.formBlock}>
                <div>
                    <LoginInfo />
                </div>
                <div className={style.loginFormBlock}>
                    <h1>Log In</h1>
                    <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, { login })(Login)

