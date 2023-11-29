import styled from "styled-components";
import {
  fontFamilyBold,
  fontFamilyRegular,
  lightDark2,
  pureDark2,
} from "../../../components/GlobalStyle";

export const CardViewStyled = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 20px;

  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 18px;
      font-family: ${fontFamilyBold};
      color: ${pureDark2};
    }
  }
  .custom_card {
    width: 330px;
    height: 340px;
    border: 1px solid #eaeaea;
    margin: 0 20px 20px 0;

    .ant-list-item {
      padding: 12px;

      &-meta-title {
        margin-bottom: 0;
        font-family: ${fontFamilyBold};
        font-size: 14px;
        color: ${pureDark2};
      }
      &-meta-description {
        font-family: ${fontFamilyRegular};
        font-size: 12px;
        color: ${lightDark2};
      }
    }

    &_placeholder_img {
      width: 100%;
      img {
        width: 100%;
        object-fit: contain;
      }
    }

    &_para {
      font-size: 12px;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
      padding: 16px;
      letter-spacing: 1px;
    }

    &_footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      padding: 0 12px;
      &_rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .ant-rate {
          &-star {
            margin-right: 2px;
          }
        }
      }

      &_link {
        font-size: 12px;
        font-family: ${fontFamilyBold};
        color: #b3b3b3;
      }
    }
  }
`;
