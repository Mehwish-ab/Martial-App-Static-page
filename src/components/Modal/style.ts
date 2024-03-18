import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    mediaDeviceMax,
    pureDark2,
    whiteColor,
} from '../GlobalStyle'

const CustomModalStyle = styled.div`
background-color: #fff;
padding: 14px;
border-radius: 10px;
position: relative;

  .close-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      border-radius: 10px;
    }
  }
`

export default CustomModalStyle

export const LoadingOverlayStyle = styled.div`
    .message {
        color: ${whiteColor};
        font-family: ${fontFamilyMedium};
        text-align: center;
        font-size: 22px;
        margin-bottom: 0;
    }
`

export const CustomMessageModalStyle = styled.div`
    background-color: #fff;
    padding: 14px;
    border-radius: 10px;
    position: relative;
    .close-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          cursor: pointer;
          border-radius: 10px;
        }
      }
    .mainContainer {
        img {
            height: 79px;
            width: 79px;

            @media screen and ${mediaDeviceMax.mobileBS} {
                height: 50px;
                width: 50px;
            }
        }
        &-heading {
            margin: 15px 0 0 0;
            color: ${pureDark2};
            font-family: ${fontFamilyMedium};
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            @media screen and ${mediaDeviceMax.mobileBS} {
                font-size: 18px;
            }
        }
        &-subText {
            margin: 7px 0 0 0;
            color: ${pureDark2};
            font-family: ${fontFamilyRegular};
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
`
