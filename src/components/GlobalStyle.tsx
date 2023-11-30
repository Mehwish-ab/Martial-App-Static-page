import styled from "styled-components";
import { media_base_url } from "../utils/api_urls";
import { backImageProps, ImgContainerProps } from "./GlobalTypes";

// font_families
export const fontFamilyRegular = "EnnVisions";
export const fontFamilyMedium = "EnnVisionsMedium";
export const fontFamilyBold = "EnnVisionsBold";

// media device sizes
export const deviceSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "480px",
  mobileBS: "576px",
  tabletS: "600px",
  tablet: "768px",
  tabletB: "868px",
  tabletL: "991px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
// media devices
export const mediaDeviceMin = {
  mobileS: `(min-width: ${deviceSize.mobileS})`,
  mobileM: `(min-width: ${deviceSize.mobileM})`,
  mobileL: `(min-width: ${deviceSize.mobileL})`,
  mobileXL: `(min-width: ${deviceSize.mobileXL})`,
  mobileBS: `(min-width: ${deviceSize.mobileBS})`,
  tabletS: `(min-width: ${deviceSize.tabletS})`,
  tablet: `(min-width: ${deviceSize.tablet})`,
  tabletB: `(min-width: ${deviceSize.tabletB})`,
  tabletL: `(min-width: ${deviceSize.tabletL})`,
  laptop: `(min-width: ${deviceSize.laptop})`,
  laptopL: `(min-width: ${deviceSize.laptopL})`,
  desktop: `(min-width: ${deviceSize.desktop})`,
  desktopL: `(min-width: ${deviceSize.desktop})`,
};
// media devices
export const mediaDeviceMax = {
  mobileS: `(max-width: ${deviceSize.mobileS})`,
  mobileM: `(max-width: ${deviceSize.mobileM})`,
  mobileL: `(max-width: ${deviceSize.mobileL})`,
  mobileXL: `(max-width: ${deviceSize.mobileXL})`,
  mobileBS: `(max-width: ${deviceSize.mobileBS})`,
  tabletS: `(max-width: ${deviceSize.tabletS})`,
  tabletB: `(max-width: ${deviceSize.tabletB})`,
  tablet: `(max-width: ${deviceSize.tablet})`,
  tabletL: `(max-width: ${deviceSize.tabletL})`,
  laptop: `(max-width: ${deviceSize.laptop})`,
  laptopL: `(max-width: ${deviceSize.laptopL})`,
  desktop: `(max-width: ${deviceSize.desktop})`,
  desktopL: `(max-width: ${deviceSize.desktop})`,
};
export const mainColor = "#3D86AF";
export const basicColor = "#C0922E";
export const primaryRed = "#C7112B";
export const primaryColor = "#00B0E9";
export const whiteColor = "#ffffff";
export const pureDark = "#000000";
export const pureDark2 = "#061229";
export const lightDark = "#4D4D4D";
export const lightDark2 = "#4F4F4F";
export const lightDark3 = "#333";
export const secondaryDark = "#221E30";
export const secondaryGrey = "#AAB2BA";
export const secondaryDark2 = "#1C1C1E";
export const secondaryDark3 = "#1B283F";
export const secondaryDark4 = "#4F5460";
export const secondaryDark5 = "#393939";
export const tertiaryDark = "#1A1B1E";
export const tertiaryDark2 = "#1A1A1A";
export const tertiaryDark3 = "#212121";
export const tertiaryDark4 = "#2F2F2F";
export const lightGrey = "#909090";
export const lightGrey2 = "#EFEFF4";
export const lightGrey3 = "#707070";
export const lightGrey4 = "#D1D1D6";
export const lightGrey5 = "#E9E9E9";
export const lightGrey6 = "#717272";
export const lightGrey7 = "#464E5F";
export const lightGrey8 = "#E9E9E9";
export const lightGrey9 = "#0D0E10";
export const lightGrey10 = "#e5e2e2";
export const lightGrey11 = "rgb(239, 239, 244)";
export const lightGrey12 = "#F3F6F9";
export const lightGrey13 = "#E5E5E5";
export const lightGrey14 = "#ECEAEA";
export const tertiaryBlue = "#E8F2F6";
export const tertiaryBlue1 = "#1088e9";
export const tertiaryBlue2 = "#A6D1EC";

export const secondaryGreen = "#32D74B";
export const greenishColor = "#34C759";

export const tertiaryGrey = "#808896";
export const tertiaryGrey2 = "#80808F";
export const tertiaryGrey3 = "#B5B5C3";
export const tertiaryGrey4 = "#AEAEB2";
export const tertiaryGrey5 = "#E5E5EA";
export const tertiaryGrey6 = "#D6D6E0";
export const tertiaryGrey7 = "#232837";
export const tertiaryGrey8 = "#FCFBFB";
export const tertiaryGrey9 = "#FCFBFB";
export const tertiaryGrey10 = "#FAFAFA";
export const tertiaryGrey11 = "#00B0E9";
export const tertiaryGrey12 = "#8E8E93";
export const tertiaryGrey13 = "#ECF0F3";
export const tertiaryGrey14 = "#717272";
export const tertiaryGrey15 = "#FCFBFBB3";
export const tertiaryGrey16 = "#F8F8F8";
export const tertiaryGrey17 = "#D1D1D6";
export const tertiaryGrey18 = "#F3F3F3";
export const tertiaryGrey19 = "#EBEBEB";
export const tertiaryGrey20 = "#606060";
export const tertiaryGrey21 = "#d9d9d9";
export const tertiaryGrey22 = "#F1F5F8";
export const tertiaryGrey23 = "#FBF9F9";
export const tertiaryGrey24 = "#E0E0E0";

export const lightColor1 = "#F5F5F5";
export const linearGradientBtns = 'linear-gradient(270.24deg, #C0E9F9 0.21%, #A2DDF3 97.73%)';


export const secondaryBlue = "#0A84FF";
export const darkBlue = "#006197";
export const lightBlue = "#04A4D8";
export const lightBlue2 = "#049CCE";
export const lightBlue3 = "#C1EAFA";
export const darkGery = "#333333";
export const tertiaryGrewish = "#C6C6C8";

export const maastrichtBlue = "#0F1E3C";
export const Diamond = "#C0E9F9";
export const Apple = "#4caf50";
export const ColumbiaBlue = "#DFC1C1";
export const GrayX11 = "#BDBDBD";
export const AlizarinCrimson = "#E51D35";
export const AntiFlashWhite = "#F1F1F1";
export const BallBlue = "#2EABD8";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  .ant-btn {
    background-color: ${(props: any) => props.bkColor};
    color: ${(props: any) => props.color};
    width: ${(props: any) => props.width};
    padding: ${(props: any) => props.padding};
    font-size: 16px;
    height: auto;
  }
`;

export const ErrorText = styled.p`
  font-family: ${fontFamilyMedium};
  color: ${primaryRed};
  text-align: right;
`;

export const PrimaryHeading2 = styled.h3`
  text-align: left;
  font-family: ${fontFamilyMedium};
  font-size: 20px;
  letter-spacing: 0.12px;
  text-transform: capitalize;
  color: ${pureDark};
`;
export const TertiaryHeading = styled.h3`
  font-size: 24px;
  font-family: ${fontFamilyMedium};
  line-height: 29px;
  letter-spacing: 0em;
  color: #1a1b1e;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 18px;
  }
`;
export const InputErrorMessage = styled.div`
  color: red;
  text-align: right;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: "EnnVisions"
`;

export const SecondaryHeading = styled.h5`
  color: ${pureDark};
  font-family: "EnnVisionsMedium";
  font-size: 40px;
  @media screen and (max-width: 991px) {
    font-size: 30px;
  }
  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
export const SecondaryHeadingMini = styled.h5`
  color: ${pureDark};
  font-family: "EnnVisionsMedium";
  font-size: 31px;
  @media screen and (max-width: 991px) {
    font-size: 26px;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
type TertiraryHeadingTypes = {
  color?: string;
};
export const TertiraryHeading = styled.h6<TertiraryHeadingTypes>`
  color: ${(props) => props.color || pureDark};
  font-size: 20px;
  font-family: "EnnVisionsMedium";
  margin-bottom: 0;
  @media screen and (max-width: 991px) {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
export const TertiraryHeading1 = styled.h6`
  color: ${lightDark};
  font-size: 20px;
  @media screen and (max-width: 991px) {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
export const TertiaryHeadingMini = styled.h6`
  color: ${secondaryDark5};
  font-size: 18px;
  font-family: "EnnVisionsMedium";

  @media screen and (max-width: 991px) {
    font-size: 17px;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
    font-family: "EnnVisionsMedium";
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    font-family: ${fontFamilyRegular};
  }
`;

export const TetraHeading = styled.div`
  font-size: 16px;
  color: ${tertiaryGrey7};
  font-family: "EnnVisionsMedium";
`;
export const MiniHeading = styled.p`
  font-size: 16px;
  color: ${pureDark};
  font-family: "EnnVisionsMedium";
  margin-bottom: 0;
`;

export const MiniHeadingSecondary = styled.p`
  font-size: 16px;
  color: ${pureDark};
  font-family: "EnnVisionsMedium";
  margin-bottom: 0;

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

export const UnderlineRed = styled.hr`
  border-radius: 4px;
  border-top: 4px solid ${primaryColor};
  width: 80px;
  display: inline-block;
  opacity: 1;
  margin-top: 0;
  margin-bottom: 0;
`;
export const UnderlineBlue = styled.hr`
  border-radius: 4px;
  border-top: 3px solid ${lightBlue};
  width: 76px;
  display: inline-block;
  opacity: 1;
  margin-top: 0;
  margin-bottom: 0;
`;
export const BlackDot = styled.hr`
  border-radius: 4px;
  border-top: 4px solid ${pureDark};
  width: 20px;
  margin-left: 6px;
  display: inline-block;
  opacity: 1;
  margin-top: 0;
  margin-bottom: 0;
`;

export const ImgContainer = styled.img<ImgContainerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
`;

type profileMiniImgProps = {
  borderRadius: string;
  width: string;
  height: string;
};

export const ProfileMiniImg = styled.img<profileMiniImgProps>`
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const BackgroundImage = styled.div<backImageProps>`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.36)),
    url(${(props) => `\" ${props.url} \"`});
  background-repeat: ${(props) => props.repeat};
  background-size: ${(props) => props.size};
  background-position: ${(props) => props.postion};
  transition: all 1s ease-in-out;
  height: ${(props) => props.height};
  cursor: pointer;
  width: ${(props) => props.width};
`;

export const BackgroundImageLight = styled.div<backImageProps>`
  background: url(${(props) => `\" ${props.url} \"`});
  background-repeat: ${(props) => props.repeat};
  background-size: ${(props) => props.size};
  background-position: ${(props) => props.postion};
  transition: all 1s ease-in-out;
  height: ${(props) => props.height};
  cursor: pointer;
`;

export const BaseImgContainer = styled.img<baseImgContainerTypes>`
  content: url(${(props) => media_base_url + props.img_url});
  width: ${(props) => media_base_url + props.width};
  height: ${(props) => media_base_url + props.height};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "5px")};
`;

export const BaseVideoContainer = styled.video<baseVideoContainerTypes>`
  content: url(${(props) => media_base_url + props.vide_url});
  width: ${(props) => media_base_url + props.width};
  height: ${(props) => media_base_url + props.height};
`;

// image container with base url
type baseImgContainerTypes = {
  img_url: string;
  width?: string;
  height?: string;
  borderRadius?: string;
};

// video container with base url
type baseVideoContainerTypes = {
  vide_url?: string;
  width?: string;
  height?: string;
};
export const UserInfoStyle = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid #bdc5e9;
  height: 62px;
  .heading {
    font-size: 14px;
    color: ${tertiaryGrey7};
    margin-bottom: 4px;
    font-family: "EnnVisions";
  }
  .title {
    font-size: 16px;
    font-family: "EnnVisionsMedium";
    color: ${secondaryDark2};
  }
`;

type profileImgeProps = {
  url: string;
  size?: string;
  repeat?: string;
  postion?: string;
  height?: string;
  width?: string;
  blendMode?: string | "unset";
  bgColor?: string | "unset";
  hoverBgColor?: string | "white";
  linearGradient?: string;
  border?: string;
  borderRadius?: string;
};
/* user profile image */
export const ProfileImage = styled.div<profileImgeProps>`
  border: ${(props) => (props.border ? props.border : "1px solid black")};
  background-image: url(${(props) => `\" ${media_base_url + props.url} \"`});
  background-repeat: ${(props) => (props.repeat ? props.repeat : "no-repeat")};
  background-size: ${(props) => (props.size ? props.size : "cover")};
  background-position: ${(props) => (props.postion ? props.postion : "center")};
  transition: all 1s ease-in-out;
  height: ${(props) => (props.height ? props.height : "100px")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "50%"};
  width: ${(props) => (props.width ? props.width : "100px")};
  cursor: pointer;
`;
