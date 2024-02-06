import styled from 'styled-components'
import { pureDark, fontFamilyRegular } from '../../../components/GlobalStyle'

export const MessageModalStyled = styled.div`
    border-radius: 20px;
    background: #fff;
    .message {
        color: ${pureDark};
        font-family: ${fontFamilyRegular};
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 10px 0px 0px 0px !important;
        padding: 0px 0px 0px 0px !important;
    }
    .description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${pureDark};
        font-family: ${fontFamilyRegular};
        margin: 0px 0px 10px 0px;
    }
    .modal_content > img {
        width: 79px;
        height: 79px;
    }
`
