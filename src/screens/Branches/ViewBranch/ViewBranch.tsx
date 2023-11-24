import { Card, List } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewBranchStyled } from "./styles";
import { useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";

const ViewBranch = () => {
  const { getLabelByKey } = useScreenTranslation("branchCreate");

  const location = useLocation();
  const branch: BranchDataType = location.state?.branch;
  const { language, currency } = useSelector(
    (state: RootState) => state.appData.data.dropdowns
  );


  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  let defaultLanguage = language.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      +item.id == +branch.defaultLanguageId
  );

  let defaultCurrency = currency.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      +item.id == +branch.defaultCurrencyId
  );

  console.log(defaultLanguage, defaultCurrency);
  return (
    <ViewBranchStyled>
      <OverlayImages
        overlayImg={branch.profilePicture || ""}
        backgroundImg={branch.bannerPicture || ""}
        isEditable={false}
      />

      <h3>Branch Information</h3>

      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchName")}
              </div>
              <div className="list-item-value">{branch.branchName || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchType")}
              </div>
              <div className="list-item-value">{branch.branchType || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchPhoneNumber")}
              </div>
              <div className="list-item-value">
                {branch.phoneNumber || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("address")}</div>
              <div className="list-item-value">{branch.address || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("belts")}</div>
              <div className="list-item-value">
                {branch.belts ? "Yes" : "No"}
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
                {(defaultCurrency &&
                  (defaultCurrency as any)[selectedLanguage]) ||
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("activity")}</div>
              <div className="list-item-value">{branch.activities || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("facilities")}
              </div>
              <div className="list-item-value">{branch.facilities || "--"}</div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("description")}
              </div>
              <div className="list-item-value">
                {branch.description || "--"}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </ViewBranchStyled>
  );
};

export default ViewBranch;
