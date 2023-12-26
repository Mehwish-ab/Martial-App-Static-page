import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, pureDark2, tertiaryGrey24 } from "../../components/GlobalStyle";

export const LanguageStyling = styled.div`
background-color: #fff;
border-radius: 20px;
padding: 16px;
border: 1px solid ${tertiaryGrey24};
    .language-title{
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .language-subtitle{
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; 
    }
    .language-text{
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; 
    }

    .mt-30{
        margin-top: 30px;
    }


`;