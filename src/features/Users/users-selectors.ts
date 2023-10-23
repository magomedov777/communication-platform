import { createSelector } from "reselect";
import { AppStateType } from "../../app/redux-store";
import { UsersType } from "./users-reducer";


export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector (getUsersSelector, (users: UsersType[]) => {
    return users.filter(user=> true)
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress= (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
