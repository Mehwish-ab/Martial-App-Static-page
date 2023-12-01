import { Card, Dropdown, List, Space, Table } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { InformationBranchStyled } from "./styles";
import { useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Col, Row } from "react-bootstrap";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg"
import { ListBranchStyled } from "../ListBranch/styles";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { fontFamilyMedium, pureDark, tertiaryBlue2 } from "../../../components/GlobalStyle";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

const BranchInformation: React.FC = () =>  {
  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("branchCreate");

  const location = useLocation();
  const branch: BranchDataType = location.state?.branch;
//   const { language, currency } = useSelector(
//     (state: RootState) => state.appData.data.dropdowns
//   );

const { branchData, loading } = useSelector(
    (state: RootState) => state.branchData
  );

//   const { selectedLanguage } = useSelector(
//     (state: RootState) => state.selectedLanguage
//   );
//   let defaultLanguage = language.find(
//     (item: DataTypesWithIdAndMultipleLangLabel) =>
//       +item.id == +branch.defaultLanguageId
//   );

//   let defaultCurrency = currency.find(
//     (item: DataTypesWithIdAndMultipleLangLabel) =>
//       +item.id == +branch.defaultCurrencyId
//   );

//   console.log(defaultLanguage, defaultCurrency);

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
      render: (value, record: BranchDataType,index) :any => {
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



  return (
    <InformationBranchStyled>
      <OverlayImages
        overlayImg={branch?.profilePicture || ""}
        backgroundImg={branch?.bannerPicture || ""}
        isEditable={true}
      />
      {/* <OverlayImages backgroundImg={""} overlayImg={""} isEditable={false} /> */}


      <h3>Branch Information</h3>
      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
              Branc hName
              </div>
              <div className="list-item-value">
                {/* {branch.branchName || "--"} */}
                branchName
            </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                Type
              </div>
              <div className="list-item-value">
                {/* {branch.branchType || "--"} */}
                branchType
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                Phone Number
              </div>
              <div className="list-item-value">
                {/* {branch.phoneNumber || "--"} */}
                phoneNumber
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">Address</div>
              <div className="list-item-value">
                {/* {branch.address || "--"} */}
                address
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">Belts</div>
              <div className="list-item-value">
                {/* {branch.belts ? "Yes" : "No"} */}
                belts
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
              Default Language
              </div>
              <div className="list-item-value">
                {/* {(defaultLanguage &&
                  (defaultLanguage as any)[selectedLanguage]) ||
                  "--"} */}
                  selectedLanguage
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
              Default Currency
              </div>
              <div className="list-item-value">
                {/* {(defaultCurrency &&
                  (defaultCurrency as any)[selectedLanguage]) ||
                  "--"} */}
                  defaultCurrency
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">Activity</div>
              <div className="list-item-value">
                {/* {branch.activities || "--"} */}
                activities
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
              Facilities
              </div>
              <div className="list-item-value">
                {/* {branch.facilities || "--"} */}
                facilities
                </div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item">
              <div className="list-item-title">
                Description
              </div>
              <div className="list-item-value">
                {/* {branch.description || "--"} */}
                description
              </div>
            </div>
          </Col>
        </Row>
      </Card>



                  
      {loading && <LoadingOverlay message="" />}
      <h3 className="table-heading">Branch Information</h3>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          scroll={{ x: true }}
          
        />




    </InformationBranchStyled>
  );
};

export default BranchInformation;

// const RenderTableTitle = () => {
//     const navigate = useNavigate();
  
//     return (
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="table-heading">Branch Information</h3>
//         {/* <CustomButton
//           bgcolor={tertiaryBlue2}
//           textTransform="Captilize"
//           color={pureDark}
//           padding="8px 10px"
//           fontFamily={`${fontFamilyMedium}`}
//           width="fit-content"
//           type="submit"
//           title=""
//           fontSize="17px"
//           icon={<img src={plusIcon} alt="edit icon" />}
//           clicked={() => {
//             navigate(`/branch/create`);
//           }}
//         /> */}
//       </div>
//     );
//   };