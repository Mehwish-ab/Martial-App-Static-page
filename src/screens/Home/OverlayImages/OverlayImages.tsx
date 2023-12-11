import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { loginDataTypes } from "../../../redux/features/types";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { OverlayImagesStyled } from "./styles";
import { authorizationToken, base_url } from "../../../utils/api_urls";

import editIcon from "../../../assets/icons/ic_cameraIcon.svg";

import profile from "../../../assets/images/create_school_user_profile.svg";
import banner from "../../../assets/images/create_school_banner.svg";

import DefaultProfileImage from "../../../assets/images/defaultProfileImage.svg";
import DefaultBannerImage from "../../../assets/images/defaultBannerImage.svg";
interface OverlayImagesProps {
  backgroundImg: any;
  overlayImg: any;
  isEditable: boolean;
}
export const ipForImages = "https://www.ennvisionapistore.com:8443";

const OverlayImages = ({
  backgroundImg,
  overlayImg,
  isEditable,
}: OverlayImagesProps) => {
  const { schoolId } = useParams();
  const { branchId } = useParams();

  const jwtDetails = useSelector(
    (state: RootState) => state.loginData.data?.jwtDetails
  );
  const [profileImg, setProfileImg] = useState(overlayImg);
  const [bannerImg, setBannerImg] = useState(backgroundImg);
  const [loading, setLoading] = useState(false);
  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const { loginData } = useSelector((state: RootState) => state);

  useEffect(() => {
    setProfileImg(overlayImg);
    setBannerImg(backgroundImg);
  }, [overlayImg, backgroundImg]);

  let useCaseOfBanner = branchId
    ? "BRANCH_BANNER_IMAGE"
    : schoolData.schoolId
    ? "SCHOOL_BANNER_IMAGE"
    : "";

  let useCaseOfProfile = branchId
    ? "BRANCH_PROFILE_IMAGE"
    : schoolData.schoolId
    ? "SCHOOL_PROFILE_PICTURE"
    : "";
  const uploadImage = async (info: any, useCase: string) => {
    try {
      setLoading(true);
      const userDetails = loginData.data?.userDetails;

      const formData = new FormData();
      formData.append("multiPart", info.file);

      const requestData = {
        id: schoolData.schoolId || schoolData.userId || "",
        useCase: useCase,
        // Add any additional parameters needed
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const { data } = await axios.post(base_url + "uploadImage", formData, {
        headers: {
          ...authorizationToken(loginData.data as loginDataTypes),
        },
      });

      if (data && data.responseCode === 200) {
        if (
          useCase === "BRANCH_BANNER_IMAGE" ||
          useCase === "SCHOOL_BANNER_IMAGE"
        ) {
          setBannerImg(data.results.url);
        } else if (
          useCase === "BRANCH_PROFILE_IMAGE" ||
          useCase === "SCHOOL_PROFILE_PICTURE"
        ) {
          setProfileImg(data.results.url);
        }
        message.success(`${data.responseMessage}`);
      } else {
        message.error(`${info.file.name} file upload failed.`);
      }
    } catch (error) {
      console.error(`Error uploading ${useCase} image:`, error);
      message.error(`${info.file.name} file upload failed.`);
    } finally {
      setLoading(false);
    }
  };

  const BannerImgUploadProps = {
    name: "bannerImg",
    customRequest: (info: any) => uploadImage(info, useCaseOfBanner),
    showUploadList: false,
    accept: ".jpeg, .jpg, .webp, .png, tiff,.bmp",
  };

  const ProfileImgUploadProps = {
    name: "profileImg",
    customRequest: (info: any) => uploadImage(info, useCaseOfProfile),
    showUploadList: false,
    accept: ".jpeg, .jpg, .webp, .png, tiff,.bmp",
  };

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <OverlayImagesStyled>
        <div className="bg-white image_section">
          <div className="bannerImg">
            <img src={bannerImg ? ipForImages + bannerImg : DefaultBannerImage} alt="" />
            {isEditable && (
              <div className="changeBannerImgButton">
                <Upload {...BannerImgUploadProps}>
                  <Button
                    icon={<img src={editIcon} alt="" width={"unset"} />}
                  ></Button>
                </Upload>
              </div>
            )}
          </div>
          <div className="profileImg">
            <div className="img">
              <img
                src={profileImg ? ipForImages + profileImg : DefaultProfileImage}
                alt=""
              />
              {isEditable && (
                <div className="changeProfileImgButton">
                  <Upload {...ProfileImgUploadProps}>
                    <Button
                      icon={<img src={editIcon} alt="" width={"unset"} />}
                    ></Button>
                  </Upload>
                </div>
              )}
            </div>
          </div>
        </div>
      </OverlayImagesStyled>
    </>
  );
};

export default OverlayImages;
