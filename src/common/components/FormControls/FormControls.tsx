import React, { FC } from "react";
import styles from "./FormControls.module.scss"

type TextareaProps = {
    input?: {
        name: string;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    };
    meta: {
        touched: boolean;
        error: string;
    };
    placeholder?: string;
    className?: string;
}

type InputType = {
    input: {
        name: string;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    };
    meta: {
        touched: boolean;
        error: string;
    };
    type: "text" | "password" | "email" | "number" | "checkbox" | "radio  ";
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
};

export const Textarea: FC<TextareaProps> = ({ input, meta, placeholder, ...props }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (showError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props} placeholder={placeholder} />
            </div>
            {showError && <span>some error!!</span>}
        </div>
    )
}

export const Input: FC<InputType> = ({ input, meta, placeholder, ...props }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (showError ? styles.error : "")}>
            <div>
                <input {...input} {...props} placeholder={placeholder} value={input.value} />
            </div>
            <div className={styles.errorBlock}>{showError && <span>some error!!</span>}</div>
        </div>
    )
}
