import styled from 'styled-components'
import {
    AntiFlashWhite,
    BallBlue,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMin,
    pureDark2,
    whiteColor,
} from '../../../components/GlobalStyle'

export const MembershipCardViewStyled = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;

  .table-heading {
    font-size: 18px;
    font-weight: 500;
    font-family: ${fontFamilyMedium};
    color: ${pureDark2};
  }
  .custom_card_list{
    gap: 20px;
  }
  .custom_card {
    width: 333px;
    max-height: 340px;
    border: 0.6px solid #EAEAEA;
    border-radius: 5px;

    .ant-list-item {
      padding: 12px;
      display: flex;
      align-items: center;
      &-meta{
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
      width: 100%;
      position: relative;
      img {
        width: 100%;
        object-fit: contain;
        position: relative;

      }
      .custom_card_checkbox{
        position: absolute;
        top: 7px;
        left: 5px;
      }
    }


    &_body {
      padding: 0px 12px;
      margin-top: 14px;
      margin-bottom: 12px;
      .cardBody_title{
        & > h6{
          font-size: 16px;
          color: #000;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          font-family: ${fontFamilyMedium};
        }
        .cardBody_title > p{
          font-family: ${fontFamilyRegular};
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          font-size: 16px;
          color: #000;
        }
      }

      .card_body_inner{
        width: 95%;
        margin-right: 10px;
      }


      .cardBody_time {
        margin-top: 7px;
      }
      .cardBody_time  p{
        font-size: 14px;
        font-family: ${fontFamilyRegular};
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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
            svg{
              width: 12.64px;
              height: 12.64px;
            }
          }
        }
        .ant-rate-text span:first-child{
          color: #1C394B;
          font-family: ${fontFamilyMedium};
          font-size: 11.895px;
          font-style: normal;
          font-weight: 500;
          line-height: 13.977px;
        }
        .ant-rate-text span:nth-child(2){
          color: #1F3340;
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
  .ant-pagination{
    margin-top: 20px;
  }
  .ant-pagination li:first-child{
    @media screen and ${mediaDeviceMin.mobileBS} {
      position: absolute;
      left: 0;
  }
  }
  .ant-pagination .ant-pagination-options{
    display: none !important;
    opacity: 0;
    visibility: hidden;
    visibility: hidden;
    z-index: -1;
  }
  .ant-pagination-prev .ant-pagination-item-link span, .ant-pagination-next .ant-pagination-item-link span{
    position: relative;
  }
  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link  {
    border: none
  }
  .ant-pagination-prev .ant-pagination-item-link span:before{
    content: 'prev';
    font-family: ${fontFamilyMedium};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: block;
  }
  .ant-pagination-next .ant-pagination-item-link span:before{
    content: 'next';
    font-family: ${fontFamilyMedium};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: block;
  }
  .ant-pagination-prev  .ant-pagination-item-link span svg, .ant-pagination-next  .ant-pagination-item-link span svg{ 
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
  .ant-pagination-item-active a{
    border-radius: 8px;
    background: ${BallBlue};
    color: ${whiteColor};
    line-height: normal;
    padding: 7px 0px 8px 0px;
  }
  .ant-pagination-total-text{
    color: #333;
    font-family: ${fontFamilyMedium};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: inline-block;
    > span > span{
      width: 47px;
      padding: 7px 31px 8px 9px;
      border-radius: 8px;
      border: 1px solid #F1F1F1;
      display: inline-block;
      margin: 0px 5px;
    }
  }

`
