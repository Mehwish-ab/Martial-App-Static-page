import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  mainColor,
} from "../../../components/GlobalStyle";

export const ListInstructorStyled = styled.div`
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
