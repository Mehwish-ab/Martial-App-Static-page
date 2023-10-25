import styled from "styled-components";
import {
  darkBlue,
  fontFamilyBold,
  fontFamilyRegular,
  tertiaryGrey21,
} from "../GlobalStyle";

export const RightbarStyled = styled.div`
  display: block;
  @media screen and (max-width: 1300px) {
    display: none;
  }
  flex: 1;
  .custom-card {
    border-radius: 10px;
    margin: 20px auto;
    padding: 20px 10px;
    flex-direction: row;
  }
  h3,
  a {
    font-size: 22px;
    font-family: "EnnVisions", sans-serif;
    color: ${darkBlue};
    font-weight: 500;
  }
  a {
    font-size: 16px;
    // text-decoration: none;
  }

  .date-time-area {
  }

  .notification-area {
    background: #fff;
    border-radius: 10px;
    position: relative;

    > div {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      > .ant-btn {
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 0;
        box-shadow: none;
      }
      > .ant-btn-icon-only {
        vertical-align: 0;
      }
    }

    .notification-count {
      position: absolute;
      top: -11px;
      right: 7px;
      content: "";
      z-index: 1;
      color: white;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: -5px;
        width: 20px;
        height: 20px;
        background: red;
        border-radius: 50%;
        z-index: -1;
      }
    }
  }
`;

export const SectionVideosBodyStyled = styled.div`
  .one-video {
    gap: 5px;
    border: 1px solid ${tertiaryGrey21};
    border-radius: 10px;
    padding: 10px;
    .video-details {
      flex: 1;
      .video-heading {
        font-size: 16px;
        font-family: ${fontFamilyBold};
      }
      .video-description {
        margin-top: 10px;
        margin-bottom: 5px;
        font-family: ${fontFamilyRegular};
        font-size: 14px;
      }
    }
    .video-thumbnail {
      position: relative;

      img {
        width: 70px;
        height: 102px;
      }
      .play-icon {
        position: absolute;
        top: 0;
        left: 30%;
        width: 30px;
      }
    }
  }
`;

export const UpcomingBookingBoxStyled = styled.div`
  .one-booking {
    border-bottom: 1px solid ${tertiaryGrey21};
    &-inner {
      padding: 10px;
    }
    &-detail {
      flex: 1;
    }
    &-heading,
    &-numbers {
      font-size: 16px;
      font-family: ${fontFamilyBold};
    }
    &-numbers {
      > img {
        margin-left: 6px;
      }
    }
    &-date,
    &-time {
      font-size: 14px;
      font-family: ${fontFamilyRegular};
    }

    .ant-btn {
      font-family: ${fontFamilyBold} !important;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
  }
`;
