import React from 'react';
import Header from "./Header";
import { connect } from "react-redux";
import { authTC, AuthType, logout } from "../../app/auth-reducer";
import { AppStateType } from "../../app/redux-store";


type MapStateType = {
    auth: AuthType,
    isAuth: boolean
}

type MapDispatchType = {
    authTC: () => void
    logout: () => void
}

type PropsType = MapDispatchType & MapStateType

class HeaderContainer extends React.Component<PropsType> {
    async componentDidMount() {
        this.props.authTC()
    }
    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
        isAuth: store.auth.isAuth
    }
}
export default connect(mapStateToProps, { authTC, logout })(HeaderContainer);
