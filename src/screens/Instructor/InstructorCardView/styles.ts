import styled from 'styled-components'
import {
    fontFamilyBold,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    pureDark2,
} from '../../../components/GlobalStyle'

export const InstructorCardViewStyled = styled.div`
    .mainContainer {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
    }

    .table-heading {
        font-size: 18px;
        font-weight: 500;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
    }
    .custom_card_list {
        gap: 20px;
    }
    .custom_card {
        width: 340px;
        height: 307px;
        border: 0.6px solid #eaeaea;
        border-radius: 5px;

        .ant-list-item {
            padding: 12px;
            display: flex;
            align-items: center;
            &-meta {
                align-items: center;
            }
            &-meta-title {
                font-family: ${fontFamilyMedium};
                margin-bottom: 0;
                font-size: 14px;
                font-weight: 500;
                color: ${pureDark2};
            }
            &-meta-description {
                font-family: ${fontFamilyRegular};
                font-size: 12px;
                font-weigt: 400;
                color: ${lightDark2};
            }
        }

        &_placeholder_img {
            width: 100%;
            img {
                width: 100%;
                object-fit: contain;
            }
        }

        &_body {
            padding: 0px 12px;
            .cardBody_title {
                margin-top: 14px;
                & > h6 {
                    font-size: 16px;
                    color: #000;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    font-family: ${fontFamilyMedium};
                }
                .cardBody_title > p {
                    font-family: ${fontFamilyRegular};
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    font-size: 16px;
                    color: #000;
                }
            }

            .cardBody_time {
                margin-top: 7px;
            }
            .cardBody_time p {
                font-size: 14px;
                font-family: ${fontFamilyRegular};
                color: #000;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }

            .cardBody_para {
                margin-top: 7px;
            }

            .cardBody_para > p {
                font-family: ${fontFamilyRegular};
                font-size: 10px;
                line-height: 14px;
                color: ${lightDark2};
                font-style: normal;
                font-weight: 400;
            }
        }
    }
`
