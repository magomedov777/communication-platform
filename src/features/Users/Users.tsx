import React from 'react';
import { UsersType } from "./users-reducer";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../common/components/Paginator/Paginator";
import { SvgSelector } from "../../common/components/svgSelector/SvgSelector";
import style from "./Users.module.scss"
type PropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    onPageSize: (page: number) => void
    followingInProgress: number[]
    toggleIsFollowing: (disabled: boolean, id: number) => void
    followTC: (id: number, followed: boolean) => void
    unFollowTC: (id: number, followed: boolean) => void
}

export const Users = (props: PropsType) => {
    const onClickHandler = (id: number, followed: boolean) => {
        props.toggleIsFollowing(true, id)
        followed
            ? props.unFollowTC(id, followed)
            : props.followTC(id, followed)
    }
    return (
        <div className={style.usersBlock}>
            <div>
                <Pagination page={props.currentPage}
                    pageCount={props.pageSize}
                    totalItemsCount={props.totalUsersCount}
                    onPageCallBack={props.onPageChanged}
                    onPageCountCallBack={props.onPageSize} />

            </div>
            <div className={style.userCardsBlock}>
                {props.users.map(el => <div key={el.id}>
                    <div className={style.userBlock}>
                        <div>
                            <NavLink to={'/profile/' + el.id}>
                                {el.photos.small != null
                                    ? <img
                                        src={el.photos.small}
                                        alt="profile icon" />
                                    : <SvgSelector svgName={"UserIcon"} />
                                }
                            </NavLink>
                        </div>
                        <span>
                            <div>{el.name}</div>
                        </span>
                        <div>
                            <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => onClickHandler(el.id, el.followed)}>
                                {el.followed ? "Unfollow" : "Follow"}
                            </button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

