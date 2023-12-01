import { Card, List } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewFranchiseStyled } from "./styles";
import { useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";

const ViewFranchise = () => {
  const { getLabelByKey } = useScreenTranslation("franchiseCreate");

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
    <ViewFranchiseStyled>
      <OverlayImages
        overlayImg={branch.profilePicture || ""}
        backgroundImg={branch.bannerPicture || ""}
        isEditable={true}
      />

      <h3>Affiliated Schoool  Information</h3>
      <Card>
        <Row>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Name
              </div>
              <div className="list-item-value">
                {"IMAS - Innovative Martial Arts Systems"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Address
              </div>
              <div className="list-item-value">
                {"Hutton, United Kingdom"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Type
              </div>
              <div className="list-item-value">
                {"School"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
        </Row>
      </Card>
      <h3>Franchise Information</h3>
      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("franchiseName")}
              </div>
              <div className="list-item-value">{branch.branchName || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("franchiseType")}
              </div>
              <div className="list-item-value">{branch.branchType || "--"}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("franchisePhoneNumber")}
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
              <div className="list-item-title">{getLabelByKey("ranking")}</div>
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


      <h3>Franchise Plans Subscribed</h3>
      <Card>
        <Row>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Plan Name
              </div>
              <div className="list-item-value">
                {"IMAS - Innovative Martial Arts Systems"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Price
              </div>
              <div className="list-item-value">
                {"Hutton, United Kingdom"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Payment Schedule
              </div>
              <div className="list-item-value">
                {"Monday, 17th October 2023"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Payment Type
              </div>
              <div className="list-item-value">
                {"Auto Renew"
                  // branch.branchName 
                  || "--"}</div>
            </div>
          </Col>
        </Row>
      </Card>
    </ViewFranchiseStyled>
  );
};

export default ViewFranchise;


