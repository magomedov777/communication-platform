import { ComponentType } from 'react';
import { AppStateType } from "../../app/redux-store";
import {
    followTC,
    getUsersTC,
    pageNavigationTC,
    toggleIsFollowing,
    unFollowTC,
    UsersType
} from "./users-reducer";
import { connect } from "react-redux";
import { UsersApiComponent } from "./UsersClass";
import { compose } from "redux";
import { withAuthRedirect } from "../../common/hoc/withAuthRedirect";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from './users-selectors';

type mapStateToProps = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let mapStateToProps = (store: AppStateType): mapStateToProps => {
    return {
        users: getUsers(store),
        pageSize: getPageSize(store),
        totalUsersCount: getTotalUsersCount(store),
        currentPage: getCurrentPage(store),
        isFetching: getIsFetching(store),
        followingInProgress: getFollowingInProgress(store)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { toggleIsFollowing, getUsersTC, pageNavigationTC, unFollowTC, followTC }),
    withAuthRedirect
)(UsersApiComponent)


