import styled from "styled-components";
import {
  darkGery,
  fontFamilyMedium,
  pureDark2,
} from "../../../components/GlobalStyle";

export const ListBranchStyled = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;

  .table-heading {
    font-size: 18px !important;
    font-family: ${fontFamilyMedium} !important;
    color: ${pureDark2};
  }
  .ant-table-thead > tr > th {
    background: transparent !important;
    border-bottom: none !important;
    color: ${pureDark2};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;
    padding: 5px 8px;


    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyMedium};
    font-size: 14px !important;
    padding: 5px 8px;
    color: ${darkGery}!important;
  }


`;
