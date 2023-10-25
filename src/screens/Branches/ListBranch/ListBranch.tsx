import React, { useEffect, useState } from "react";

import { Dropdown, MenuProps, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListBranchStyled } from "./styles";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  mainColor,
  pureDark,
  tertiaryBlue2,
} from "../../../components/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import {
  BranchDataType,
  getBranchBySchoolId,
} from "../../../redux/features/branch/branchSlice";
import { BELTS_SELECT_OPTIONS } from "../../Home/constants";
import { MenuInfo } from "rc-menu/lib/interface";

const ListBranch: React.FC = () => {
  const navigate = useNavigate();
  const { branchData, loading, error } = useSelector(
    (state: RootState) => state.branchData
  );

  const { businessTypes } = useSelector(
    (state: RootState) => state.appData.data.statusData
  );
  const columns: ColumnsType<BranchDataType> = [
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Belts",
      key: "tags",
      dataIndex: "tags",
      render: (_, { belts }) => {
        return (
          <Tag color={belts ? "green" : "red"}>{belts ? "Yes" : "No"}</Tag>
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
            label: "Edit",
            onClick: () => onClick(record),
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

  const onClick = (record: BranchDataType) => {
    navigate(`/branch/edit/${record.branchId}`, {
      state: {
        branchToEdit: record as BranchDataType,
      },
    }); // Navigate to the edit page with the rowId
  };

  useEffect(() => {
    store.dispatch(getBranchBySchoolId());
  }, []);

  console.log(branchData);

  return (
    <>
      {loading && <LoadingOverlay message="" />}
      <ListBranchStyled>
        <Table
          columns={columns}
          dataSource={branchData?.data}
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
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="table-heading">Branch Information</h3>
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
          navigate(`/branch/create`);
        }}
      />
    </div>
  );
};
