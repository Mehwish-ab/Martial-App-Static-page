import { FiChevronLeft } from "react-icons/fi";
import { PostPrevBtnStyle } from "./style";

type postPrevBtnProps = {
  clicked: () => void;
};
const PostPrevBtn: React.FC<postPrevBtnProps> = ({ clicked }) => {
  return (
    <PostPrevBtnStyle type="button" onClick={clicked}>
      <FiChevronLeft />
    </PostPrevBtnStyle>
  );
};

export default PostPrevBtn;
