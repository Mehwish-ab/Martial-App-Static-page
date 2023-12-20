import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import {
  BranchDataType,
  getBranchById,
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
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";
import defaltimg from "../../../assets/images/create_school_user_profile.svg";
import useBranch from "../hooks/useBranch";
const ListBranch: React.FC = () => {
  // const { getLabelByKey } = useScreenTranslation("BranchList");
  const navigate = useNavigate();
  const { deletebranch, deletemodal } = useBranch();
  const [branch, setbranch] = useState();
  const { branchData, loading } = useSelector(
    (state: RootState) => state.branchData
  );
  const {
    statusData: { activities },
    dropdowns: { businessTypes }
  } = useSelector((state: RootState) => state.appData.data);
  const location = useLocation();

  const handleDelete = (record: any) => {
    deletebranch(record);
    store.dispatch(getBranchBySchoolId());
  };
  console.log("Branch Data:", branchData);

  const columns: ColumnsType<BranchDataType> = [
    {
      title: "Id",
      dataIndex: "branchId",
      key: "branchId",
    },
    {
      title: "Image",
      //dataIndex: "profilePicture",
      //key: "profilePicture",
      render: () => {
        return <img src={defaltimg} width={44} height={44} />;
      },
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
      render: (_, { branchType }) => {
        
        let item = businessTypes.find((b) => b.id === branchType);
        return <p>{item?.en}</p>;
      },
    },
    {
      title: "Activity",
      dataIndex: "activities",
      key: "activities",
      render: (DummyData) => {
        return (
          <p className="sub-title">
            {DummyData?.length > 33
              ? `${DummyData.slice(0, 38)}...`
              : DummyData}
          </p>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "Status",
      render: (d) => {
        return (
          <div>
            <button>
              {/* {branchData.data.map((d) => {
                if (d.status === "active") {
                  return "Active";
                } else {
                  console.log(d.status);

                  return "Deactive";
                }
              })} */}
              {"Active"}
            </button>
            <img src={StatusActiveError} alt="image" />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log(record,"bibi")
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
            onClick: () =>
            //navigation(record, "delete"),
            {
              handleDelete(record.branchId);
            },
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = { selectedRowKeys, onChange: onSelectChange };

  return (
    <>
      {deletemodal().modalComponent}

      {loading && <LoadingOverlay message="" />}
      <ListBranchStyled>
        <Table
          columns={columns}
          dataSource={branchData.data.map((data) => {
            return data;
          })}
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
    <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
      {/* <h3 className="table-heading">{getLabelByKey("title")}</h3> */}
      <h3 className="table-heading">Branches</h3>
      <CustomDiv>
        <div className="instructorDateSection">
          <div className="mainarrow">
            <div className="arrowright">
              <img src={LeftArrow} alt="Date" width={18} height={12} />
            </div>
            <div className="arrowleft">
              <img src={RightArrow} alt="Date" width={18} height={12} />
            </div>
          </div>
          <div className="dateRange">
            <p>
              <span>Mon,</span> Sep 11, 2023 - <span>Thu,</span> Sep 21, 2023
            </p>
            <img src={DateCalander} alt="Calander" width={21} height={21} />
          </div>
          <div className="dateToday">Today</div>
        </div>
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
          icon={<img src={plusIcon} alt="edit icon" width={23} height={23} />}
          clicked={() => {
            navigate(`/branch/create`);
          }}
        />
      </CustomDiv>
    </div>
  );
};
