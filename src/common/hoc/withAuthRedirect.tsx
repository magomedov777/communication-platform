import React, { ComponentType } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../app/redux-store";

type MapStateType = {
    isAuth: boolean
}

let mapStateToProps = (store: AppStateType): MapStateType => {
    return {
        isAuth: store.auth.isAuth
    }
}

type PropsType = MapStateType
export function withAuthRedirect(Component: ComponentType) {
    class RedirectComponent extends React.Component<PropsType>{
        render() {
            let { isAuth, ...restProps } = this.props

            if (!isAuth) return <Redirect to={'/login'} />

            return <Component {...restProps} />;
        }
    }
    let ConnectedAuth = connect(mapStateToProps)(RedirectComponent)
    return (
        ConnectedAuth
    );
};

