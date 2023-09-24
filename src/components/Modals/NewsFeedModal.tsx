import { Container } from "react-bootstrap";
import NewsFeedStyle from "./style";
import close_icon from "../../assets/icons/ic_remove_selected.svg";
type newsfeedModalProps = {
  children: React.ReactNode;
  title: string;
  closeHandler: () => void;
};
const NewsfeedModal: React.FC<newsfeedModalProps> = ({
  children,
  title,
  closeHandler,
}) => {
  return (
    <NewsFeedStyle>
      <div className="heading">
        <h4 className="mb-0 pt-2">{title}</h4>
        <img
          className="close-btn"
          src={close_icon}
          onClick={closeHandler}
          alt="close"
        />
      </div>
      <hr className="mt-3 mb-2" />
      <Container>{children}</Container>
    </NewsFeedStyle>
  );
};

export default NewsfeedModal;
