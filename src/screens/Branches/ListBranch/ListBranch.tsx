import { useEffect } from "react";
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

import { CustomDiv, ListBranchStyled } from "./styles";
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
      dataIndex: "branchName",
      key: "branchName",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "branchType",
      key: "branchType",
      // render: (_, { branchType }) => {
      //   let item = businessTypes.find((b) => b.id === branchType);
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
      }
      // render: (_, { activities: commaSeparatedIds }) => {
      //   const filteredObjects = activities.filter((obj) => {
      //     const objId = obj.id;
      //     return commaSeparatedIds.split(",").includes(objId.toString());
      //   });
      //   let names = filteredObjects
      //     .map((obj) => (obj as any)[selectedLanguage])
      //     .join(", ");
      //   const maxLength = 20;

      //   if (names.length > maxLength) {
      //     names = names.slice(0, maxLength - 3) + "...";
      //   }
      //   return <p>{names}</p>;
      // },
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
    }
  };

  useEffect(() => {
    store.dispatch(getBranchBySchoolId());
  }, []);

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListBranchStyled>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          title={() => <RenderTableTitle />}
          scroll={{ x: true }}
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
      <h3 className="table-heading">Branch List</h3>
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
