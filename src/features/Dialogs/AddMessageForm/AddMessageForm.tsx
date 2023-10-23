import { Field, InjectedFormProps, reduxForm } from "redux-form";
import React, { FC } from "react";
import { Textarea } from "../../../common/components/FormControls/FormControls";
import { maxLengthCreator, minLengthCreator } from "../../../common/utils/validator/validator";
import style from "./AddMessageForm.module.scss"
import { SvgSelector } from "../../../common/components/svgSelector/SvgSelector";

export type FormDataType = {
    newMassageBody: string
}

const maxLength = maxLengthCreator(15)
const minLength = minLengthCreator()
const AddMessageForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.formBlock}>
            <div>
                <Field component={Textarea} name="newMassageBody" placeholder='Create message'
                    validate={[maxLength, minLength]}
                />
            </div>
            <div>
                <button>
                    <SvgSelector svgName={"Messages"} />
                    <span>Send</span></button>
            </div>
        </form>
    );
};

export const AddMessageFormRedux = reduxForm<FormDataType>({ form: 'dialogAddMessageForm' })(AddMessageForm)
