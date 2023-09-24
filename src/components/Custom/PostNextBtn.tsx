import { FiChevronRight } from "react-icons/fi";
import { PostNextBtnStyle } from "./style";

type postNextBtnProps = {
  clicked: () => void;
};
const PostNextBtn: React.FC<postNextBtnProps> = ({ clicked }) => {
  return (
    <PostNextBtnStyle type="button" onClick={clicked}>
      <FiChevronRight />
    </PostNextBtnStyle>
  );
};

export default PostNextBtn;
