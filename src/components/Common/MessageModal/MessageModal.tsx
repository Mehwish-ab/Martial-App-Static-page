import React from 'react'
// import successIcon from "../../../assets/icons/ic_success.svg";
import successIcon from '../../../assets/icons/ic_updateSuccess.svg'
import errorIcon from '../../../assets/icons/ic_error.svg'
import { MessageModalStyled } from './styles'

interface MessageModalProps {
    type: string
    // image: string;
    message: string
    description: string
}
const MessageModal = ({
    type,
    message,
    description,
}: MessageModalProps): JSX.Element => {
    return (
        <MessageModalStyled>
            <div className="d-flex justify-content-center align-items-center flex-column pt-0 gap-2 modal_content">
                <img
                    src={
                        (type === 'success' ? successIcon : errorIcon) as string
                    }
                    alt=""
                />
                <h4 className="message">{message}</h4>
                <p className="description">{description}</p>
            </div>
        </MessageModalStyled>
    )
}

export default MessageModal
