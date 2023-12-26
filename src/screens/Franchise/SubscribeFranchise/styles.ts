import styled from 'styled-components'
import {
    darkBlue,
    fontFamilyBold,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    pureDark2,
    tertiaryGrey24,
} from '../../../components/GlobalStyle'
import img from '../../../assets/icons/list-style-check.png'
export const SubscribeFranchiseStyled = styled.div`
    background: #fff;
    padding: 13px 15px 20px 21px;
    border-radius: 10px;
    height: 80vh;
    h3 {
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
    }

    .subscriptions {
        display: flex;
        gap: 10px;

        .plan {
            &-button {
                display: none;
            }

            &:hover {
                cursor: pointer;
                background: #98cde1;
            }
            &:hover .plan-button {
                display: block;
            }
            &:hover {
                margin-top: 20px;
                height: 564px;
                border-radius: 10px;
            }
            margin-top: 74px;
            width: 410px;
            height: 510px;
            border: 1px solid ${tertiaryGrey24};
            border-radius: 10px;
            padding: 16px;
            transition: all 0.3s ease;
            &-heading {
                font-size: 18px;
                font-weight: 400;
                font-family: ${fontFamilyRegular};
                color: ${pureDark2};
                margin-bottom: 22px;
            }

            &-price {
                font-size: 23px;
                font-weight: 500;
                font-family: ${fontFamilyMedium};
                color: ${darkBlue};
                margin-bottom: 22px;
                span {
                    font-size: 14px;
                    font-weight: 500;
                    font-family: ${fontFamilyMedium};
                    color: ${darkBlue};
                }
            }

            &-description {
                margin-bottom: 20px;

                &-heading {
                    font-size: 18px;
                    font-weight: 500;
                    font-family: ${fontFamilyMedium};
                    color: ${pureDark2};
                    margin-bottom: 10px;
                }

                &-para {
                    font-size: 14px;
                    font-weight: 400;
                    font-family: ${fontFamilyRegular};
                    color: ${lightDark2};
                    line-height: 21px;
                    word-spacing: 2px;
                }
            }

            &-features {
                margin-bottom: 20px;

                &-heading {
                    font-size: 18px;
                    font-weight: 500;
                    font-family: ${fontFamilyMedium};
                    color: ${pureDark2};
                    margin-bottom: 8px;
                }

                &-list {
                    list-style-image: url('${img}');
                    padding-left: 1rem;

                    &-item {
                        font-size: 16px;
                        font-family: ${fontFamilyRegular};
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        color: ${lightDark2};
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    .pay-btn {
        position: fixed;
        right: 4%;
    }
`
