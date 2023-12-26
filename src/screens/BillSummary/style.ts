import styled from 'styled-components'
import {
    fontFamilyMedium,
    lightColor1,
    pureDark,
    tertiaryGrey6,
    tertiaryGrey7,
    tertiaryGrey8,
    whiteColor,
} from '../../components/GlobalStyle'

const PropertyCheckoutStyle = styled.div`
    padding: 60px 0;
    background-color: ${tertiaryGrey8};
    height: calc(100vh - 86px);

    .bill-info-side {
        background: ${whiteColor};
        border: 1px solid ${lightColor1};
        border-radius: 6px;
        .head-bar {
            background: ${lightColor1};
            padding: 8px;
        }

        .head-bar-title {
            font-size: 16px;
            color: ${pureDark};
            font-family: ${fontFamilyMedium};
            padding: 0 14px;
        }

        .features {
            padding: 0 16px;
            .feature {
                padding-bottom: 8px;
                border-bottom: 1px solid ${tertiaryGrey6};
                margin-top: 12px;
                &-title {
                    color: ${tertiaryGrey7};
                    font-size: 14px;
                }
                &-price {
                    font-size: 14px;
                    color: ${pureDark};
                    font-family: ${fontFamilyMedium};
                    margin-bottom: 0;
                }
            }
        }
    }
    .credit-card-side {
        background: ${whiteColor};
        border: 1px solid ${lightColor1};
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        .head-bar {
            padding: 10px;

            &-title {
                font-size: 16px;
                color: ${pureDark};
                font-family: ${fontFamilyMedium};
                padding: 0 14px;
            }
        }
        .payments {
            padding: 16px;
            display: flex;
            flex-direction: column;
            height: 400px;

            @media screen and (max-width: 480px) {
                height: auto;
            }
            .cards-section {
                flex: 1;
                overflow-y: auto;
                &-type {
                    border-bottom: 1px solid ${tertiaryGrey6};
                    margin-top: 16px;

                    &-title {
                        font-size: 16px;
                        font-weight: 700;
                    }
                    &-subtitle {
                        font-size: 14px;
                    }
                }
            }
        }
    }
`

export default PropertyCheckoutStyle
