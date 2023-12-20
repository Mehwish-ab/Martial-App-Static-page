import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, pureDark2, tertiaryGrey24 } from "../../components/GlobalStyle";

export const CurrencyStyling = styled.div`
background-color: #fff;
border-radius: 20px;
padding: 16px;
border: 1px solid ${tertiaryGrey24};
    .curreny-title{
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .curreny-subtitle{
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; 
    }
    .currency-heading{
        font-family: ${fontFamilyRegular};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: ${pureDark2};
        line-height: normal;
    }
    .curreny-text{
        font-size: 14px;
        font-weight: 400;
        font-family: ${fontFamilyRegular};
        color: ${lightDark2};
        font-style: normal;
        line-height: 22px; 
    }

    .card-mainContainer{
        padding: 16px;

    }

    .card-mainContainer:hover{
        background-color: #f2f2f2;
        border-radius: 10px;
        cursor: pointer;
    }

    .activeCheck{
        display: none;
    }

    .card-mainContainer:focus .activeCheck,
    .card-mainContainer:active .activeCheck{
       display: block;
    }
    
    .card-mainContainer:active .currency-heading,
    .card-mainContainer:active .curreny-text{
        color: #2782e8;
    }


    .mt-30{
        margin-top: 30px;
    }


`;