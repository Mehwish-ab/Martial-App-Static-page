import React from "react";
import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListMembershipStyled } from "./styles";
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
import { MembershipDataType } from "../../../redux/features/Membership/MembershipSlice";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";

const ListMembership: React.FC = () => {

  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.MembershipData);

  const columns: ColumnsType<MembershipDataType> = [
    {
      title: "Id",
      dataIndex: "MembershipId",
      key: "MembershipId",
    },
    {
      title: "Membership Title",
      dataIndex: "MembershipTitle",
      key: "MembershipTitle",
    },
    {
      title: "Type",
      dataIndex: "MembershipType",
      key: "MembershipType",
    },
    {
      title: "Visibility",
      dataIndex: "MembershipVisibility",
      key: "MembershipVisibility",
    },
    {
      title: "Expires",
      dataIndex: "MembershipExpires",
      key: "MembershipExpires",
    },
    {
      title: "Price",
      dataIndex: "MembershipPrice",
      key: "MembershipPrice",
    },

    {
      title: "Status",
      dataIndex: "MembershipStatus",
      key: "MembershipStatus",
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
      key: "MembershipAction",
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
            label: "School",
            onClick: () => navigation(record, "school"),
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

  const navigation = (record: MembershipDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/Membership/edit/${record.MembershipId}`, {
          state: {
            branchToEdit: record as MembershipDataType,
          },
        });
        break;

      case "view":
        navigate(`/Membership/view/${record.MembershipId}`, {
          state: {
            branch: record as MembershipDataType,
          },
        });
        break;

      case "school":
        navigate(`/membership/School-profile${record.MembershipId}`, {
          state: {
            branch: record as MembershipDataType,
          },
        });
    }
  };

  console.log("DummyData", DummyData);

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListMembershipStyled>
        <Table
          columns={columns}
          dataSource={
            DummyData.map((item) => ({
              ...item,
              key: item.MembershipId,
            })) as any
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
      </ListMembershipStyled>
    </>
  );
};

export default ListMembership;

const RenderTableTitle = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="table-heading">Membership</h3>
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
            icon={<img src={plusIcon} alt="edit icon" width={17} height={17} />}
            clicked={() => {
              navigate(`/membership/create`);
            }}
          />
        </CustomDiv>
      </div>
    </>

  );
};
