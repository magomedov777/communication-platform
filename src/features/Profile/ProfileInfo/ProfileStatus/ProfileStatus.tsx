import React, { ChangeEvent } from 'react';
import { SvgSelector } from "../../../../common/components/svgSelector/SvgSelector";
import style from "./ProfileStatus.module.scss"

type PropsType = {
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean;
}

class ProfileStatus extends React.Component<PropsType> {
    state = {
        inputForm: false,
        status: this.props.status,
    }
    setInputSpan = () => {
        this.setState({
            inputForm: true
        })
    }
    sendStatus = () => {
        this.setState({
            inputForm: false
        })
        this.props.updateStatusTC(this.state.status)
    }
    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
    render() {
        return (
            <div className={style.profileStatusBlock}>
                {
                    this.props.isOwner
                        ? (
                            this.state.inputForm
                                ?
                                <div>
                                    <input onChange={this.onChangeHandler} autoFocus={true} onBlur={this.sendStatus}
                                        value={this.state.status} type="text" />
                                </div>
                                :
                                <div>
                                    <span onDoubleClick={this.setInputSpan} className={style.status}>
                                        <span>{
                                            this.props.status === null
                                                ? "status "
                                                : this.state.status
                                        }</span>
                                        <SvgSelector svgName={'Pencil'} />
                                    </span>
                                </div>
                        )
                        : <span className={style.status}>{
                            this.props.status === null
                                ? "status"
                                : this.state.status
                        }</span>
                }
            </div>
        );
    }
};

export default ProfileStatus

