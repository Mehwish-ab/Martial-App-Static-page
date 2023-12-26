import styled from 'styled-components'
import {
    fontFamilyMedium,
    lightGrey,
    primaryColor,
    pureDark,
    whiteColor,
} from '../../components/GlobalStyle'

const CreditCardsStyle = styled.div`
    max-width: 600px;
    padding-top: 100px;
    margin: 0 auto;
    .credit-card {
        border: 1px solid ${primaryColor};
        padding: 10px;
        margin-top: 14px;
        border-radius: 7px;
    }
`

export default CreditCardsStyle

export const CreditCardStyle = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding-top: 100px;
    width: 90%;

    /* remove controls of number input */
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-oute r-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type='number'] {
        -moz-appearance: textfield;
    }

    .rccs__card--front {
        width: 90%;
    }
    .inner-container {
        background: ${whiteColor};
        padding: 12px;
        border: 0.5px solid #dbdbdb;
        border-radius: 7px;

        .expiry__date {
            label {
                font-family: ${fontFamilyMedium};
            }
            &__section {
                &__inputs {
                    border: 1px solid #d9d9d9;
                    padding: 3px;
                    border-radius: 5px;
                    margin-top: 9px;
                    .ant-input-number-input {
                        padding: 0px !important;
                    }
                    input {
                        width: 36px;
                    }
                }
                .ant-input-number {
                    border: unset;
                    outline: none;
                    box-shadow: none;
                    &:hover {
                        border-color: transparent;
                        border-right-width: 1px;
                        box-shadow: none;
                    }
                }
                .slash {
                    font-size: 18px;
                }
            }
        }
    }
    .is-invalid {
        margin-top: 7px;
        color: ${primaryColor};
        border-radius: 8px;
    }
`
export const ShippingDetailsStyle = styled.div`
    max-width: 800px;
    margin: 0 auto;
    .inner-container {
        padding: 12px;
        background: ${whiteColor};
        border: 0.5px solid ${lightGrey};
    }
`
