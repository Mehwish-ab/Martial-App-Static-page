import styled from 'styled-components'
import { primaryColor } from '../GlobalStyle'

export const ViewMoreStyled = styled.div`
    .view-more {
        margin-top: 26px;
        &-text {
            color: ${primaryColor};
            font-size: 14px;
            cursor: pointer;
        }
        &-line {
            height: 3px;
            border-radius: 7px;
            background-color: ${primaryColor};
            width: 60px;
            margin-top: 10px;
            margin-left: 10px;
            opacity: 0.6;
        }
    }
`
