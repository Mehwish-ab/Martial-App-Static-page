import { FiChevronRight } from "react-icons/fi";
import { NextBtnStyle } from "./style";

type nextBtnProps = {
  clicked: () => void;
};
const NextBtn: React.FC<nextBtnProps> = ({ clicked }) => {
  return (
    <NextBtnStyle type="button" onClick={clicked}>
      <FiChevronRight />
    </NextBtnStyle>
  );
};

export default NextBtn;
