import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark2,
} from '../../../components/GlobalStyle'

export const TimeTableCreate = styled.div`
padding: 10px 4px;
.form {
        padding: 16px;
        background-color: #fff;
        border-radius: 12px;s
    }
    .ant-tabs-tab-btn{
        color: ${pureDark2};
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .timetable-heading {
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 16px;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .AddButton{
        label {
            font-size: 16px;
            text-transform: capitalize;
            color: ${pureDark2};
            font-weight: 500;
            font-family: ${fontFamilyRegular};
            display: block;
            font-style: normal;
            line-height: 20px;
            margin-bottom: 12px;
            }
        span {
            cursor: pointer;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            padding: 7px 10px;
            border-radius: 4px;
            background:#BCE7F8;
            width: 90px;
            height: 30px;
            color: ${pureDark2} !important;
            font-size: 14px !important;
            display: block;
            position: relative;
            text-align: center;
        }
    }

    .actionContainer{
        label {
            font-size: 16px;
            text-transform: capitalize;
            color: ${pureDark2};
            font-weight: 500;
            font-family: ${fontFamilyRegular};
            display: block;
            font-style: normal;
            line-height: 20px;
            margin-bottom: 12px;
            }
            div {
                display: flex;
                justify-content: center;
            }
    }
    
`
