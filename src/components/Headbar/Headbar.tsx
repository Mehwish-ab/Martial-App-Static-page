import { HeadbarStyled } from "./style";

type headbarProps = {
  title: string;
  icon?: string;
  rightText?: string;
  doTask?: () => void;
};
const Headbar: React.FC<headbarProps> = ({
  title,
  icon = null,
  rightText = null,
  doTask = () => {},
}) => {
  return (
    <HeadbarStyled>
      <p className="title">{title}</p>
      {icon && (
        <img
          className="cursor-pointer"
          onClick={doTask}
          src={icon}
          alt="icon"
        />
      )}
      {rightText && <p className="title">{rightText}</p>}
    </HeadbarStyled>
  );
};

export default Headbar;
