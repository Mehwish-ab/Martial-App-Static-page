import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, pureDark2 } from "../../../components/GlobalStyle";


export const MainSettingPageStyle = styled.div`
.MainContainer {
    border-radius: 20px;
    h3 {
        font-weight: 500;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
      }

    p{
        font-weight: 400;
        font-size: 14px;
        font-family: ${fontFamilyRegular};
        color: ${lightDark2};
        margin-bottom: 2px;
    }

    .cards{
        .list-item{
            border-radius: 7px;
            border: 1px solid #E7E7E7;
            background-color: #fff;
            padding: 16px;
            &-title{
                font-family: ${fontFamilyMedium}
                color: ${pureDark2};
                font-size: 18px;
                line-height: normal;
                font-weight: 500;
            }
            &-value{
                font-family: ${fontFamilyRegular}
                color: ${lightDark2};
                font-size: 14px;
                line-height: normal;
                font-weight: 500;
                margin-top: 10px;
            }
            &-link{
                font-family: ${fontFamilyRegular}
                color: #1877F2;
                font-size: 14px;
                line-height: normal;
                font-weight: 500;
                margin-top: 10px;
                text-decoration: none;
            }
            &-link:hover{
                text-decoration: underline;
            }
        }

    }
    }

`;