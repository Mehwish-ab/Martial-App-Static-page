import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import {
  BranchDataType,
  getBranchBySchoolId,
} from "../../../redux/features/branch/branchSlice";

import { Dropdown, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CustomButton from "../../../components/CustomButton/CustomButton";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";

import { ListBranchStyled } from "./styles";
import { CustomDiv } from "./CustomDiv";
import {
  fontFamilyMedium,
  pureDark,
  tertiaryBlue2,
} from "../../../components/GlobalStyle";

import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { ipForImages } from "../../Home/OverlayImages/OverlayImages";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg"
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";
import FilterListTimeDate from "../../../components/FilterListTimeDate/FilterListTimeDate";



const ListBranch: React.FC = () => {
  // const { getLabelByKey } = useScreenTranslation("BranchList");
  const navigate = useNavigate();
  const { branchData, loading } = useSelector(
    (state: RootState) => state.branchData
  );

  const { activities } = useSelector(
    (state: RootState) => state.appData.data.statusData
  );

  const { businessTypes } = useSelector(
    (state: RootState) => state.appData.data.dropdowns
  );

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  const columns: ColumnsType<BranchDataType> = [
    {
      title: "Id",
      dataIndex: "branchId",
      key: "branchId",
    },
    {
      title: "Image",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (DummyData) => {
        return <img src={DummyData} width={44} height={44} alt="dummy images data" />;
      }
    },
    {
      title: "Name",
      dataIndex: "branchName",
      key: "branchName",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "branchType",
      key: "branchType",
    },
    {
      title: "Activity",
      dataIndex: "activities",
      key: "activities",
      render: (DummyData) => {

        return <p className="sub-title">
          {DummyData?.length > 33
            ? `${DummyData.slice(0, 38)}...`
            : DummyData}
        </p>;
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "Staus",
      render: (DummyData) => {
        return (
          <div>
            <button>{DummyData}</button>
            <img src={StatusActiveError} alt="image" />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
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
        break;
      case "payment":
        navigate(`/branch/add-payment-information/${record.branchId}`, {
          state: {
            branchToEdit: record as BranchDataType,
          },
        });
        break;

      case "delete":
        navigate(`/branch/delete/${record.branchId}`, {
          state: {
            branch: record as BranchDataType,
          },
        });
    }
  };

  useEffect(() => {
    store.dispatch(getBranchBySchoolId());
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [current, setCurrent] = useState(1);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = { selectedRowKeys, onChange: onSelectChange };





  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListBranchStyled>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          title={() => <RenderTableTitle />}
          scroll={{ x: true }}
          pagination={{
            showTotal: (total, range) => (
              <span
                dangerouslySetInnerHTML={{
                  __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                }}
              />
            ),
          }}
        />
      </ListBranchStyled>
    </>
  );
};

export default ListBranch;

const RenderTableTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-center">
      {/* <h3 className="table-heading">{getLabelByKey("title")}</h3> */}
      <h3 className="table-heading">Branches</h3>

      <CustomDiv>
        <FilterListTimeDate />
        <CustomButton
          bgcolor={tertiaryBlue2}
          textTransform="Captilize"
          color={pureDark}
          padding="6.5px 0px"
          fontFamily={`${fontFamilyMedium}`}
          width="40px"
          type="submit"
          title=""
          fontSize="17px"
          icon={<img src={plusIcon} alt="edit icon" width={17} height={17} />}
          clicked={() => {
            navigate(`/branch/create`);
          }}
        />
      </CustomDiv>

    </div>
  );
};
