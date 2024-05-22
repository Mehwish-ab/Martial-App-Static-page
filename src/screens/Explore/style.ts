import styled from 'styled-components'
import {
    AntiFlashWhite,
    BallBlue,
    fontFamilyBold,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMax,
    mediaDeviceMin,
    pureDark2,
    whiteColor,
} from '../../components/GlobalStyle'
export const MapStyle = styled.div`
    margin-left: 20px;
    @media screen and (max-width: 600px) {
        .map-container {
            /* Add your styles for smaller screens here */
            width: 100%;
        }
    }
`

export const CardViewStyled = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px solid;
    margin: 10px 20px 0px 20px;
     .table-heading {
        font-size: 18px;
        font-weight: 500;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
    }
  

    .custom_card {
        width: 280px;
        // height: 340px;
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
            border-radius: 6.672px 6.672px 0px 0px;
            // width: 100%;
            position: relative;
            img {
                // width: 341.929px;
                width: 341px; /* Set the width */
                height: 150px; /* Set the height */
                object-fit: cover;
                object-fit: cover;
                // position: relative;
            }
            .custom_card_checkbox {
                position: absolute;
                top: 7px;
                left: 5px;
            }
        }

        &_para {
            font-size: 11.89px;
            font-family: ${fontFamilyRegular};
            color: ${lightDark2};
            font-weight: 400;
            padding: 22px 25px;
            line-height: 14px;
        }

        &_footer {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: flex-end;
            padding: 0 25px;
            &_rating {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                flex-wrap: wrap;
                .ant-rate {
                    font-size: 16px;
                    line-height: normal;
                    &-star {
                        margin-right: 2px;
                        svg {
                            width: 12.64px;
                            height: 12.64px;
                        }
                    }
                }
                .ant-rate-text span:first-child {
                    color: #1c394b;
                    font-family: ${fontFamilyMedium};
                    font-size: 11.895px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 13.977px;
                }
                .ant-rate-text span:nth-child(2) {
                    color: #1f3340;
                    font-family: ${fontFamilyRegular};
                    font-size: 11.895px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 13.977px;
                }
            }

            &_link {
                font-family: ${fontFamilyMedium};
                color: #b3b3b3;
                font-size: 11.895px;
                font-style: normal;
                font-weight: 500;
                line-height: 13.977px;
            }
        }
    }

    // pagination
    .ant-pagination {
        margin-top: 20px;
    }
    .ant-pagination li:first-child {
        @media screen and ${mediaDeviceMin.mobileBS} {
            position: absolute;
            left: 10px;
        }
    }
    .ant-pagination .ant-pagination-options {
        display: none !important;
        opacity: 0;
        visibility: hidden;
        visibility: hidden;
        z-index: -1;
    }
    .ant-pagination-prev .ant-pagination-item-link span,
    .ant-pagination-next .ant-pagination-item-link span {
        position: relative;
    }
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
        border: none;
    }
    .ant-pagination-prev .ant-pagination-item-link span:before {
        content: 'prev';
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
    }
    .ant-pagination-next .ant-pagination-item-link span:before {
        content: 'next';
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
    }
    .ant-pagination-prev .ant-pagination-item-link span svg,
    .ant-pagination-next .ant-pagination-item-link span svg {
        display: none;
    }
    .ant-pagination-item {
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px;
        border: 1px solid ${AntiFlashWhite};
    }
    .ant-pagination-item a {
        border-radius: 8px;
        background: ${whiteColor};
        line-height: normal;
        padding: 7px 0px 8px 0px;
    }
    .ant-pagination-item-active a {
        border-radius: 8px;
        background: ${BallBlue};
        color: ${whiteColor};
        line-height: normal;
        padding: 7px 0px 8px 0px;
    }
    .ant-pagination-total-text {
        color: #333;
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: inline-block;
        > span > span {
            width: 47px;
            padding: 7px 31px 8px 9px;
            border-radius: 8px;
            border: 1px solid #f1f1f1;
            display: inline-block;
            margin: 0px 5px;
        }
         .videos-section {
    flex: 2;
   
    @media screen and  max-width: 425px {
      height: 600px;
      overflow: auto;
      border: 1px solid #dedef9;
      border-radius: 6px;
    }
    }
`
export const VideoCardStyled = styled.div`
    padding: 8px 10px;
    margin-right: 5px;
    border: 1px solid rgba(220, 220, 220, 1);
    border-radius: 5px;
    .heading {
        font-family: ${fontFamilyRegular};
        color: rgba(153, 153, 153, 1);
        font-weight: 500;
        font-size: 14px;
        align-items: center;
    }
    .separator {
        height: 100%;
        width: 1px;
        background-color: #999;
    }
    .heading1 {
        font-family: ${fontFamilyRegular};
        margin-top: 5px;
        color: #0f0f0f;
        font-weight: 500;
        font-size: 14px;
        align-items: center;
    }

    .title {
        color: #0f0f0f;
        font-family: ${fontFamilyBold};
        font-size: 14px;
        align-items: center;
    }
    .description {
        color: #0f0f0f;
        font-family: ${fontFamilyRegular};
        font-weight: 500;
        font-size: 12px;
        align-items: center;
    }
`
