import { Card, List } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewSchoolStyled } from "./styles";
import { useLocation, useParams } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import { DataTypeWithIdAndCurrentLangLabel } from "../../Home/constants";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import { useEffect } from "react";
import { getSchoolByUserId } from "../../../redux/features/dashboard/dashboardDataSlice";

const ViewSchool = () => {
  const { getLabelByKey } = useScreenTranslation("schoolCreate");
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

  useEffect(() => {
    store.dispatch(getSchoolByUserId());
  }, []);

  // console.log(schoolData, defaultLanguage, defaultCurrency);
  // console.log("schoolID", schoolData )

  return (
    <ViewSchoolStyled>
      <OverlayImages
        overlayImg={schoolData.profilePicture || ""}
        backgroundImg={schoolData.bannerPicture || ""}
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
                {schoolData.belts ? "Yes" : "No"}
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
    </ViewSchoolStyled>
  );
};

export default ViewSchool;
