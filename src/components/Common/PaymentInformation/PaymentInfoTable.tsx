import { Dropdown, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { PaymentInfoTableStyled } from "./styles";

import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";

export interface PaymentInfoDataType {
  paymentMethod: string;
  accountName: string;
  countryName: string;
  mode: string;
  status: string;
}
const PaymentInfoTable = ({ formik }: any) => {
  const { getLabelByKey } = useScreenTranslation("paymentInformation");
  const navigation = () => {
    // navigate(`/branch/edit/${record.branchId}`, {
    //   state: {
    //     branchToEdit: record as BranchDataType,
    //   },
    // }); // Navigate to the edit page with the rowId
  };
  const columns: ColumnsType<PaymentInfoDataType> = [
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
      // render: (_, { branchType }) => {
      //   let item = businessTypes.find((b) => b.id === branchType);
      //   return <p>{item?.en}</p>;
      // },
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      //  render: (_, { belts }) => {
      //    return (
      //      <Tag color={belts ? "green" : "red"}>{belts ? "Yes" : "No"}</Tag>
      //    );
      //  },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: "Edit",
            onClick: () => navigation(),
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

  return (
    <PaymentInfoTableStyled>
      <h3>{getLabelByKey("paymentInformation")}</h3>

      <Table
        columns={columns}
        dataSource={[]}
        // title={() => <RenderTableTitle />}
        scroll={{ x: true }}
      />
    </PaymentInfoTableStyled>
  );
};

export default PaymentInfoTable;
