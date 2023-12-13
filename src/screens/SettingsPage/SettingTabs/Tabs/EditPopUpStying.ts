import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, pureDark2 } from "../../../../components/GlobalStyle";

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

`;