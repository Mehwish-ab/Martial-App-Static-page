import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, pureDark2, tertiaryGrey24 } from "../../../../components/GlobalStyle";

export const EditPopUpStying = styled.div`
h3{
    font-family: ${fontFamilyMedium};
    color: ${pureDark2};
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
}
p{
    font-family: ${fontFamilyRegular};
    color: ${lightDark2};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
}


.is-invalid {
    height: 52px;
    border: 1px solid #E43535;
    background: white;
    padding: 15.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    margin-bottom: 2px;
    font-size: 16px;
    input{
      color: ${lightDark2};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: ${fontFamilyRegular};

    }
  }
  .customInput{
    height: 52px;
    font-size: 16px;
    background: white;
    padding: 16.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    border-radius: 8px;
    font-family: ${fontFamilyRegular};
    border: 1px solid ${tertiaryGrey24};
    ::placeholder{
      font-style: normal;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
    }
  }

  
  .customPasswordInput {
    height: 52px;
    font-size: 16px;
    background: white;
    padding: 15.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    border-radius: 8px;
    font-family: ${fontFamilyRegular};
    border: 1px solid ${tertiaryGrey24};
    input{
      font-style: normal;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
      &::placeholder{
        font-style: normal;
        font-family: ${fontFamilyRegular};
        color: ${lightDark2};
        font-weight: 400;
        line-height: normal;
        font-size: 16px;
      }
    }
  }

`;