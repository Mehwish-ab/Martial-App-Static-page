import { Card, Dropdown, List, Space, Table } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { AddPaymentMethod } from "./styles";
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
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { fontFamilyMedium, pureDark, tertiaryBlue2 } from "../../../components/GlobalStyle";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

const AddPaymentFranchise: React.FC = () => {
  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("schoolCreate");

  const location = useLocation();
  const branch: BranchDataType = location.state?.branch;
  //   const { language, currency } = useSelector(
  //     (state: RootState) => state.appData.data.dropdowns
  //   );

  const { branchData, loading } = useSelector(
    (state: RootState) => state.branchData
  );


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
      title: "Account Name",
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
      },
    },
  ];



  return (
    <AddPaymentMethod>

      {loading && <LoadingOverlay message="" />}
      <h3 className="table-heading">Payment Information</h3>
      <Table
        columns={columns}
        dataSource={DummyData as any}
        scroll={{ x: true }}
      />
    </AddPaymentMethod>
  );
};

export default AddPaymentFranchise;