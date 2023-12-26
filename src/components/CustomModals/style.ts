import styled from 'styled-components'
import {
    secondaryDark3,
    fontFamilyMedium,
    tertiaryGrey12,
    lightGrey2,
    fontFamilyRegular,
    mediaDeviceMax,
} from '../GlobalStyle'

// warning modal
export const WarningModalStyle = styled.div`
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;

    @media ${mediaDeviceMax.mobileXL} {
        width: auto;
    }

    .inner-container {
        width: 100%;
        background: #ffffff;
        box-shadow: 0px 0px 16px #00000017;
        border-radius: 7px;
        padding: 18px;
        img {
            margin-bottom: 12px;
            width: 188px;
            height: 55px;
        }
        .title {
            font-family: ${fontFamilyMedium};
            font-size: 19px;
            margin-top: 12px;
        }
        .description {
            margin-top: 14px;
            font-size: 16px;
            margin: 0 auto;
            color: ${secondaryDark3};
            font-family: ${fontFamilyRegular};
        }
        .border-top {
            border: 1px solid ${lightGrey2};
            height: 6px;
        }
    }
`

// confirmed modal
export const EnnvisionModalStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;

  @media ${mediaDeviceMax.mobileXL} {
    width: auto;
  }

  .inner-container {
    background: #ffffff;
    width: 100%;
    box-shadow: 0px 0px 16px #00000017;
    border-radius: 7px;
    padding: 18px 18px 0px 18px;
    img {
      height: 60px;
      margin-bottom: 12px;
      width: 190px;
    }
    .title {
      font-family: ${fontFamilyMedium};
      font-size: 19px;
      margin-top: 12px;
    }
    .close-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      border-radius: 10px;
    }
  }
    .description {
      margin-top: 14px;
      font-size: 16px;
      margin: 0 auto;
      color: ${secondaryDark3};
      padding-bottom: 10px;
      font-family: ${fontFamilyRegular};

      border-bottom: 1px solid ${tertiaryGrey12};
    }
  }
`
