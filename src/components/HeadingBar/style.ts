import styled from 'styled-components'
import { basicColor } from '../GlobalStyle'

export const HeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h1 {
        font-size: 20px;
        margin: 0;
    }
    .heading-bar {
        border-top: 3px solid ${basicColor};
        width: 90px;
    }
`
