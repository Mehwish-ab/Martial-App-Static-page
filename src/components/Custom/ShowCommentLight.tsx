import { ShowCommentsLightBtnStyle } from './style'

type showCommentsProps = {
    turnOffCommenting: boolean
    saveFavourite: boolean
    sharingEnabled: boolean
    firstName: string
    lastName: string
    onClick: () => void
}
const ShowCommentsLightBtn: React.FC<showCommentsProps> = ({
    turnOffCommenting,
    firstName,
    lastName,
    onClick,
    saveFavourite,
    sharingEnabled,
}) => {
    return (
        <ShowCommentsLightBtnStyle
            className={`${
                !saveFavourite && !sharingEnabled ? 'w-100' : 'w-75'
            }`}
        >
            <button
                disabled={turnOffCommenting}
                onClick={onClick}
                className="mt-2 show-comments-btn text-start w-100"
            >
                {turnOffCommenting
                    ? 'unable to comment...'
                    : `reply to ${firstName} ${lastName}...`}
            </button>
        </ShowCommentsLightBtnStyle>
    )
}

export default ShowCommentsLightBtn
