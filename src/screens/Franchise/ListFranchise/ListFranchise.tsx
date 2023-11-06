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

const ListFranchise: React.FC = () => {
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
  const columns: ColumnsType<BranchDataType> = [
    {
      title: "Id",
      dataIndex: "branchId",
      key: "branchId",
    },
    {
      title: "Name",
      dataIndex: "branchName",
      key: "branchName",
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
      dataIndex: "activity",
      key: "activity",
      render: (_, { activities: commaSeparatedIds }) => {
        const filteredObjects = activities.filter((obj) => {
          const objId = obj.id;
          return commaSeparatedIds.split(",").includes(objId.toString());
        });
        let names = filteredObjects
          .map((obj) => (obj as any)[selectedLanguage])
          .join(", ");
        const maxLength = 20;

        if (names.length > maxLength) {
          names = names.slice(0, maxLength - 3) + "...";
        }
        return <p>{names}</p>;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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

  const navigation = (record: BranchDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/franchise/edit/${record.branchId}`, {
          state: {
            branchToEdit: record as BranchDataType,
          },
        });
        break;

      case "view":
        navigate(`/franchise/view/${record.branchId}`, {
          state: {
            branch: record as BranchDataType,
          },
        });
        break;

      case "subscribe":
        navigate(`/franchise/subscribe/${record.branchId}`, {
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
          dataSource={branchData?.data}
          title={() => <RenderTableTitle />}
        />
      </ListBranchStyled>
    </>
  );
};

export default ListFranchise;

const RenderTableTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between">
      <h3 className="table-heading">Franchise Information</h3>
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
          navigate(`/franchise/create`);
        }}
      />
    </div>
  );
};
