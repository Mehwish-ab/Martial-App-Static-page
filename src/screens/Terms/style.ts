import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, pureDark2, tertiaryGrey24 } from "../../components/GlobalStyle";

export const TermsStyling = styled.div`
    border: 1px solid ${tertiaryGrey24};
    background-color: #fff;
    border-radius: 20px;
    width: 90%;
    margin: 20px auto;
    padding: 20px 30px;

    h3{
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    p{
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
    
    span{
        font-family: ${fontFamilyMedium};
        font-weight: 500;
    }

`;