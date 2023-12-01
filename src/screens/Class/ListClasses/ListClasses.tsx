import React from "react";
import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListClassStyled } from "./style";
import CustomButton, {
  CustomDiv,
} from "../../../components/CustomButton/CustomButton";
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
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";

const ListClass: React.FC = () => {
  const { getLabelByKey } = useScreenTranslation("listClass");
  const navigate = useNavigate();
  const { loginData } = useSelector((state: RootState) => state);

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
            <img src={StatusActiveError} alt="image" />
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
            label: "Edit",
            onClick: () => navigation(record, "edit"),
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
      case "edit":
        navigate(`/Class/edit/${record.ClassId}`, {
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

  console.log("DummyData", DummyData);

  return (
    <>
      {loginData && <LoadingOverlay message="" />}
      <ListClassStyled>
        <Table
          columns={columns}
          dataSource={
            DummyData.map((item) => ({ ...item, key: item.ClassId })) as any
          }
          title={() => <RenderTableTitle />}
        />
      </ListClassStyled>
    </>
  );
};

export default ListClass;

const RenderTableTitle = () => {
  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("listClass");

  return (
    <div className="d-flex justify-content-between">
      <h3 className="table-heading">Class</h3>
      <CustomDiv>
        <div className="instructorDateSection">
          <div className="mainarrow">
            <div className="arrowright d-flex align-items-center">
              <img src={LeftArrow} alt="Date" />
            </div>
            <div className="arrowleft  d-flex align-items-center">
              <img src={RightArrow} alt="Date" />
            </div>
          </div>
          <div className="dateRange">
            <p>
              {" "}
              <span className="fw-bold ">Mon,</span> Sep 11, 2023 -{" "}
              <span className="fw-bold ">Thu,</span> Sep 21, 2023
            </p>
            <img
              src={DateCalander}
              alt=""
              style={{ width: "21px", height: "21px" }}
            />
          </div>
          <p className="dateToday">Today</p>
        </div>
        <CustomButton
          bgcolor={tertiaryBlue2}
          textTransform="Captilize"
          color={pureDark}
          padding="6px 10px"
          fontFamily={`${fontFamilyMedium}`}
          width="40px"
          type="submit"
          title=""
          fontSize="17px"
          loading={false}
          icon={<img src={plusIcon} alt="edit icon" width={23} height={23} />}
          clicked={() => {
            navigate(`/Class/create`);
          }}
        />
      </CustomDiv>
    </div>
  );
};
