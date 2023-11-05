import { Card, List } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewBranchStyled } from "./styles";
import { useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";

const ViewBranch = () => {
  const { getLabelByKey } = useScreenTranslation("branchCreate");

  const location = useLocation();
  const branch: BranchDataType = location.state?.branch;
  console.log(
    "branch.activities",
    branch.activities,
    branch.activities.split(",").map(String)
  );
  return (
    <ViewBranchStyled>
      <OverlayImages overlayImg={""} backgroundImg={""} isEditable={false} />

      <h3>Branch Information</h3>

      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchName")}
              </div>
              <div className="list-item-value">{branch.branchName}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchType")}
              </div>
              <div className="list-item-value">{branch.branchType}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchPhoneNumber")}
              </div>
              <div className="list-item-value">{branch.phoneNumber}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("address")}</div>
              <div className="list-item-value">{branch.address}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("ranks")}</div>
              <div className="list-item-value">{branch.ranks}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("defaultLanguage")}
              </div>
              <div className="list-item-value">{branch.languageId}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("defaultCurrency")}
              </div>
              <div className="list-item-value">{branch.currencyId}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchType")}
              </div>
              <div className="list-item-value">{branch.activities}</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchType")}
              </div>
              <div className="list-item-value">{branch.facilities}</div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("branchType")}
              </div>
              <div className="list-item-value">{branch.description}</div>
            </div>
          </Col>
        </Row>
      </Card>
    </ViewBranchStyled>
  );
};

export default ViewBranch;
