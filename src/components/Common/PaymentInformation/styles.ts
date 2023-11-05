import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  mainColor,
  tertiaryGrey24,
} from "../../GlobalStyle";

export const PaymentMethodStyled = styled.div`
  // .ant-switch {
  //   height: 5px !important;
  //   min-width: 30px !important;

  //   .ant-switch-handle {
  //     top: -2px !important;
  //     width: 13px !important;
  //     height: 13px !important;
  //     left: calc(100% - 14px - 2px);
  //     &::before {
  //       background: ${tertiaryGrey24};
  //     }
  //   }
  // }
  // .ant-switch-checked {
  //   background-color: ${tertiaryGrey24};

  //   .ant-switch-handle {
  //     &::before {
  //       background: ${mainColor};
  //     }
  //   }
  // }
`;

export const PaymentInfoTableStyled = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;

  .table-heading {
    font-size: 23px !important;
    font-family: ${fontFamilyBold} !important;
    color: ${darkBlue};
  }
  .ant-table-thead > tr > th {
    background: transparent !important;
    border-bottom: none !important;
    color: ${darkBlue};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;

    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyMedium};
    font-size: 14px !important;
    color: ${darkGery}!important;
  }
`;
