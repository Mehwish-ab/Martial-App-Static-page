import styled from "styled-components";
import { whiteColor } from "../GlobalStyle";

const NewsFeedStyle = styled.section`
  background: #ffffff;
  /* box-shadow: 0px 0px 12px #00000029; */
  border-radius: 8px;
  color: #000000;
  padding: 10px 0;
  /* height: 750px; */
  height: 90vh;
  width: 650px;
  transform: translateX(-19%);
  overflow-y: auto;
  font-family: "EnnVisionsMedium";
  @media (max-width: 1024px) {
    width: 600px;
    transform: translateX(-5%);
  }
  @media (max-width: 786px) {
    width: auto;
    transform: translateX(0%);
  }
  .heading {
    text-align: center;
    position: relative;

    h4 {
      font-size: 17px;
      letter-spacing: 0px;
      color: #000000;
    }
    .close-btn {
      width: 35px;
      height: 35px;
      background: #efeff4;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
      transition: all 0.2s;

      svg {
        font-size: 20px;
        color: #232837;
      }
      top: 0%;
      transform: translateY(12%);
      right: 1%;
      fill: white;
      position: absolute;
      font-size: 30px;
    }
  }
`;

export default NewsFeedStyle;

// suggestions modal style
export const SuggesstionsModalStyle = styled.div`
  background: ${whiteColor};
  /* width: 549px; */
  overflow-y: auto;
  height: 566px;
  border-radius: 8px;
  margin: 0 auto;
  /* padding: 20px; */
`;

// suggestions modal style

export const FollowersModalStyle = styled.div``;

// suggestions modal style
export const FollowingModalStyle = styled.div``;

// likes Modal style

export const LikesModalStyle = styled.div``;
