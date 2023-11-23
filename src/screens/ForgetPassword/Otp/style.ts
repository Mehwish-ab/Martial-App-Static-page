import styled from "styled-components";
import { fontFamilyMedium, tertiaryDark } from "../../../components/GlobalStyle";


const OtpInputsStyled = styled.div`
  display: flex;
  justify-content: space-evenly;


  .otp-input{
    border-radius: 10px !important;
    margin-bottom: 0px !important;
    width: 52px !important;
    height: 52px !important;
    text-align: center;
    
    color: ${tertiaryDark};
    font-family: ${fontFamilyMedium};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

`

export default OtpInputsStyled