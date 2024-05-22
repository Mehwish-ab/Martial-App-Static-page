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
    tertiaryGrey8,
    whiteColor,
} from '../../../components/GlobalStyle'
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
      display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${tertiaryGrey8};
    margin: 0 auto;
    margin-bottom: 16px;
   
     .table-heading {
        font-size: 18px;
        font-weight: 500;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
    // margin-left:185px;
          
    }
    .main-container {
        &-card {
            // max-width: 900px;
            display: flex;
            flex-direction: column;
            // align-items: center;
            background-color: white;
            border-radius: 6px;
            width: 100%;
            margin: auto;
            padding: 20px 12px;
            background-color: ${whiteColor};
            .image{
                 width:100%;
            }
            .title{
                 color: #0f0f0f;
                 margin-top:5px;
                 font-family: ${fontFamilyMedium};
        font-size: 16px;
        align-items: left;

            }
            .description{
  color: #0f0f0f;
        font-family: ${fontFamilyRegular};
        font-weight: 500;
        font-size: 12px;
   
            }
            .time{
                 color: #0f0f0f;
        font-family: ${fontFamilyRegular};
        font-weight: 500;
        font-size: 14px;
      padding: 7px 4px 0px 4px;
            }
            .buton{
                margin-top:25px;
                margin-left:5px;
            }
            .divider {
    border: 1px solid rgba(237, 237, 237, 1);
    }
        }}
        .contact{
            padding:5px;
                 font-family: ${fontFamilyRegular};

        }


  
   
    @media screen and  max-width: 425px {
      height: 600px;
      overflow: auto;
      border: 1px solid #dedef9;
      border-radius: 6px;
    }
    }
`
