import React from "react";
import style from "./MyPost.module.scss";
import Post from "./Post/Post";
import { PostType, ProfileUserType, } from "../../../redux/store";
import { AddNewPostForm, NewPostType } from "./PostForm/PostForm";

type MyPostType = {
    posts: PostType[];
    addPost: (newValue: string) => void
    profile: ProfileUserType | null
};

export const MyPosts = (props: MyPostType) => {
    const postsElements = props.posts.map((p) => (
        <Post profile={props.profile} posts={p} />
    ));

    const addPost = (values: NewPostType) => {
        props.addPost(values.newPostText);
        values.newPostText = ""
    };

    return (
        <div className={style.postsBlock}>
            <div className={style.formBock}>
                <AddNewPostForm onSubmit={addPost} />
            </div>
            <div className={style.posts}>{postsElements}</div>
        </div>
    );
};
