import React from 'react';
import style from './DialogItem.module.scss';
import { NavLink } from "react-router-dom";
import { DialogType } from "../../../redux/store";
import { SvgSelector } from "../../../common/components/svgSelector/SvgSelector";

const DialogItem = (props: DialogType) => {
    let path = "/dialogs/" + props.id;
    return <div className={style.nameBlock}>
        <NavLink to={path} activeClassName={style.activeLink}>
            <div className={style.linkBlock}>
                <SvgSelector svgName={"Profile"} />
                <div>{props.name}</div>
            </div>
        </NavLink>
    </div>
}

export default DialogItem;
