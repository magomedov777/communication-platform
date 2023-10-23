import { connect } from "react-redux";
import Profile from "./Profile";
import React, { ComponentType } from "react";
import { getProfileTC, getStatusTC, updatePhoto, updateProfile, updateStatusTC } from "./profile-reducer";
import { ProfileUserType } from "../../redux/store";
import { AppStateType } from "../../app/redux-store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../common/hoc/withAuthRedirect";
import { compose } from "redux";

type MapStateType = {
    profile: ProfileUserType | null
    status: string,
    myUserId: number | null,
    isAuth: boolean
}

type MapDispatchType = {
    getProfileTC: (id: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    updatePhoto: (photo: File) => void
    updateProfile: (profile: ProfileUserType) => void
}

type ParamType = {
    userId: string
}

type WithPropsType = RouteComponentProps<ParamType> & PropsType

type PropsType = MapStateType & MapDispatchType

class ProfileContainer extends React.Component<WithPropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = JSON.stringify(this.props.myUserId);
        }
        this.props.getProfileTC(userId)
        this.props.getStatusTC(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<WithPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {
        return <Profile {...this.props}
            profile={this.props.profile}
            isOwner={!this.props.match.params.userId}
            updatePhoto={this.props.updatePhoto}
            updateProfile={this.props.updateProfile}
        />;
    }
}

let mapStateToProps = (store: AppStateType): MapStateType => {
    return {
        profile: store.profilePage.profile,
        status: store.profilePage.status,
        myUserId: store.auth.id,
        isAuth: store.auth.isAuth
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps, { getProfileTC, getStatusTC, updateStatusTC, updatePhoto, updateProfile }),
    withRouter,
    withAuthRedirect
)
    (ProfileContainer)
