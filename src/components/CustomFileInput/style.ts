import styled from 'styled-components'
import { fontFamilyRegular, pureDark2 } from '../GlobalStyle'

type CustomFileInputStyleProps = {
    labelFamily: string
    labelFont: string
}
const CustomFileInputStyle = styled.div<CustomFileInputStyleProps>`
    label {
        font-family: ${(props) => props.labelFamily};
        font-size: ${(props) => props.labelFont};
        // margin-bottom: 7px;
        color: ${pureDark2};
        text-transform: capitalize;
        span {
            color: #4f4f4f;
            font-family: ${fontFamilyRegular};
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
    .customdatepicker {
        height: 50px;
        border-radius: 8px;
        padding: 10px;
        padding-right: 24px;
    }
    input[type='file']:focus {
        outline: none;
    }

    .mainUploadContainer {
        position: relative;
    }
    .uploadImg {
        position: absolute;
        top: 14px;
        right: 8px;
    }
`
export default CustomFileInputStyle

export const CustomizedFileInputStyle = styled.div`
    .upload-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        &-item {
            color: gray;
            background-color: white;
            padding: 8px 20px;
            border-radius: 7px;
            font-size: 20px;
            font-weight: bold;
        }

        input[type='file'] {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
        }
    }
`
