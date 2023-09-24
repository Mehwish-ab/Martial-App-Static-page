import styled from "styled-components";
import {
  fontFamilyMedium,
  secondaryDark2,
  tertiaryGrey7,
} from "../GlobalStyle";

const ItemInfoStyle = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid #bdc5e9;
  height: 62px;
  .heading {
    font-size: 14px;
    color: ${tertiaryGrey7};
    margin-bottom: 4px;
    font-family: "EnnVisions";
  }
  .title {
    font-size: 16px;
    font-family: ${fontFamilyMedium};
    color: ${secondaryDark2};
  }
`;

export default ItemInfoStyle;
