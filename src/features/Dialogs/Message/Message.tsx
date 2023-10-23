import React from 'react';
import style from './Message.module.scss';
import { MessagesType } from "../../../redux/store";
import { SvgSelector } from "../../../common/components/svgSelector/SvgSelector";

const Message = (props: MessagesType) => {
    return <div className={style.messageBlock}>
        <span>{props.message}</span>
        <SvgSelector svgName={"Profile"} />
    </div>
}

export default Message;
