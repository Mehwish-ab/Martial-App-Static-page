import React from "react";
import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListClassStyled } from "./style";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CustomDiv } from "./CustomDiv";
import {
  fontFamilyMedium,
  pureDark,
  tertiaryBlue2,
} from "../../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { ClassDataType } from "../../../redux/features/CLasses/ClassSlice";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";

const ListClass: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useSelector(
    (state: RootState) => state.branchData
  );
  const columns: ColumnsType<ClassDataType> = [
    {
      title: "Id",
      dataIndex: "ClassId",
      key: "ClassId",
    },
    {
      title: "Title",
      dataIndex: "ClassTitle",
      key: "ClassTitle",
    },
    {
      title: "Instructor",
      dataIndex: "ClassInstructor",
      key: "ClassInstructor",
    },
    {
      title: "Start Date",
      dataIndex: "ClassStartDate",
      key: "ClassStartDate",
    },
    {
      title: "End Date",
      dataIndex: "ClassEndDate",
      key: "ClassEndDate",
    },
    {
      title: "Fee",
      dataIndex: "ClassFee",
      key: "ClassFee",
    },

    {
      title: "Status",
      dataIndex: "ClassStatus",
      key: "ClassStatus",
      render: (DummyData) => {
        return (
          <div>
            <button>{DummyData}</button>
            <img src={StatusActiveError} alt="images" />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "ClassAction",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: "View",
            onClick: () => navigation(record, "view"),
          },
          {
            key: "2",
            label: "Update",
            onClick: () => navigation(record, "update"),
          },
          {
            key: "3",
            label: "Subscribe",
            onClick: () => navigation(record, "subscribe"),
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

  const navigation = (record: ClassDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "update":
        navigate(`/class/update/${record.ClassId}`, {
          state: {
            branchToEdit: record as ClassDataType,
          },
        });
        break;

      case "view":
        navigate(`/Class/view/${record.ClassId}`, {
          state: {
            branch: record as ClassDataType,
          },
        });
        break;

      case "subscribe":
        navigate(`/Class/subscribe/${record.ClassId}`, {
          state: {
            branch: record as ClassDataType,
          },
        });
    }
  };

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListClassStyled>
        <Table
          columns={columns}
          dataSource={
            DummyData.map((item) => ({ ...item, key: item.ClassId })) as any
          }
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
      </ListClassStyled>
    </>
  );
};

export default ListClass;

const RenderTableTitle = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="table-heading">Classes</h3>
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
              {" "}
              <span>Mon,</span> Sep 11, 2023 -{" "}
              <span>Thu,</span> Sep 21, 2023
            </p>
            <img
              src={DateCalander}
              alt="calander"
              width={21} height={21}
            />
          </div>
          <p className="dateToday">Today</p>
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
          // loading={loading}
          icon={<img src={plusIcon} alt="edit icon" width={17} height={17} />}
          clicked={() => {
            navigate(`/class/create`);
          }}
        />
      </CustomDiv>
    </div>
  );
};
