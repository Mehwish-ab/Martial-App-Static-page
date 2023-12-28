import styled from 'styled-components'
import { pureDark2 } from '../GlobalStyle'

export const CustomSelectContainer = styled.div`
    margin-bottom: 10px;
    width: 100%;

    label {
        font-size: 13px;
        text-transform: capitalize;
        display: block;
        color: ${pureDark2};
        margin-bottom: 10px;
    }
    .ant-select-arrow {
        color: #000000;
    }

    .ant-select {
        background: white;
        border: 0.5px solid #d6d6e0;
        border-radius: 3px;
        /* height: 48px; */
        padding: 4px;
        width: 100%;
    }
    .ant-select-selector {
        /* height: 47px !important; */
        /* border: none !important;   
        padding: 8px !important;
        height: 47px !important;
       margin-bottom: 15px;  */
    }
`
