import styled from "styled-components";
import {
  darkBlue,
  fontFamilyMedium,
  lightDark2,
  lightDark3,
  lightGrey9,
  primaryColor,
  pureDark2,
  secondaryDark3,
  tertiaryGrey12,
  tertiaryGrey24,
  tertiaryGrey8,
} from "../../../components/GlobalStyle";

const RegisterStyle = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  background: ${tertiaryGrey8};
  margin: 0 auto;
  overflow-y: auto;
  margin-bottom: 16px;

 
 
  .signup-text {
    display: flex;
    justify-content:center;
    align-items:center;

    p,a,h6 {
        font-size: 14px;
        margin-bottom: 0
      }
      a{
        font-family: ${fontFamilyMedium};
        text-decoration: underline;
        color: ${darkBlue};
        margin: 0 2px;
      }
      h6{
        color: ${darkBlue};
      }
      a:hover{
        text-decoration: none;
      }
    }

    .register-input-fields label{
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-size: 16px;
      margin-bottom: 8px;
    }


  .phone-input-fields{
    margin-top: 17px;
  }

  .PhoneInput {
    /* border: 1px solid black; */
    width: 100%;
    height: 52px;
    /* border: 1px solid rgb(198, 198, 200); */
    border-radius: 8px;
  }
  .PhoneInput .PhoneInputCountry {
    width: 80px;
    position: relative;
    padding: 0 11px;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    transition: all 0.3s;
    justify-content: center;
    border-right: none;
    margin-right: 0;
  }
  .PhoneInput:hover input, .PhoneInput:hover .PhoneInputCountry {
    border-color: rgb(64, 169, 255);
    border-right-width: 1px;
    z-index: 1;
  }
  .country-left-to-right-border-radius {
    border-radius: 8px 0 0 8px;
  }
  .country-right-to-left-border-radius {
    border-radius: 0 8px 8px 0;
  }

  .PhoneInputCountrySelectArrow{
    font-size: 28px;
    color: #000 !important;
    opacity: 1;
  }

  .PhoneInputCountryIcon {
    width: 33px;
    height: 22px;
    object-fit: cover;
  }

  .PhoneInput input {
    width: 100%;
    height: 52px;
    padding: 0 11px 0px 0px;
    background-color: transparent;
    border-left: none;
    outline: 0;
    transition: all 0.3s linear;
    appearance: textfield !important;
    font-family: EnnVisionsMedium;
    font-size: 14px;
  }
  .phone-number-right-to-left-border-radius {
    border-radius: 8px 0 0 8px;
  }
  .phone-number-left-to-right-border-radius {
    border-radius: 0 8px 8px 0;
  }
  .PhoneInput input::placeholder {
    font-family: EnnVisionsMedium;
    color: rgb(198, 198, 200);
  }
  .custom-phone-input-label {
    display: block;
    color: rgb(27, 40, 63);
    text-transform: capitalize;
    font-size: 16px !important;
    font-family: EnnVisionsMedium, sans-serif;
    margin-bottom: 10px;
  }

  .role-section {
    font-family: ${fontFamilyMedium};
    .roles {
      border: 1px solid ${tertiaryGrey24};
    }
  }
  .inner-container {
    padding-top: 8px;
    &-card {
      &-inner{
        width: 100%;
      }
      .title {
        font-family: ${fontFamilyMedium};
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${pureDark2};
      }
      .message {
        color: ${lightDark3};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      max-width: 485px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      width: 100%;
      margin: auto;
      padding: 28px 23px 24px;
      &-form {
        width: 100%;
      }
    }
  } 

  .is-invalid {
    border: 1px solid red;
    background: white;
    padding: 15.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    margin-bottom: 2px;
    font-size: 16px;
    input{
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  .customInput{
    font-size: 16px;
    background: white;
    padding: 15.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    border-radius: 8px;
    border: 1px solid ${tertiaryGrey24};
    ::placeholder{
      font-style: normal;
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
    }
  }

  
  .customPasswordInput {
    font-size: 16px;
    background: white;
    padding: 15.5px;
    width: 100%;
    width: -moz-available;
    outline: none;
    line-height: normal;
    border-radius: 8px;
    border: 1px solid ${tertiaryGrey24};
    input{
      line-height: normal;
      &::placeholder{
        font-style: normal;
        color: ${lightDark2};
        font-weight: 400;
        line-height: normal;
        font-size: 16px;
      }
    }
  }



  input[type="email"]:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
    z-index: 1;
  }
  input[type="text"]:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
    z-index: 1;
  }

  input[type="text"] + div,
  input[type="email"] + div, 
  .ant-input-affix-wrapper + div{
    text-align: right !important;
  }

  @media screen and (max-width: 425px) {
    .inner-container {
      &-card {
        padding: 7px 14px;
        &-logo {
          h1 {
            display: none;
          }
        }
      }
    }
    a,p{
      font-size:14px
    }
  }
 

`;

export default RegisterStyle;

export const CreatedUserModalStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inner-container {
    max-width: 420px;
    background: #ffffff;
    box-shadow: 0px 0px 16px #00000017;
    border-radius: 7px;
    padding: 18px;
    img {
      height: 60px;
      margin-bottom: 12px;
      width: 190px;
    }
    .account-created {
      font-family: "EnnVisionsMedium";
      font-size: 19px;
    }
    .message {
      margin-top: 14px;
      font-size: 16px;
      width: 90%;
      margin: 0 auto;
      color: ${secondaryDark3};
      padding-bottom: 10px;
      border-bottom: 1px solid ${tertiaryGrey12};
    }
  }

  
`;
