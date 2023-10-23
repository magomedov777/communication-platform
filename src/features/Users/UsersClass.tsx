import React from 'react';
import { UsersType } from "./users-reducer";
import { Users } from "./Users";
import preload from "../../assets/images/loader.gif";
import { Preloader } from "../../common/components/Preloader/Preloader";

type PropsType = {
    users: UsersType[]
    isFetching: boolean
    pageSize: number
    totalUsersCount: number
    currentPage: number

    toggleIsFollowing: (disabled: boolean, id: number) => void
    followingInProgress: number[]
    getUsersTC: (currentPage: number, pageSize: number) => void
    pageNavigationTC: (page: number, pageSize: number) => void
    followTC: (id: number, followed: boolean) => void
    unFollowTC: (id: number, followed: boolean) => void
}

export class UsersApiComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (page: number) => {
        this.props.pageNavigationTC(page, this.props.pageSize)
    };
    onPageSize = (pageSize: number) => {
        this.props.getUsersTC(this.props.currentPage, pageSize)
    }
    render() {
        return <>
            {this.props.isFetching && <Preloader />}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
                toggleIsFollowing={this.props.toggleIsFollowing}
                followTC={this.props.followTC}
                unFollowTC={this.props.unFollowTC}
                currentPage={this.props.currentPage}
                onPageSize={this.onPageSize}
            />
        </>
    }
}

