import styled from 'styled-components'
import {
    darkBlue,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    lightDark3,
    pureDark2,
    secondaryDark3,
    tertiaryGrey12,
    tertiaryGrey24,
    tertiaryGrey8,
} from '../../components/GlobalStyle'

const HelpSupportStyling = styled.div`
  background: ${tertiaryGrey8};
  overflow-y: auto;
  
  .signup-text {
    display: flex;
    justify-content:center;
    align-items:center;

    p,a,span {
        margin-bottom: 0
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      a{
        font-family: ${fontFamilyMedium};
        text-decoration: underline;
        color: ${darkBlue};
        margin: 0 2px;
      }
      span{
        font-family: ${fontFamilyMedium};
        color: ${darkBlue};
        a:hover{
          text-decoration: none;
        }
      }
    }

    .register-input-fields {
    label{
      font-style: normal;
      line-height: normal;
      font-size: 16px;
      color: ${pureDark2};
      font-family: ${fontFamilyMedium};
      margin-bottom: 8px;
    }
    .ant-checkbox-wrapper{
      margin-bottom: 0px;
    }
  }
  .remeberText{
    color: ${pureDark2};
    font-family: ${fontFamilyRegular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
        font-family: ${fontFamilyRegular};
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
      margin: auto;
      padding: 28px 23px 24px;
      &-form {
        width: 100%;
      }
    }
  } 
  .PhoneInput {
    width: 100%;
    height: 52px;
  input{
    height: 52px;
  }
  .PhoneInputCountry{
    height: 52px;
   }
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
 

`

export default HelpSupportStyling

export const CreatedUserModalStyle = styled.div`
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .inner-container {
        max-width: 485px;
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
            font-family: 'EnnVisionsMedium';
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
`
