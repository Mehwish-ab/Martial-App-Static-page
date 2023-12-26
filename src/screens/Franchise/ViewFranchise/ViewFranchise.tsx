import { Card, Dropdown, List, Space, Table } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewFranchiseStyled } from "./styles";
import { AddPaymentMethod } from "./styles";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { useSelector } from "react-redux";

import DummyData from "../AddPaymentFranchise/dummyData.json";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import useFranchise from "../hooks/useFranchise";
import { RootState } from "../../../redux/store";
import type { ColumnsType } from "antd/es/table";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { FranchiseDataType } from "../../../redux/features/franchise/franchiseSlice";
import { useEffect, useState } from "react";
import AddPaymentFranchise from "../AddPaymentFranchise/AddPaymentFranchise";
const ViewFranchise = () => {
  const navigate = useNavigate();
  const { schoolData, loading } = useSelector(
    (state: RootState) => state.dashboardData
  );
  const { franchiseId } = useParams();

  const { getFranchisebyid } = useFranchise();
  const [franchisedata, setFranchise] = useState<FranchiseDataType | undefined>(
    undefined
  );
  console.log(franchiseId, "ids");

  useEffect(() => {
    fetchstripe();
    async function fetchstripe() {
      const data = await getFranchisebyid(franchiseId);
      setFranchise(data);
    }
  }, []);
  console.log("School data", schoolData);
  const location = useLocation();
  const { getLabelByKey } = useScreenTranslation("franchiseCreate");
  const navigation = (record: FranchiseDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/franchise/edit/${record.franchiseId}`, {
          state: {
            franchiseToEdit: record as FranchiseDataType,
          },
        });
        break;

      case "view":
        navigate(`/franchise/view/${record.franchiseId}`, {
          state: {
            franchise: record as FranchiseDataType,
          },
        });
    }
  };
  const columns: ColumnsType<FranchiseDataType> = [
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
      render: (value: any, record: FranchiseDataType, index: number): any => {
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
      },
    },
  ];

  const Franchise: FranchiseDataType = location.state?.branch;

  const { language, currency } = useSelector(
    (state: RootState) => state.appData.data.dropdowns
  );
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  let defaultLanguage = language.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      +item.id == +Franchise?.defaultCurrencyId
  );

  let defaultCurrency = currency.find(
    (item: DataTypesWithIdAndMultipleLangLabel) =>
      console.log(+item.id == +Franchise?.defaultCurrencyId)
  );
  return (
    <ViewFranchiseStyled>
      {/* <OverlayImages
        overlayImg={franchise.profilePicture || ""}
        backgroundImg={franchise.profilePicture || ""}
        isEditable={true}
      /> */}

      <h3>Affiliated Schoool Information</h3>
      <Card>
        <Row>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Name
              </div>
              <div className="list-item-value">
                {schoolData.businessName || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Address
              </div>
              <div className="list-item-value">
                {schoolData.address || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                School Type
              </div>
              <div className="list-item-value">
                {schoolData.businessType || "--"}
              </div>
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
              <div className="list-item-value">
                {franchisedata?.franchiseName}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("franchiseType")}
              </div>
              <div className="list-item-value">
                {franchisedata?.franchiseType || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("franchisePhoneNumber")}
              </div>
              <div className="list-item-value">
                {franchisedata?.phoneNumber || "--"}
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("address")}</div>
              <div className="list-item-value">
                {franchisedata?.address || "--"}
              </div>
            </div>
          </Col>
          <Col md="8">
            <Row>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">
                    {getLabelByKey("ranking")}
                  </div>
                  <div className="list-item-value">
                    {franchisedata?.rank ? "Yes" : "No"}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">
                    {getLabelByKey("defaultLanguage")}
                  </div>
                  <div className="list-item-value">
                    {franchisedata?.defaultLanguageId}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">
                    {getLabelByKey("defaultCurrency")}
                  </div>
                  <div className="list-item-value">
                    {/* {(defaultCurrency &&
                      (defaultCurrency as any)[selectedLanguage]) ||
                      "--"} */}
                    {franchisedata?.defaultCurrencyId}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="list-item">
              <div className="list-item-title">{getLabelByKey("activity")}</div>
              <div className="list-item-value">
                {franchisedata?.activities || "--"}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("facilities")}
              </div>
              <div className="list-item-value">
                {franchisedata?.facilities || "--"}
              </div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item">
              <div className="list-item-title">
                {getLabelByKey("description")}
              </div>
              <div className="list-item-value">
                {franchisedata?.description || "--"}
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
                {"IMAS - Innovative Martial Arts Systems" ||
                  // branch.branchName
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Price
              </div>
              <div className="list-item-value">
                {"Hutton, United Kingdom" ||
                  // branch.branchName
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Payment Schedule
              </div>
              <div className="list-item-value">
                {"Monday, 17th October 2023" ||
                  // branch.branchName
                  "--"}
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="list-item mb-0">
              <div className="list-item-title">
                {/* {getLabelByKey("franchiseName")} */}
                Payment Type
              </div>
              <div className="list-item-value">
                {"Auto Renew" ||
                  // branch.branchName
                  "--"}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <AddPaymentFranchise />
      {/* <AddPaymentMethod>
        {loading && <LoadingOverlay message="" />}
        <h3 className="table-heading">Payment Information</h3>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          scroll={{ x: true }}
        />
      </AddPaymentMethod> */}
    </ViewFranchiseStyled>
  );
};

export default ViewFranchise;
