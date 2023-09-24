import styled from "styled-components";
import martial_logo from "../assets/icons/logo.svg";
import Loader from "./Loader/Loader";

const IntroScreen = () => {
  return (
    <Wrapper>
      <img src={martial_logo} alt="martial-logo" />
      <div className="mt-3">
        <Loader />
      </div>
    </Wrapper>
  );
};

export default IntroScreen;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 200px;
    width: 200px;
  }
`;
