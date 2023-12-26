import React from 'react'
import { primaryColor } from '../../components/GlobalStyle'
import { EnnvisionModalStyle } from './style'
import ic_success from '../../assets/images/ic_success.svg'

type ennvisionsModalProps = {
    title?: string
    description?: string
    doTask: () => void
    closeText?: string
    bgBtn?: string
    color?: string
}

const EnnvisionModal: React.FC<ennvisionsModalProps> = ({
    title,
    description,
    doTask,
    closeText = 'DISMISS',
    bgBtn = 'transparent',
    color = primaryColor,
}) => {
    return (
        <EnnvisionModalStyle>
            <div className="inner-container">
                <button className="close-icon" onClick={doTask}>
                    &times;
                </button>
                <img src={ic_success} alt="Success Icon" />
                {title && <h6 className="title my-2">{title}</h6>}
                {description && <p className="description">{description}</p>}
            </div>
        </EnnvisionModalStyle>
    )
}

export default EnnvisionModal
