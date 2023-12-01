import React, { useEffect, useState } from "react";

import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListFranchiseStyled } from "./styles";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  pureDark,
  tertiaryBlue2,
} from "../../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import {
  BranchDataType,
  getBranchBySchoolId,
} from "../../../redux/features/branch/branchSlice";

import CardView from "../CardView/CardView";
import { FranchiseDataType } from "../../../redux/features/franchise/franchiseSlice";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg"
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";
import { CustomDiv } from "./CustomDiv";


const ListFranchise: React.FC = () => {
  const navigate = useNavigate();
  const { branchData, loading, error } = useSelector(
    (state: RootState) => state.branchData
  );

  const {
    statusData: { activities },
    dropdowns: { businessTypes }
  } = useSelector((state: RootState) => state.appData.data);


  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  const columns: ColumnsType<FranchiseDataType> = [
    {
      title: "Id",
      dataIndex: "franchiseId",
      key: "franchiseId",
    },
    {
      title: "Image",
      dataIndex: "profilePicture",
      key: "profilePicture",
      // render: (text) => (
      //   <div style={{ width: 50, height: 50 }}>
      //     <img
      //       src={ipForImages + text}
      //       alt="branch img"
      //       style={{ objectFit: "contain", width: "100%" }}
      //     />
      //   </div>
      // ),
      render: (DummyData) => {

        return <img src={DummyData} width={44} height={44} alt="dummy images data" />;
      }
    },
    {
      title: "Name",
      dataIndex: "franchiseName",
      key: "franchiseName",
    },
    {
      title: "Type",
      dataIndex: "franchiseType",
      key: "franchiseType",
      // render: (_, { franchiseType }) => {
      //   let item = businessTypes.find((b) => b.id === franchiseType);
      //   return <p>{item?.en}</p>;
      // },
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
            label: "Subscribe",
            onClick: () => navigation(record, "subscribe"),
          },
          {
            key: "5",
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
            branch: record as FranchiseDataType,
          },
        });
        break;

      case "payment":
        navigate(`/franchise/add-payment-information/${record.franchiseId}`, {
          state: {
            branch: record as FranchiseDataType,
          },
        });
        break;

      case "subscribe":
        navigate(`/franchise/subscribe/${record.franchiseId}`, {
          state: {
            branch: record as FranchiseDataType,
          },
        });
        break;

      case "delete":
        navigate(`/franchise/delete/${record.franchiseId}`, {
          state: {
            branch: record as FranchiseDataType,
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
      <ListFranchiseStyled>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          title={() => <RenderTableTitle />}
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
      </ListFranchiseStyled>

      {/* <CardView /> */}
    </>
  );
};

export default ListFranchise;

const RenderTableTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-center">
      {/* <h3 className="table-heading">{getLabelByKey("title")}</h3> */}
      <h3 className="table-heading">Franchise</h3>
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
            <p><span>Mon,</span> Sep 11, 2023 - <span>Thu,</span> Sep 21, 2023</p>
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
            navigate(`/franchise/create`);
          }}
        />
      </CustomDiv>

    </div>
  );
};