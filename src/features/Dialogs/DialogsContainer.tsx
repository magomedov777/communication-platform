import React, { ComponentType } from "react";
import { DialogsPageType, } from "../../redux/store";
import { addMessageAC } from "./dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../app/redux-store";
import { compose, Dispatch } from "redux";
import { withAuthRedirect } from "../../common/hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogs: DialogsPageType
}

type MapDispatchToPropsType = {
    addPost: (newValue: string) => void
}
let mapStateToProps = (store: AppStateType): MapStateToPropsType => {
    return {
        dialogs: store.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newValue: string) => {
            dispatch(addMessageAC(newValue))
        },
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
