import styled from 'styled-components'
import { whiteColor } from '../../../components/GlobalStyle'

export const OverlayImagesStyled = styled.div`
    .image_section {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .bannerImg {
        height: 300px;
        position: relative;
        border-radius: 10px;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid white;
        }
        .ant-btn-icon-only {
            border-radius: 6px;
            border: 0.5px solid #c1dfdf;
            background: ${whiteColor};
            width: 38px;
            height: 37px;
            padding: 0px 0px;
            line-height: normal;
            img {
                position: relative;
                top: -1px;
            }
        }
        .changeBannerImgButton {
            position: absolute;
            top: 8px;
            right: 7px;
        }
    }

    .profileImg {
        position: relative;
    }

    .profileImg {
        > .img {
            position: absolute;
            bottom: 21px;
            left: 21px;
            width: 170px;
            height: 170px;
            display: block;
            z-index: 0;
            // border: 1px solid #fafafa;
            // border-radius: 15px;

            > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 15px;
            }
            .ant-btn-icon-only {
                border-radius: 6px;
                border: 0.5px solid #c1dfdf;
                background: ${whiteColor};
                width: 31px;
                height: 30px;
                padding: 0px 0px;
                line-height: normal;
                img {
                    position: relative;
                    top: -1px;
                }
            }
            .changeProfileImgButton {
                position: absolute;
                bottom: 8px;
                right: 9px;
            }
        }
    }
`
