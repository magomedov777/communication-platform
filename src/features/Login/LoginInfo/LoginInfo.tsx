import React from 'react';
import style from './LoginInfo.module.scss'
export const LoginInfo = () => {
    return (
        <div className={style.loginInfoBlock}>
            <h1>Communication Platform</h1>
            <p >
                This is online platform for people to communicate
            </p>
            <div>
                <p>Login to enter <a href={'https://social-network.samuraijs.com/'}
                    target={'_blank'}> here
                </a>
                </p>
                <p>For tests, demonstration account:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
        </div>
    );
};

