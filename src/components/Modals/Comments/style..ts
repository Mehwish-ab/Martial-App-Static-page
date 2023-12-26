import styled from 'styled-components'
import {
    fontFamilyRegular,
    lightGrey,
    primaryColor,
    primaryRed,
    secondaryDark4,
    tertiaryGrey19,
    tertiaryGrey7,
    whiteColor,
} from '../../GlobalStyle'

const CommentsStyle = styled.section`
    position: relative;
    /* display: flex;
  flex-direction: column;
  justify-content: center; */
    height: 72vh;

    @media screen and (max-width: 480px) {
        height: 72vh;
    }

    .post-comments {
        overflow-y: auto;
        height: 70vh;

        /* width */
        ::-webkit-scrollbar {
            width: 8px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #bcc0c4;
            border-radius: 7px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }

    .add-comment-form {
        position: absolute;
        bottom: -10%;
        width: 100%;
        padding-bottom: 10px;
    }

    .comment {
        margin-top: 5px;
        display: flex;
        gap: 15px;
        align-items: flex-start;

        .profile {
            background: #f1f2f6;
            border-radius: 5px;
            padding: 7px;
            padding-left: 14px;
            margin-top: 5px;
            @media (max-width: 786px) {
                width: 100%;
            }
            h6 {
                font-size: 16px;
                color: inherit;
            }
            p {
                font-size: 14px;
                color: ${tertiaryGrey7};
                font-family: ${fontFamilyRegular};
            }
        }
        .img-container {
            width: 50px;
            height: 50px;
        }
        .time {
            color: ${lightGrey};
            padding-left: 6px;
        }
        .info-container {
            display: flex;
            text-transform: capitalize;
            gap: 10px;
            align-items: center;
            span {
                font-size: 12px;
            }

            span.reply {
                color: ${tertiaryGrey7};
            }
            span.edit {
                color: ${primaryColor};
            }
            span.delete {
                color: ${primaryRed};
            }
        }
    }

    .write-comment {
        display: flex;
        gap: 10px;
        input {
            outline: none;
            border: none;
            background: #f1f2f6;
            border-radius: 18px;
            &::placeholder {
                padding: 10px;
                font: 13px;
                letter-spacing: 0px;
                color: ${secondaryDark4};
            }
        }

        .add-comment-btn {
            background: ${primaryColor};
            border: none;
            outline: none;
            width: 44px;
            height: 44px;
            display: flex;
            border-radius: 50%;
            justify-content: center;
            padding: 10px;
            align-items: center;
            svg {
                transform: rotate(90deg);
                font-size: 25px;
            }
        }
    }

    .reply-comment {
        margin-top: 2%;
        margin-left: 10%;
    }
    .edit-comment {
        margin-top: 2%;
        margin-left: 10%;
    }
    .child-comment {
        margin-left: 50px;
    }

    .reply-container {
        display: flex;
        gap: 10px;
        .add-comment-btn {
            background: ${primaryColor};
            border-radius: 18px;
            border: none;
            outline: none;
            color: ${whiteColor};
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        figure {
            width: 36px;
            height: 36px;
        }
        input {
            width: 277px;
            outline: none;
            border: 1px solid ${tertiaryGrey19};
            border-radius: 35px;
            padding: 5px;
            height: 44px;
            padding-left: 10px;
            @media (max-width: 786px) {
                width: 100%;
            }
            &::placeholder {
                padding: 10px;
                font-size: 15px;
                letter-spacing: 0px;
                color: ${lightGrey};
            }
        }
    }
    .edit-container {
        display: flex;
        gap: 10px;
        .add-comment-btn {
            background: ${primaryColor};
            border-radius: 18px;
            border: none;
            outline: none;
            color: ${whiteColor};
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        figure {
            width: 36px;
            height: 36px;
        }
        input {
            width: 277px;
            outline: none;
            border: 1px solid ${tertiaryGrey19};
            border-radius: 35px;
            padding: 5px;
            height: 44px;
            padding-left: 10px;
            @media (max-width: 786px) {
                width: 100%;
            }
            &::placeholder {
                padding: 10px;
                font-size: 15px;
                letter-spacing: 0px;
                color: ${lightGrey};
            }
        }
    }
`

export default CommentsStyle
