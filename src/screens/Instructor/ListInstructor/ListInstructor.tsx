import React, { useState } from "react";
import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListInstructorStyled } from "./styles";
import CustomButton, { CustomDiv } from "../../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  pureDark,
  tertiaryBlue2,
} from "../../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

import { useSelector } from "react-redux";
// import store, { RootState } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";

import { InstructorDataType } from "../../../redux/features/instructor/instructorSlice";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import DummyData from "./dummyData.json";
import BeltImage from "../../../assets/images/BlueBelt.svg";
import StatusActiveError from "../../../assets/images/activeBtnError.svg"
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";

const ListInstructor: React.FC = () => {
  const { getLabelByKey } = useScreenTranslation("instructorList");

  const navigate = useNavigate();
  // const { branchData, loading, error } = useSelector(
  //   (state: RootState) => state.branchData
  // );

  const { loading } = useSelector(
    (state: RootState) => state.branchData
  );

  // const { businessTypes, activities } = useSelector(
  //   (state: RootState) => state.appData.data.statusData
  // );

  // const { selectedLanguage } = useSelector(
  //   (state: RootState) => state.selectedLanguage
  // );


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

        return <img src={DummyData} width={44} alt="dummy images data" />;
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
      render: (DummyData) => {
        return <p className="sub-title">
          {DummyData?.length > 33
            ? `${DummyData.slice(0, 50)}...`
            : DummyData}
        </p>
      }
    },
    {
      title: getLabelByKey("ranking"),
      dataIndex: "instructorRanking",
      key: "instructorRanking",
      render: (DummyData) => {
        return <div className="progress" style={{background: "#386BB4", borderRadius: "4px", border: "1px solid #231F20"}}><div className="progress-bar" role="progressbar" style={{width: "40%", background: "#231F20"}} aria-valuenow={40} aria-valuemin={10} aria-valuemax={100}></div></div>
      },
    },
    {
      // title: getLabelByKey("experiences"),
      title: "Experience",
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
          // {
          //   key: "3",
          //   label: "Subscribe",
          //   onClick: () => navigation(record, "subscribe"),
          // },
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

      // case "subscribe":
      //   navigate(`/instructor/subscribe/${record.instructorId}`, {
      //     state: {
      //       branch: record as InstructorDataType,
      //     },
      //   });
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [current, setCurrent] = useState(1);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = { selectedRowKeys, onChange: onSelectChange};


  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListInstructorStyled>
        <Table
          columns={columns}
          dataSource={DummyData as unknown as InstructorDataType[]}
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
      </ListInstructorStyled>

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
      <CustomDiv>
        <div className="instructorDateSection">
          <div className="mainarrow">
            <div className="arrowright">
              <img src={LeftArrow} alt="Date" />
            </div>
            <div className="arrowleft">
              <img src={RightArrow} alt="Date" />
            </div>

          </div>
          <div className="dateRange">
            <p>Mon, Sep 11, 2023 - Thu Sep 21, 2023</p>
            <img src={DateCalander} alt="" />
          </div>
          <div className="dateToday">Today</div>
        </div>
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
      </CustomDiv>

    </div>
  );
};
