import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../common/utils/validator/validator";
import { Textarea } from "../../../../common/components/FormControls/FormControls";
import style from "./PostForm.module.scss"
import { SvgSelector } from "../../../../common/components/svgSelector/SvgSelector";

export type NewPostType = {
    newPostText: string
}

const maxLength = maxLengthCreator(100)
const PostForm: FC<InjectedFormProps<NewPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.formBlock}>
            <div>
                <Field
                    name={"newPostText"} placeholder={'Create new post'} component={Textarea}
                    validate={[required, maxLength]} className={style.textarea}
                />
            </div>
            <div>
                <button > <SvgSelector svgName={'Post'} /> <span>Add new post</span></button>
            </div>
        </form>
    );
};

export const AddNewPostForm = reduxForm<NewPostType>({ form: "profile" })(PostForm)

