import styled from "styled-components";
import {
  fontFamilyMedium,
  lightGrey2,
  pureDark,
  secondaryGrey,
  tertiaryGrey14,
  whiteColor,
} from "../GlobalStyle";
export const ProfileIntroStyle = styled.div`
  .property-listing-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .main-profile-icon {
    width: 58px;
    height: 58px;
    border-radius: 50%;
  }
  .profile-details {
    margin-left: 14px;
    &-title {
      font-family: "EnnVisionsMedium";
      font-size: 14px;
    }
    &-sub-title {
      color: ${tertiaryGrey14};
      font-size: 14px;
    }
    .verified-icon {
      height: 16px;
    }
  }
`;

export const LikeProfileBoxStyle = styled.div`
  .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .profile-details {
    margin-left: 14px;
    &-title {
      font-family: ${fontFamilyMedium};
      font-size: 14px;
    }
    &-sub-title {
      color: ${tertiaryGrey14};
      font-size: 14px;
    }
    .verified-icon {
      height: 16px;
    }
  }
`;

export const PrevBtnStyle = styled.button`
  border-radius: 50%;
  top: 50%;
  left: 0;
  height: 70px;
  width: 70px;
  font-size: 42px;
  position: absolute;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: black;
  display: grid;
  place-items: center;
  border-color: transparent;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const PostPrevBtnStyle = styled.button`
  border-radius: 50%;
  top: 50%;
  left: 0;
  height: 44px;
  width: 44px;
  font-size: 42px;
  position: absolute;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: black;
  display: grid;
  place-items: center;
  border-color: transparent;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const PostNextBtnStyle = styled.button`
  border-radius: 50%;
  top: 50%;
  right: 0;
  height: 44px;
  width: 44px;
  font-size: 42px;
  position: absolute;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: black;
  display: grid;
  place-items: center;
  border-color: transparent;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;
export const NextBtnStyle = styled.button`
  border-radius: 50%;
  top: 50%;
  right: 0;
  height: 70px;
  width: 70px;
  font-size: 42px;
  position: absolute;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: black;
  display: grid;
  place-items: center;
  border-color: transparent;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

type showCommentsProps = {
  bgColor?: string;
  color?: string;
  border?: string;
};
export const ShowCommentsBtnStyle = styled.div<showCommentsProps>`
  .show-comments-btn {
    border-radius: 20px;
    padding: 10px;
    width: "40%";
    background-color: ${(props) => props.bgColor || "transparent"};
    border: 1px solid ${(props) => props.border || pureDark};
    color: ${(props) => props.color || pureDark};
    &::placeholder {
      padding: 10px;
      color: ${(props) => props.color || pureDark};
    }
  }
`;
export const ShowCommentsLightBtnStyle = styled.div`
  .show-comments-btn {
    border-radius: 20px;
    padding: 10px;
    background-color: transparent;
    border: 1px solid ${whiteColor};
    color: ${whiteColor};
    &::placeholder {
      padding: 10px;
      color: ${whiteColor};
    }
  }
`;

export const ComingSoonStyle = styled.div`
  padding: 12px;

  &-placeholder {
    width: 100%;
  }
  .inner-section {
    /* border: 1px solid ${lightGrey2}; */
    height: 72vh;
    position: relative;
    .center-section {
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      .comming-soon-text {
        color: ${secondaryGrey};
        font-size: 24px;
        margin-top: 6px;
        @media screen and (max-width: 786px) {
          font-size: 20px;
        }
        @media screen and (max-width: 480px) {
          font-size: 18px;
        }
      }
    }
  }
`;
