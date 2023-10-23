import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import style from "./Profile.module.scss";
import { ProfileEditForm } from "./ProfileEditForm/ProfileEditForm";
import { ProfileUserType } from "../../redux/store";

type PropsType = {
    profile: ProfileUserType | null
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean;
    updatePhoto: (photo: File) => void
    updateProfile: (profile: ProfileUserType) => void
}

const Profile = (props: PropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const showEdit = () => {
        setEdit(!edit)
    }
    return (
        <div className={style.profileBlock}>
            <div className={style.profileInfoBlock}>
                <ProfileInfo showEdit={showEdit}
                    updateStatusTC={props.updateStatusTC}
                    status={props.status}
                    profile={props.profile}
                    isOwner={props.isOwner}
                />
                <ProfileEditForm updateProfile={props.updateProfile} profile={props.profile} edit={edit} updatePhoto={props.updatePhoto} />
            </div>
            <MyPostsContainer profile={props.profile} />
        </div>
    );
};

export default Profile;
