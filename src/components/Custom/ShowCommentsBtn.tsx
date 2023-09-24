import { ShowCommentsBtnStyle } from "./style";

type showCommentsProps = {
  turnOffCommenting: boolean;
  saveFavourite: boolean;
  sharingEnabled: boolean;
  firstName: string;
  lastName: string;
  onClick: () => void;
  bgColor?: string;
  color?: string;
  border?: string;
};
const ShowCommentsBtn: React.FC<showCommentsProps> = ({
  turnOffCommenting,
  firstName,
  lastName,
  onClick,
  saveFavourite,
  sharingEnabled,
  bgColor,
  color,
  border,
}) => {
  return (
    <ShowCommentsBtnStyle
      className={`${!saveFavourite && !sharingEnabled ? "w-100" : "w-100"}`}
      bgColor={bgColor}
      color={color}
      border={border}
    >
      <button
        disabled={turnOffCommenting}
        onClick={onClick}
        className="mt-2 show-comments-btn text-start w-100"
      >
        {turnOffCommenting
          ? "unable to comment..."
          : `reply to ${firstName} ${lastName}...`}
      </button>
    </ShowCommentsBtnStyle>
  );
};

export default ShowCommentsBtn;
