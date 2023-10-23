import React, { FC } from 'react';
import style from './Post.module.scss';
import { PostType, ProfileUserType } from "../../../../redux/store";
import { SvgSelector } from "../../../../common/components/svgSelector/SvgSelector";

type PropsType = {
    profile: ProfileUserType | null
    posts: PostType
}
const Post: FC<PropsType> = ({ profile, posts }) => {
    return (
        <div className={style.item}>
            <div className={style.topBlock}>
                <img src={profile?.photos.small ? profile.photos.small : ''} alt={'profile'} />
                <div className={style.postText}>{posts.message}</div>
            </div>
            <div className={style.bottomBlock}>
                <span><SvgSelector svgName={'Like'} /></span> {posts.likesCount}
            </div>
        </div>
    )
}

export default Post;
