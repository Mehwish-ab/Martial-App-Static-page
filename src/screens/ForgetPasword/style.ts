import styled from "styled-components";
import { primaryColor, pureDark } from "../../components/GlobalStyle";
import banner from "../../assets/icons/ic_side_banner.svg";

export const ForgetPasswordStyle = styled.div`
  .left-side-img {
    background-image: url(${banner});
    background-size: contain;
    height: 100vh;
    background-repeat: no-repeat;
  }

  .right-side {
    max-width: 575px;
    display: flex;
    justify-content: center;
    height: 90vh;
    margin: 0 auto;
    .img-logo {
      img {
        width: 332px;
        height: 66px;
      }
    }
    .main-heading {
      font-size: 26px;
      color: ${primaryColor};
      font-weight: 700;
      margin-top: 44px;
      line-height: 30px;
      letter-spacing: 1px;
    }
    .mini-heading {
      color: ${pureDark};
      font-size: 18px;
      font-weight: 700;
    }
    .mini-heading {
      font-size: 16px;
    }

    .forget-footer {
      p {
        color: ${primaryColor};
        font-weight: 500;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .left-side-img {
      background-size: cover;
    }
    .right-side {
      max-width: 475px;
      .img-logo {
        img {
          width: 270px;
        }
      }
      .main-heading {
        font-size: 26px;
        margin-top: 28px;
        line-height: 27px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .right-side {
      max-width: 375px;
      .img-logo {
        img {
          width: 230px;
        }
      }
      .main-heading {
        font-size: 22px;
        margin-top: 23px;
        line-height: 24px;
      }
      .mini-heading {
        font-size: 14px;
      }
    }
  }
`;

export default ForgetPasswordStyle;
