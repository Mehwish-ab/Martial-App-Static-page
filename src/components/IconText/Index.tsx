import IconWithTextStyle from "./style";

type IconWithTextProps = {
  marginTop: string;
  icon: string;
  title: string;
};

const IconWithText: React.FC<IconWithTextProps> = ({
  marginTop,
  icon,
  title,
}: any) => {
  return (
    <IconWithTextStyle marginTop={marginTop}>
      <div className="author-bio">
        <div className="profession d-flex align-items-center">
          <span>
            <img src={icon} alt="profile" />
          </span>
          <p className="title">{title}</p>
        </div>
      </div>
    </IconWithTextStyle>
  );
};

export default IconWithText;
