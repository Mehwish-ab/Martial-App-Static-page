import { Card } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewSchoolStyled } from "./styles";
import { useNavigate } from "react-router-dom";
// import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
// import { DataTypeWithIdAndCurrentLangLabel } from "../../Home/constants";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import { useEffect } from "react";
import { getSchoolByUserId } from "../../../redux/features/dashboard/dashboardDataSlice";
import CustomButton from "../../../components/CustomButton/CustomButton";
import useSchool from "../../../hooks/useCreateSchool";

import {
  lightBlue3,
  pureDark,
  fontFamilyMedium,
} from "../../../components/GlobalStyle";

const ViewSchool = () => {
  const { getLabelByKey } = useScreenTranslation("schoolCreate");
  const { deleteSchool, deletemodal, loading } = useSchool();

  const navigate = useNavigate();
  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const { language, currency } = useSelector(
    (state: RootState) => state.appData.data.dropdowns
  );
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  let defaultLanguage = language.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      +item.id == +schoolData.defaultLanguageId
  );
  let defaultCurrency = currency.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      +item.id == +schoolData.defaultCurrencyId
  );
  const handleUpdateClick = () => {
    navigate(`/school/edit/:${schoolData.schoolId}`);
  };

  const handleDeleteClick = async () => {
    console.log("handleDeleteClick");
    //setIsConfirmationVisible(true);

    if (schoolData.schoolId > 0) await deleteSchool(schoolData.schoolId);
    else navigate("/school/create");
  };
  useEffect(() => {
    store.dispatch(getSchoolByUserId());
  }, []);
  console.log("SchoolData:", schoolData);

  console.log(
    "belt value",
    schoolData.rank,
    "business Name",
    schoolData.businessName
  );

  return (
    <ViewSchoolStyled>
      {deletemodal().modalComponent}

      <OverlayImages
        backgroundImg={schoolData.bannerPicture || ""}
        overlayImg={schoolData.profilePicture || ""}
        isEditable={false}
      />
      <h3>School Information</h3>

      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("businessName")}
              </div>
              <div className="list-item-value">
                {schoolData.businessName || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("businessType")}
              </div>
              <div className="list-item-value">
                {schoolData.businessType || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("businessPhoneNumber")}
              </div>
              <div className="list-item-value">
                {schoolData.phoneNumber || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("address")}</div>
              <div className="list-item-value">
                {schoolData.address || "--"}
              </div>
            </div>
          </Col>

          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("belts")}</div>
              <div className="list-item-value">
                {schoolData.rank
                  ? "Yes"
                  : schoolData.rank === false
                  ? "No"
                  : "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("defaultLanguage")}
              </div>

              <div className="list-item-value">
                {(defaultLanguage &&
                  (defaultLanguage as any)[selectedLanguage]) ||
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("defaultCurrency")}
              </div>
              <div className="list-item-value">
                {(defaultLanguage &&
                  (defaultCurrency as any)[selectedLanguage]) ||
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("activity")}</div>
              <div className="list-item-value">
                {schoolData.activities || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("facilities")}
              </div>
              <div className="list-item-value">
                {schoolData.facilities || "--"}
              </div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("description")}
              </div>
              <div className="list-item-value">
                {schoolData.description || "--"}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <div className="mt-20 d-flex justify-content-end my-4">
        <div style={{ marginRight: "10px" }}>
          <CustomButton
            bgcolor={lightBlue3}
            textTransform="Capitalize"
            color={pureDark}
            padding="15px 102px"
            fontFamily={`${fontFamilyMedium}`}
            width="fit-content"
            type="submit"
            title="Delete"
            fontSize="18px"
            loading={loading}
            clicked={handleDeleteClick}
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <CustomButton
            bgcolor={lightBlue3}
            textTransform="Capitalize"
            color={pureDark}
            padding="15px 102px"
            fontFamily={`${fontFamilyMedium}`}
            width="fit-content"
            type="submit"
            title="Update"
            fontSize="18px"
            clicked={handleUpdateClick}
          />
        </div>
      </div>
    </ViewSchoolStyled>
  );
};

export default ViewSchool;
