import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../../../common/components/FormControls/FormControls";
import { required } from "../../../common/utils/validator/validator";
import style from './LoginForm.module.scss'
export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropsType = {
    captcha: string | null
}

const LoginForm: FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.loginBlock}>
            <div className={style.inputBlock}>
                <div className={style.firstInput}>
                    <Field name={'login'} type={"text"} placeholder={'Login'} component={Input}
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field name={'password'} type={"password"} placeholder={'Password'} component={Input}
                        validate={[required]}
                    />
                </div>
            </div>
            <div className={style.checkBox}>
                <Field name={'rememberMe'} type={'checkbox'} component={Input}
                /> Remember Me
            </div>
            {props.captcha && <img src={props.captcha} alt={'captchaUrl'} />}
            {props.captcha && <div>

                <Field
                    name={'captcha'}
                    placeholder={'Captcha'}
                    component={Input}
                    type={'text'}
                    validate={[required]}
                />
            </div>}
            <div>
                <div>{props.error}</div>
                <button>
                    Log In
                </button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({ form: 'login' })(LoginForm)
