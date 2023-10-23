import React from "react";
import { PostType, } from "../../../redux/store";
import { addPost, updateNewPostText } from "../profile-reducer";
import { MyPosts } from "./MyPosts";
import { AppStateType } from "../../../app/redux-store";
import { connect } from "react-redux";


type MapStateToPropsType = {
    posts: PostType[]
}

let mapStateToProps = (store: AppStateType): MapStateToPropsType => {
    return {
        posts: store.profilePage.posts
    }
}

export const MyPostsContainer = connect
    (mapStateToProps, { addPost })(MyPosts);

