import styled from 'styled-components'
import {
    fontFamilyMedium,
    lightBlue2,
    lightBlue,
    lightGrey6,
    lightGrey7,
    primaryColor,
    secondaryDark3,
    tertiaryBlue,
    tertiaryGrewish,
    tertiaryGrey20,
    primaryRed,
    whiteColor,
    lightGrey12,
    fontFamilyBold,
    lightGrey2,
    mediaDeviceMax,
} from '../../components/GlobalStyle'

export type listHeightProps = {
    height: number
}

const UsersListStyle = styled.div<listHeightProps>`
    margin-top: 28px;

    .table-link {
        color: ${secondaryDark3} !important;
        font-family: ${fontFamilyMedium};
        font-size: 16px !important;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .ant-table-body::-webkit-scrollbar {
        display: none;
    }
    .ant-table {
        height: ${(props) => `calc(${props.height}px - 160px)`};
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .ant-table-body {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    .fullName-table-item {
        img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
    }
    .btn {
        display: flex;
        justify-content: flex-end;
        margin-top: -25px;
    }

    .ant-table-thead {
        background-color: ${lightGrey6};
        border-radius: 8px;
        .ant-table-cell {
            background: ${lightGrey12};
            color: ${secondaryDark3};
            font-family: ${fontFamilyMedium};
            padding: 8px 16px;
            font-size: 14px;
        }
    }
    .ant-table-tbody {
        .ant-table-cell {
            padding: 3px 16px;
            &::before {
                height: 0 !important;
            }
            a {
                text-decoration: none;
                color: ${lightGrey7};
                font-size: 14px;
                &:first-child {
                }
            }
        }
    }
    .ant-table-tbody > tr > td {
        border-bottom: none !important;
    }
    .action_icons {
        background: ${tertiaryGrey20};
        width: 23px;
        height: 22px;
        padding: 3px;
        border-radius: 2px;
        cursor: pointer;
    }
    .deleteicon {
        background: ${primaryRed} !important;
        cursor: pointer;
    }
    .editicon {
        background: ${tertiaryBlue} !important;
        cursor: pointer;
    }
`

export default UsersListStyle

export const TableCardStyle = styled.div`
    .plus-icon {
        right: 5%;
        bottom: 5%;
        position: fixed;
        z-index: 30;
    }
    display: flex;
    justify-content: space-between;
    p {
        margin: 0;
        font-size: 16px;
    }

    .inner-section {
        padding-bottom: 10px;
        .card:first-child {
            margin-top: 12px;
        }
        .card:not(:first-child) {
            margin-top: 20px;
        }
        .card {
            padding: 12px;

            .name-section {
                .name {
                    font-weight: 600;
                }
                .id {
                    color: ${lightBlue};
                }
            }

            .details {
                margin-top: 10px;
                font-size: 16px;
            }
            .details-1 {
                margin-top: 10px;
                font-size: 13px;
            }

            .price-section {
                margin-top: 14px;
            }

            .actions-section {
                margin-top: 16px;
                img {
                    background-color: ${tertiaryGrey20};
                    padding: 10px;
                    height: 35px;
                }
                img:not(:first-child) {
                    margin-left: 4px;
                }

                .warn-actions {
                    img:first-child {
                        background-color: ${primaryColor};
                    }
                    img:last-child {
                        background-color: ${lightBlue2};
                    }
                }
            }
        }
    }
`

type singleStoryProps = {
    height: string
}

// single story style
export const SingleStoryStyle = styled.div<singleStoryProps>`
    .story-card {
        border: 0.5px solid ${lightGrey2};
        border-radius: 4px;

        &:hover .overlay {
            /* opacity: 1; */
            cursor: pointer;
        }

        .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: 0.5s ease;
            background-color: rgba(0, 0, 0, 0.4);
            &-inner-container {
                color: white;
                font-size: 20px;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                text-align: center;
                .likes,
                .comments {
                    font-family: ${fontFamilyBold};
                    font-size: 16px;
                }
            }
        }

        .card-img-top,
        .status-text,
        .video-section {
            height: ${(props) => props.height};
            object-fit: cover;
            width: 100%;
            border-radius: 7px;
        }

        .status-text {
            background: ${primaryRed};
            padding: 4px;

            h6 {
                color: ${whiteColor};
                font-size: 14px;
                font-family: ${fontFamilyMedium};
                width: 98%;
                text-align: center;
            }
        }

        .card-body {
            padding-bottom: 4px;
            width: 100%;

            border-radius: 4px;
            .card-title {
                font-size: 14px;
                color: ${whiteColor};
                margin-bottom: 6px;
                font-family: ${fontFamilyMedium};
            }
        }
    }
`

// single post style
export const SinglePostStyle = styled.div`
    max-width: 800px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    /* .alice-carousel__dots-item __active {
    position: absolute !important;
    bottom: 12%;
    background: red;
  } */
    .alice-carousel__dots-item:not(.__custom):not(:last-child) {
        margin-right: 8px;
    }

    .alice-carousel__dots {
        position: absolute;
        bottom: 4%;
        width: 100%;
        z-index: 10;
    }
    .inner-section {
        background: ${whiteColor};
        border-radius: 10px;

        .post-owner-section {
            padding: 12px;
            .name {
                font-family: ${fontFamilyMedium};
                font-size: 16px;
            }
            .time {
                font-size: 14px;
            }
        }
        .card {
            box-shadow: 0px 0px 20px #00000012;
            border-radius: 3px;
            border: none;

            .property-description {
                border-bottom: 1px solid ${tertiaryGrewish};
                padding-bottom: 5px;
                .btn-primary {
                    color: ${primaryColor};
                    background-color: rgba(199, 17, 43, 0.12);
                    font-size: 14px;
                    border: none;
                    @media screen and (max-width: 480px) {
                        font-family: 'EnnVisionsMedium';
                    }
                    /* &:hover {
              color: ${whiteColor};
              background-color: ${primaryColor};
            } */
                }
                .price {
                    font-size: 18px;
                    font-family: 'EnnVisionsMedium';
                    color: ${primaryColor};
                }
            }
            .property-details {
                margin-top: 10px;
                border-bottom: 1px solid ${tertiaryGrewish};
                padding-bottom: 10px;

                .img {
                    vertical-align: super;
                }
                .text {
                    margin-top: 3px;
                    margin-left: 4px;
                    margin-bottom: 0;
                }
            }
        }
    }
`

// user stories

export const UserStoriesStyle = styled.div`
    margin-top: 20px;
    .stories {
        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(5, 1fr);
        @media ${mediaDeviceMax.tabletL} {
            grid-template-columns: repeat(4, 1fr);
        }
        @media ${mediaDeviceMax.tablet} {
            grid-template-columns: repeat(3, 1fr);
        }
        @media ${mediaDeviceMax.mobileBS} {
            grid-template-columns: repeat(2, 1fr);
        }
        @media ${mediaDeviceMax.mobileL} {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`
