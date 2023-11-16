import React, { useEffect, useState } from "react";

import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListInstructorStyled } from "./styles";
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

import { InstructorDataType } from "../../../redux/features/instructor/instructorSlice";
import CardView from "../../Franchise/CardView/CardView";
import { ListBranchStyled } from "../../Franchise/ListFranchise/styles";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import DummyData from "./dummyData.json";

const ListInstructor: React.FC = () => {
  const { getLabelByKey } = useScreenTranslation("instructorList");

  const navigate = useNavigate();
  const { branchData, loading, error } = useSelector(
    (state: RootState) => state.branchData
  );




  const { businessTypes, activities } = useSelector(
    (state: RootState) => state.appData.data.statusData
  );

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );


  const columns: ColumnsType<InstructorDataType> = [
    {
      title: getLabelByKey("Id"),
      dataIndex: "instructorId",
      key: "instructorId",
    },
    {
      title: getLabelByKey("Image"),
      dataIndex: "instructorImage",
      key: "instructorImage",
      render: (DummyData) => {

        return <img src={DummyData} />;
      }
    },
    {
      title: getLabelByKey("name"),
      dataIndex: "instructorName",
      key: "instructorName",
    },
    {
      title: getLabelByKey("specializations"),
      dataIndex: "instructorSpecilization",
      key: "instructorSpecilization",
    },
    {
      title: getLabelByKey("ranking"),
      dataIndex: "instructorRanking",
      key: "instructorRanking",
    },
    {
      title: getLabelByKey("experience"),
      dataIndex: "instructorExperience",
      key: "instructorExperience",
    },
    {
      title: getLabelByKey("phoneNumber"),
      dataIndex: "instructorPhoneNumber",
      key: "instructorPhoneNumber",
    },
    {
      title: getLabelByKey("status"),
      dataIndex: "instructorStatus",
      key: "instructorStatus",
    },
    {
      title: getLabelByKey("actions"),
      key: "instructoraction",
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


  // const columns: ColumnsType<BranchDataType> = [
  //   {
  //     title: getLabelByKey("Id"),
  //     dataIndex: "branchId",
  //     key: "branchId",
  //   },
  //   {
  //     title: getLabelByKey("Image") ,
  //     dataIndex: "Image",
  //     key: "Image",
  //   },
  //   {
  //     title: getLabelByKey("name") ,
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: getLabelByKey("Type"),
  //     dataIndex: "branchType",
  //     key: "branchType",
  //     render: (_, { branchType }) => {
  //       let item = businessTypes.find((b) => b.id === branchType);
  //       return <p>{item?.en}</p>;
  //     },
  //   },

  //   {
  //     title:getLabelByKey("Activity"),
  //     dataIndex: "activity",
  //     key: "activity",
  //     render: (_, { activities: commaSeparatedIds }) => {
  //       const filteredObjects = activities.filter((obj) => {
  //         const objId = obj.id;
  //         return commaSeparatedIds.split(",").includes(objId.toString());
  //       });
  //       let names = filteredObjects
  //         .map((obj) => (obj as any)[selectedLanguage])
  //         .join(", ");
  //       const maxLength = 20;

  //       if (names.length > maxLength) {
  //         names = names.slice(0, maxLength - 3) + "...";
  //       }
  //       return <p>{names}</p>;
  //     },
  //   },
  //   {
  //     title: getLabelByKey("Phone Number"),
  //     dataIndex: "phoneNumber",
  //     key: "phoneNumber",
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => {
  //       const items = [
  //         {
  //           key: "1",
  //           label: "View",
  //           onClick: () => navigation(record, "view"),
  //         },
  //         {
  //           key: "2",
  //           label: "Edit",
  //           onClick: () => navigation(record, "edit"),
  //         },
  //         {
  //           key: "3",
  //           label: "Subscribe",
  //           onClick: () => navigation(record, "subscribe"),
  //         },
  //       ];

  //       return (
  //         <Space size="middle">
  //           <Dropdown menu={{ items }}>
  //             <img
  //               src={actionMenuTogglerIcon}
  //               alt="action menu"
  //               style={{ cursor: "pointer" }}
  //             />
  //           </Dropdown>
  //         </Space>
  //       );
  //     },
  //   },
  // ];

  const navigation = (record: InstructorDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/instructor/edit/${record.instructorId}`, {
          state: {
            branchToEdit: record as InstructorDataType,
          },
        });
        break;

      case "view":
        navigate(`/instructor/view/${record.instructorId}`, {
          state: {
            branch: record as InstructorDataType,
          },
        });
        break;

      case "subscribe":
        navigate(`/instructor/subscribe/${record.instructorId}`, {
          state: {
            branch: record as InstructorDataType,
          },
        });
    }
  };




  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListBranchStyled>
        <Table
          columns={columns}
          dataSource={DummyData}
          title={() => <RenderTableTitle />}
        />
      </ListBranchStyled>

      <CardView />
    </>
  );
};

export default ListInstructor;

const RenderTableTitle = () => {
  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("instructorList");

  return (
    <div className="d-flex justify-content-between">
      <h3 className="table-heading">{getLabelByKey("title")}</h3>
      <CustomButton
        bgcolor={tertiaryBlue2}
        textTransform="Captilize"
        color={pureDark}
        padding="8px 10px"
        fontFamily={`${fontFamilyMedium}`}
        width="fit-content"
        type="submit"
        title=""
        fontSize="17px"
        icon={<img src={plusIcon} alt="edit icon" />}
        clicked={() => {
          navigate(`/instructor/create`);
        }}
      />
    </div>
  );
};
