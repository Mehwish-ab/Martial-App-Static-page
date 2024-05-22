import styled from 'styled-components'
import {
    fontFamilyMedium,
    lightDark2,
    maastrichtBlue,
    mediaDeviceMax,
    pureDark2,
} from '../../../components/GlobalStyle'

export const CreateRoomsStyle = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center; /* Center align the form */
    align-items: center; /* Vertically center the form */
    height: 100%; /* Make the container full height */

    h3 {
        font-weight: 500;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
    }
    .form {
        width: 100%; /* Set form width to full */
        max-width: 600px; /* Adjust maximum width as needed */
        padding: 20px;
        border-radius: 20px;
    }
    .mt-20 {
        margin-top: 20px;
    }
    .ant-form label {
        font-size: 16px; /* Adjust label font size */
        color: ${lightDark2}; /* Adjust label color */
    }
    .ant-input {
        padding: 10px; /* Adjust input padding */
        input::placeholder {
            color: ${lightDark2} !important;
        }
    }
    .ant-btn {
        color: ${maastrichtBlue};
    }
    .ant-input-affix-wrapper {
        height: 50px;
        border-radius: 10px;
        input {
            height: 48px;
            background-color: transparent;
        }
    }
    div > label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
