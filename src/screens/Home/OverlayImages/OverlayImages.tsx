import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, message, Upload } from "antd";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { OverlayImagesStyled } from "./styles";
import { authorizationToken, base_url } from "../../../utils/api_urls";

import editIcon from "../../../assets/icons/ic_edit.svg";
import profile from "../../../assets/images/create_school_user_profile.svg";
import banner from "../../../assets/images/create_school_banner.svg";
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

  // const jwtDetails =
  const jwtDetails = useSelector(
    (state: RootState) => state.loginData.data?.jwtDetails
  );
  // const fileExtRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  const [profileImg, setProfileImg] = useState(overlayImg);
  const [bannerImg, setBannerImg] = useState(backgroundImg);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfileImg(overlayImg);
    setBannerImg(backgroundImg);
  }, [overlayImg, backgroundImg]);

  let useCaseOfBanner = branchId
    ? "BRANCH_BANNER_IMAGE"
    : schoolId
    ? "SCHOOL_BANNER_IMAGE"
    : "";

  let useCaseOfProfile = branchId
    ? "BRANCH_PROFILE_IMAGE"
    : schoolId
    ? "SCHOOL_PROFILE_PICTURE"
    : "";
  const BannerImgUploadProps = {
    name: "bannerImg",
    customRequest: async (info: any) => {
      setLoading(true);
      try {
        const formData = new FormData();

        formData.append("multiPart", info.file);

        formData.append(
          "data",
          new Blob(
            [
              JSON.stringify({
                id: schoolId || branchId || "",
                useCase: useCaseOfBanner,
              }),
            ],
            { type: "application/json" }
          )
        );

        const { data } = await axios.post(base_url + "uploadImage", formData, {
          headers: {
            LoggingToken: "4d0a9ee9-68d4-4977",
            lang: "en",
            ...authorizationToken(jwtDetails?.token || ""),
          },
        });

        if (data && data.responseCode === 200) {
          setBannerImg(data.results.url);
          setLoading(false);
          message.success(`${data.responseMessage}`);
        } else {
          setBannerImg("");
          setLoading(false);
          message.error(`${info.file.name} file upload failed.`);
        }
      } catch (error) {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: false,
    accept: ".jpeg, .jpg, .webp, .png, tiff,.bmp",
  };

  const ProfileImgUploadProps = {
    name: "profileImg",
    customRequest: async (info: any) => {
      setLoading(true);

      try {
        const formData = new FormData();

        formData.append("multiPart", info.file);

        formData.append(
          "data",
          new Blob(
            [
              JSON.stringify({
                id: schoolId || branchId || "",
                useCase: useCaseOfProfile,
              }),
            ],
            { type: "application/json" }
          )
        );

        const { data } = await axios.post(base_url + "uploadImage", formData, {
          headers: {
            LoggingToken: "4d0a9ee9-68d4-4977",
            lang: "en",
            ...authorizationToken(jwtDetails?.token || ""),
          },
        });

        if (data && data.responseCode === 200) {
          setProfileImg(data.results.url);
          setLoading(false);
          message.success(`${data.responseMessage}`);
        } else {
          setProfileImg("");
          setLoading(false);
          message.error(`${info.file.name} file upload failed.`);
        }
      } catch (error) {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: false,
    accept: ".jpeg, .jpg, .webp, .png, tiff,.bmp",
  };

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <OverlayImagesStyled>
        <div className="bg-white image_section">
          <div className="bannerImg">
            <img src={bannerImg ? ipForImages + bannerImg : banner} alt="" />
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
                src={profileImg ? ipForImages + profileImg : profile}
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
