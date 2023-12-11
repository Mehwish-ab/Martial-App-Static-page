import { Card, Dropdown, List, Space, Table } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewFranchiseStyled } from "./styles";
import { AddPaymentMethod } from "./styles";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { useSelector } from "react-redux";

import DummyData from "../AddPaymentFranchise/dummyData.json";
import { useNavigate, useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";

import { RootState } from "../../../redux/store";
import type { ColumnsType } from "antd/es/table";
import StatusActiveError from "../../../assets/images/activeBtnError.svg"
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";


const ViewFranchise = () => {
  const navigate = useNavigate();
  const { branchData, loading } = useSelector(
    (state: RootState) => state.branchData
  );

  const { getLabelByKey } = useScreenTranslation("franchiseCreate");
  const navigation = (record: BranchDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/branch/edit/${record.branchId}`, {
          state: {
            branchToEdit: record as BranchDataType,
          },
        });
        break;

      case "view":
        navigate(`/branch/view/${record.branchId}`, {
          state: {
            branch: record as BranchDataType,
          },
        });
    }
  };
  const columns: ColumnsType<BranchDataType> = [
    {
      title: "Payment Information",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Account Nmae",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      render: (DummyData) => {
        return (
          <div className={DummyData}>
            <button>{DummyData}</button>
            <img src={StatusActiveError} alt="image" />
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "Staus",
      render: (DummyData) => {
        return (
          <div className={DummyData}>
            <button>{DummyData}</button>
            <img src={StatusActiveError} alt="image" />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (value: any, record: BranchDataType, index: number): any => {
        const items = [
          {
            key: "1",
            label: "View",
            onClick: () => navigation(record, "view"),
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => navigation(record, "edit"),
          },
          {
            key: "3",
            label: "Payment",
            onClick: () => navigation(record, "payment"),
          },
          {
            key: "4",
            label: "Delete",
            onClick: () => navigation(record, "delete"),
          },
        ];
        return (
          <Space size="middle">
            <Dropdown menu={{ items }}>
              <img
                src={actionMenuTogglerIcon}
                alt="action menu"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </Space>

        );
      }
    }
  ]
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
          <Col md="8">
            <Row>
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
            </Row>
          </Col>
          <Col md="6">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("activity")}</div>
              <div className="list-item-value">{branch.activities || "--"}</div>
            </div>
          </Col>
          <Col md="6">
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
      <AddPaymentMethod>

        {loading && <LoadingOverlay message="" />}
        <h3 className="table-heading">Payment Information</h3>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          scroll={{ x: true }}
        />
      </AddPaymentMethod>
    </ViewFranchiseStyled>

  );
};

export default ViewFranchise;


