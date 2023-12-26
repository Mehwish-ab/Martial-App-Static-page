import styled from 'styled-components'
import { primaryColor, whiteColor } from '../GlobalStyle'

const PurchaseBtnsStyle = styled.div`
    .purchase-btns {
        margin-top: 12px;
        background-color: ${whiteColor};
        border-radius: 7px;
        height: 44px;
        padding: 3px;
        border: 1px solid #f5f5f5;
        border-radius: 4px;

        .active {
            background-color: ${primaryColor};
            height: 100%;
            border-radius: 4px;
            color: ${whiteColor};
        }
        button {
            background: transparent;
            font-size: 16px;
        }
    }
`

export default PurchaseBtnsStyle
