import styled from "styled-components";
import {
  greenishColor,
  lightBlue,
  lightGrey5,
  primaryColor,
  pureDark,
  secondaryDark4,
  tertiaryGrey7,
  tertiaryGrey8,
  whiteColor,
} from "../GlobalStyle";

const UserProfileBoxStyle = styled.div`
  border-radius: 6px;
  padding-top: 16px;
  max-width: 1040px;
  margin: 0 auto;
  background: ${whiteColor};
  /* upload profile image */

  label.label input[type="file"] {
    position: absolute;
    top: -1000px;
  }
  .label {
    cursor: pointer;
    border-radius: 5px;
    margin: 5px;
    display: inline-block;
  }
  /* .label:hover {
    background: #5cbd95;
  }
  .label:active {
    background: #9fa1a0;
  } */
  .label:invalid + span {
    color: #000000;
  }
  .label:valid + span {
    color: #ffffff;
  }

  .owner-details {
    border: 1px solid ${lightGrey5};
    border-radius: 5px;
    padding: 14px;

    .profile-img {
      height: 80px;
      border-radius: 50%;
      width: 80px;
    }

    .bio {
      h6 {
        font-size: 18px;
        font-family: "EnnVisionsMedium";
        color: ${pureDark};
      }
      .branch {
        color: ${tertiaryGrey7};
        font-size: 16px;
      }
      .location {
        color: ${secondaryDark4};
        font-size: 14px;
      }
    }
    .sold-properties {
      border: 1px solid ${tertiaryGrey8};
      border-radius: 5px;

      .properties {
        background: ${tertiaryGrey8};
        border: 1px solid #f5f5f5;
        border-radius: 5px;

        .quantity {
          font-size: 18px;
          font-family: "EnnVisionsMedium";
        }
      }
      .title {
        color: ${tertiaryGrey7};
        font-size: 15px;
      }
      .chat-btn {
        background: ${greenishColor};
        border-radius: 5px;
        font-size: 14px;
        padding: 1px;
        display: flex;
        align-items: center;
        color: ${whiteColor};
        width: 96%;
        padding: 4px;
      }
      .call-btn {
        background: ${primaryColor};
        border-radius: 5px;
        font-size: 14px;
        padding: 4px;
        color: ${whiteColor};
        width: 96%;
      }
      .chat-btn,
      .call-btn {
        img {
          height: 17px;
          width: 17px;
        }
      }
      @media screen and (min-width: 576px) {
        margin-top: -10px;
        button {
          width: 100%;
        }
      }
      @media screen and (max-width: 576px) {
        margin-top: 10px;
        button {
          width: 50%;
        }
      }
    }
  }
`;
export default UserProfileBoxStyle;
