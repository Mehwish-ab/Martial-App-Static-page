import styled from 'styled-components'
import { lightGrey5, mediaDeviceMax } from '../../../components/GlobalStyle'

const UpdateUserStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 86px);
    background: ${lightGrey5};
    margin: 0 auto;

    @media ${mediaDeviceMax.mobileL} {
        height: 100%;
    }
    label.label input[type='file'] {
        position: absolute;
        top: -100px;
    }
    .profile-img {
        height: 120px;
        width: 120px;
    }
    label {
        cursor: pointer;
        border-radius: 5px;
        margin: 5px;
        display: inline-block;
        display: flex;
        justify-content: center;
    }
    /* .label:hover {
    background: #5cbd95;
  }
  .label:active {
    background: #9fa1a0;
  } */
    .label:invalid + span {
        color: #000000;
    }
    .label:valid + span {
        color: #ffffff;
    }

    .inner-container {
        &-card {
            max-width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            border-radius: 6px;
            width: 100%;
            margin: auto;
            padding: 10px;
            &-form {
                width: 96%;
            }
        }
    }

    .is-invalid {
        border: 1px solid red;
        border-radius: 5px;
        background: white;
        border-radius: 2px;
        padding: 10px;
        width: 100%;
        width: -moz-available;
        outline: none;
        margin-bottom: 8px;
    }
    .customInput,
    .customPasswordInput {
        background: white;
        border: 1px solid #c6c6c8;
        border-radius: 2px;
        padding: 10px;
        width: 100%;
        width: -moz-available;
        outline: none;
        margin-bottom: 8px;
    }
    .ant-input-number-input {
        height: 40px;
        border: 1px solid #efeff4;
    }

    .ant-input-suffix {
        // margin-left: 30px;
    }

    @media screen and (max-width: 425px) {
        .inner-container {
            &-card {
                padding: 3px;
                &-logo {
                    h1 {
                        display: none;
                    }
                }
            }
        }
    }
`

export default UpdateUserStyle
