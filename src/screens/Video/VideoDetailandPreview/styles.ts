import styled from 'styled-components'
import {
    AlizarinCrimson,
    AntiFlashWhite,
    BallBlue,
    darkGery,
    fontFamilyMedium,
    fontFamilyRegular,
    mediaDeviceMax,
    mediaDeviceMin,
    pureDark2,
    whiteColor,
} from '../../../components/GlobalStyle'

export const VideoDetailsStyled = styled.div`
    .video-details-section {
        flex: 4;
        @media screen and (max-width: 1200px) {
            flex: 4;
        }
        @media screen and ${mediaDeviceMax.tabletL} {
            flex: 100%;
        }
        .video-container {
            width: 100%;
            height: 584px;
            border-radius: 50px;

            video {
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
        }
        .details {
            border: 1px solid #dedef9;
            padding: 20px 18px;
            border-radius: 10px;

            p {
                font-size: 13px;
                line-height: 25px;
                letter-spacing: 1px;
            }
        }
    }
    .videos-section {
        flex: 2;
        @media screen and ${mediaDeviceMax.tabletL} {
            height: 500px;
            overflow: auto;
            border: 1px solid #dedef9;
            border-radius: 6px;
            font-family: ${fontFamilyMedium};
            .video-card {
                border: 1px solid #dedef9;
                border-radius: 6px;
                .image {
                    width: 128px;
                    height: 105px;

                    img {
                        border-radius: 6px 0px 0px 6px;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
        .video-card {
            border: 1px solid #dedef9;
            border-radius: 6px;
            .image {
                width: 128px;
                height: 105px;

                img {
                    border-radius: 6px 0px 0px 6px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
`
export const VideoDescriptionStyled = styled.div`
    padding: 8px 10px;

    .heading {
        color: #0f0f0f;
        font-weight: 400;
        font-size: 14px;
        align-items: center;
        margin-bottom: 3px;
        font-family: ${fontFamilyMedium};
    }
    .views-and-likes {
        color: #606060;
        font-size: 12px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
`
