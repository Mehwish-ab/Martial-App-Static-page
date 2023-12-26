import { Dropdown, Space, Table } from "antd";
import { AddPaymentMethod } from "./styles";
import { useLocation, useParams } from "react-router-dom";
import { PaymentDataType } from "../../../redux/features/payments/PaymentSlice";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { useEffect, useState } from "react";
import dummydata from "./dummyData.json";
import usePayment from "../../../hooks/usePayment";
import StripechoolSKeysModal from "../../../components/Modals/payments/school/create/createSchoolStripekeys";
import SchoolGocardlessKeysModal from "../../../components/Modals/payments/school/create/createSchoolGocardless";
import BankaccountSchoolKeysModal from "../../../components/Modals/payments/school/create/createSchoolBankAccount";
import DislayStripechoolSKeysModal from "../../../components/Modals/payments/school/display/displayschoolstripe";
import DisplayBankaccountSchoolKeysModal from "../../../components/Modals/payments/school/display/displaySchoolBankAccount";
import DisplaygocardlessschoolKeysModal from "../../../components/Modals/payments/school/display/displayschoolgocardless";
import EditStripechoolSKeysModal from "../../../components/Modals/payments/school/edit/editSchoolStripekey";
import EditBankaccountSchoolKeysModal from "../../../components/Modals/payments/school/edit/editSchoolbankaccount";
import EditSchoolGocardlessKeysModal from "../../../components/Modals/payments/school/edit/editSchoolGocardless";
interface AddPaymentSchoolProps {
  branch: PaymentDataType; // Make sure to import BranchDataType
}

const AddPaymentSchool: React.FC = () => {
  const location = useLocation();
  const { schoolId } = useParams();

  // const branch: SchoolDataType | undefined = location?.state?.branch;
  // console.log(branch, "hi");

  const {
    get_stripe,
    get_gocard,
    get_bank,
    get_paypal,
    get_cash,
    deletePayment,
    deletemodal,
  } = usePayment();

  const [stripepayment, setStripepayment] = useState<any[]>([]);
  const [bankpayment, setBankpayment] = useState<any[]>([]);
  const [paypalpayment, setPaypalpayment] = useState<any[]>([]);
  const [Gocardlesspayment, setGocardlesspayment] = useState<any[]>([]);
  const [cashpayment, setCash] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isStripeKeysModalVisible, setIsStripeKeysModalVisible] =
    useState(false);
  const [isGocardlessKeysModalVisible, setIsGocardlessKeysModalVisible] =
    useState(false);
  const [isPayPalModalVisible, setIsPayPalKeysModalVisible] = useState(false);
  const [isBankAccountModalVisible, setisBankAccountModalVisible] =
    useState(false);
  const [isCashModalVisible, setisCashModalVisible] = useState(false);
  const [isdStripeKeysModalVisible, setdIsStripeKeysModalVisible] =
    useState(false);
  const [isdGocardlessKeysModalVisible, setIsdGocardlessKeysModalVisible] =
    useState(false);
  const [isdPayPalModalVisible, setIsdPayPalKeysModalVisible] = useState(false);
  const [isdBankAccountModalVisible, setisdBankAccountModalVisible] =
    useState(false);
  const [isdCashModalVisible, setisdCashModalVisible] = useState(false);
  const [isEStripeKeysModalVisible, setIsEStripeKeysModalVisible] =
    useState(false);
  const [isEGocardlessKeysModalVisible, setIsEGocardlessKeysModalVisible] =
    useState(false);
  const [isEPayPalModalVisible, setIsEPayPalKeysModalVisible] = useState(false);
  const [isEBankAccountModalVisible, setisEBankAccountModalVisible] =
    useState(false);
  const [isECashModalVisible, setisECashModalVisible] = useState(false);
  const [businessUC, setbusinessUC] = useState("");

  // Function to handle opening modals
  const openDisplayModal = (paymentType: string, paymentData: any) => {
    console.log(" create openModal called", paymentData, paymentType);

    switch (paymentType) {
      case "Stripe":
        console.log("clicked");

        setIsStripeKeysModalVisible(true);
        break;
      case "Gocardless":
        setIsGocardlessKeysModalVisible(true);
        break;
      case "PayPal":
        setisBankAccountModalVisible(true);
        break;
      case "Bank Account":
        setisBankAccountModalVisible(true);
        break;
      case "Cash":
        setIsGocardlessKeysModalVisible(true);
        break;
      default:
        break;
    }
  };

  const openShowModal = (paymentType: string, paymentdetails: any) => {
    console.log(" display openModal called", paymentdetails, paymentType);

    switch (paymentType) {
      case "Stripe":
        console.log("opned Stripe modal ");
        setdIsStripeKeysModalVisible(true);
        break;

      case "Gocardless":
        console.log("opned Gocardless modal ");
        setIsdGocardlessKeysModalVisible(true);

        break;

      case "PayPal":
        console.log("opned PayPal modal ");
        setIsdGocardlessKeysModalVisible(true);

        break;

      case "Bank Account":
        console.log("opned BankAccount modal ");
        setisdBankAccountModalVisible(true);

        break;

      case "Cash":
        console.log("opned Cash modal ");
        setIsdGocardlessKeysModalVisible(true);
        break;

      default:
        break;
    }
  };
  const openEditModal = (paymentType: string, paymentdetails: any) => {
    console.log("edit openModal called", paymentdetails, paymentType);

    switch (paymentType) {
      case "Stripe":
        console.log("clicked");

        setIsEStripeKeysModalVisible(true);
        setbusinessUC(paymentType);

        break;
      case "Gocardless":
        setIsEGocardlessKeysModalVisible(true);
        setbusinessUC(paymentType);

        break;
      case "PayPal":
        setIsEPayPalKeysModalVisible(true);
        setbusinessUC(paymentType);

        break;
      case "Bank Account":
        setisEBankAccountModalVisible(true);
        setbusinessUC(paymentType);

        break;
      case "Cash":
        setIsEGocardlessKeysModalVisible(true);
        setbusinessUC(paymentType);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("hi use effect");

    fetchstripe();
    async function fetchstripe() {
      const data = (await get_stripe("SCHOOL", Number(schoolId))) as any[];
      setStripepayment(data);
    }

    fetchbank();
    async function fetchbank() {
      // Check if branch is truthy before accessing its properties
      // if (branch) {
      const data = (await get_bank("SCHOOL", Number(schoolId))) as any[];
      setBankpayment(data);
      // }
    }
    fetchPaypal();
    async function fetchPaypal() {
      // if (branch) {
      const data = (await get_paypal("SCHOOL", Number(schoolId))) as any[];
      setPaypalpayment(data);
      //  /   }
    }
    fetchgocard();
    async function fetchgocard() {
      // if (branch) {
      const data = (await get_gocard("SCHOOL", Number(schoolId))) as any[];
      setGocardlesspayment(data);
      // }
    }
    fetchCash();
    async function fetchCash() {
      // if (branch) {
      const data = (await get_cash("SCHOOL", Number(schoolId))) as any[];
      setCash(data);
      // }
    }

    // if (branchToEdit && branchToEdit.branchId) {
    //   fetchPayment();
    // }
  }, [1000]);

  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("schoolCreate");

  const handleDelete = (paymentMethod: any, record: any) => {
    deletePayment(paymentMethod, record);
  };
  // const handleCreate = () => {
  //   //  setModelVisible(true);
  //   console.log(">>button is clicked");

  //   return;
  // };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const { franchiseData, loading } = useSelector(
    (state: RootState) => state?.franchiseData
  );

  // console.log("stripe", stripepayment);

  if (!loading && !franchiseData) {
    return <div>No data</div>;
  }

  const navigation = (record: PaymentDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "detail":
        navigate(`/branch/detail/${record?.id}`, {
          state: {
            branchToEdit: record as PaymentDataType,
          },
        });
        break;

      case "edit":
        navigate(`/branch/edit/${record?.id}`, {
          state: {
            branch: record as PaymentDataType,
          },
        });
        break;
      case "delete": {
        handleDelete(record.businessUC, record.id);
      }
    }
  };
  const columns: ColumnsType<PaymentDataType> = [
    {
      title: "Payment Information",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
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
      render: (DummyData) => {
        console.log(dummydata);

        if (DummyData[0] === "Test") {
          return (
            <div className={"Test"}>
              <button>Test</button>
              <img src={StatusActiveError} alt="image" />
            </div>
          );
        } else if (DummyData[0] === "Live") {
          return (
            <div className={"Live"}>
              <button>Live</button>
              <img src={StatusActiveError} alt="image" />
            </div>
          );
        } else {
          return <button>--</button>;
        }
        // return (
        //   <div className={DummyData}>
        //     <button>{DummyData}</button>
        //     <img src={StatusActiveError} alt="image" />
        //   </div>
        // );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (DummyData, record) => {
        console.log(dummydata, record, "Nada");

        if (DummyData === "Add") {
          return (
            <div className={"Add"}>
              <button
                onClick={() => openDisplayModal(record.paymentMethod, record)}
              >
                Add
              </button>
              <img src={StatusActiveError} alt="image" />
            </div>
          );
        } else if (DummyData[0] == false) {
          return (
            <div className={"De-Active"}>
              <button>De-Active</button>
              <img src={StatusActiveError} alt="image" />
            </div>
          );
        } else if (DummyData[0] === true) {
          return (
            <div className={"Active"}>
              <button>Active</button>
              <img src={StatusActiveError} alt="image" />
            </div>
          );
        }
      },

      // render: (DummyData, index) => {
      //   console.log("data", dummydata, "index", index);

      //   if (DummyData === "Add") {
      //     return (
      //       <div className={"Add"}>
      //         <GocardlessKeysModal
      //           open={showPopup}
      //           onClose={handleClosePopup}
      //           id={schoolId}
      //         />
      //         <button onClick={() => setShowPopup(true)}>Add</button>
      //         <img src={StatusActiveError} alt="image" />
      //       </div>
      //     );
      //   } else if (DummyData[0] == false) {
      //     return (
      //       <div className={"De-Active"}>
      //         <button>De-Active</button>
      //         <img src={StatusActiveError} alt="image" />
      //       </div>
      //     );
      //   } else if (DummyData[0] === true) {
      //     return (
      //       <div className={"Active"}>
      //         <button>Active</button>
      //         <img src={StatusActiveError} alt="image" />
      //       </div>
      //     );
      //   }
      // },
    },
    {
      title: "Action",
      key: "action",
      render: (value: any, record: any, index: number): any => {
        const items = [
          {
            key: "1",
            label: "detail",
            onClick: () => openShowModal(record.paymentMethod, record),
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => openEditModal(record.paymentMethod, record),
          },
          {
            key: "4",
            label: "Delete",
            onClick: () => {
              handleDelete(record?.paymentMethod, record?.id[0]);
              window.location.reload();
            },
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

  const rowsWithButtons = [
    {
      paymentMethod: "Gocardless",
      accountName:
        Gocardlesspayment?.length === 0
          ? "--"
          : Gocardlesspayment?.map((e) => {
              return e.accountName;
            }),
      countryName:
        Gocardlesspayment?.length === 0
          ? "--"
          : Gocardlesspayment?.map((e) => {
              return e.countryName;
            }),
      mode:
        Gocardlesspayment?.length === 0
          ? "--"
          : Gocardlesspayment?.map((e) => {
              return e.mode;
            }),
      status:
        Gocardlesspayment?.length === 0
          ? "Add"
          : Gocardlesspayment?.map((e) => {
              return e.isActive;
            }),
      id:
        Gocardlesspayment?.length === 0
          ? "Add"
          : Gocardlesspayment?.map((e) => {
              return e.id;
            }),
    },
    {
      paymentMethod: "PayPal",
      accountName:
        paypalpayment?.length === 0
          ? "--"
          : paypalpayment?.map((e) => {
              return e.accountName;
            }),
      countryName:
        paypalpayment?.length === 0
          ? "--"
          : paypalpayment?.map((e) => {
              return e.countryName;
            }),
      mode:
        paypalpayment?.length === 0
          ? "--"
          : paypalpayment?.map((e) => {
              return e.mode;
            }),
      status:
        paypalpayment?.length === 0
          ? "Add"
          : paypalpayment?.map((e) => {
              return e.isActive;
            }),
      id:
        paypalpayment?.length === 0
          ? "0"
          : paypalpayment?.map((e) => {
              return e.id;
            }),
    },
    {
      paymentMethod: "Stripe",
      accountName:
        stripepayment?.length === 0
          ? "--"
          : stripepayment?.map((e) => {
              return e.accountName;
            }),
      countryName:
        stripepayment?.length === 0
          ? "--"
          : stripepayment?.map((e) => {
              return e.countryName;
            }),
      mode:
        stripepayment?.length === 0
          ? "--"
          : stripepayment?.map((e) => {
              return e.mode;
            }),
      status:
        stripepayment?.length === 0
          ? "Add"
          : stripepayment?.map((e) => {
              return e.isActive;
            }),
      id:
        stripepayment?.length === 0
          ? "0"
          : stripepayment?.map((e) => {
              return e.id;
            }),
    },
    {
      paymentMethod: "Bank Account",
      accountName:
        bankpayment?.length === 0
          ? "--"
          : bankpayment?.map((e) => {
              return e.accountName;
            }),
      countryName:
        bankpayment?.length === 0
          ? "--"
          : bankpayment?.map((e) => {
              return e.countryName;
            }),
      mode:
        bankpayment?.length === 0
          ? "--"
          : bankpayment?.map((e) => {
              return e.mode;
            }),
      status:
        bankpayment?.length === 0
          ? "Add"
          : bankpayment?.map((e) => {
              return e.isActive;
            }),
      id:
        bankpayment?.length === 0
          ? "0"
          : bankpayment?.map((e) => {
              return e.id;
            }),
    },
    {
      paymentMethod: "Cash",
      accountName:
        cashpayment?.length === 0
          ? "--"
          : cashpayment?.map((e) => {
              return e.accountName;
            }),
      countryName:
        cashpayment?.length === 0
          ? "--"
          : cashpayment?.map((e) => {
              return e.countryName;
            }),
      mode:
        cashpayment?.length === 0
          ? "--"
          : cashpayment?.map((e) => {
              return e.mode;
            }),
      status:
        cashpayment?.length === 0
          ? "Add"
          : cashpayment?.map((e) => {
              return e.isActive;
            }),
      id:
        cashpayment?.length === 0
          ? "Add"
          : cashpayment?.map((e) => {
              return e.id;
            }),
    },
  ];
  return (
    <AddPaymentMethod>
      {deletemodal().modalComponent}
      {loading && <LoadingOverlay message="" />}
      <h3 className="table-heading">Payment Information</h3>
      {rowsWithButtons.length > 0 ? (
        <Table columns={columns} dataSource={rowsWithButtons as any} />
      ) : (
        <div>No data available</div>
      )}

      {/* Render modals based on conditions */}
      {isStripeKeysModalVisible && (
        <StripechoolSKeysModal
          open={isStripeKeysModalVisible}
          onClose={() => setIsStripeKeysModalVisible(false)}
          id={schoolId}
        />
      )}
      {isdStripeKeysModalVisible && (
        <DislayStripechoolSKeysModal
          open={isdStripeKeysModalVisible}
          onClose={() => setdIsStripeKeysModalVisible(false)}
          id={schoolId}
          paymentdetails={stripepayment}
        />
      )}
      {isEStripeKeysModalVisible && (
        <EditStripechoolSKeysModal
          open={isEStripeKeysModalVisible}
          onClose={() => setIsEStripeKeysModalVisible(false)}
          id={schoolId}
          paymentdetails={stripepayment}
          businessUC={businessUC}
        />
      )}
      {isdBankAccountModalVisible && (
        <DisplayBankaccountSchoolKeysModal
          open={isdBankAccountModalVisible}
          onClose={() => setisdBankAccountModalVisible(false)}
          id={schoolId}
          paymentdetails={bankpayment}
        />
      )}

      {isBankAccountModalVisible && (
        <BankaccountSchoolKeysModal
          open={isBankAccountModalVisible}
          onClose={() => setisBankAccountModalVisible(false)}
          id={schoolId}
          // paymentdetails={bankpayment} {/* Pass paymentdetails as a prop */}
        />
      )}
      {isEBankAccountModalVisible && (
        <EditBankaccountSchoolKeysModal
          open={isEBankAccountModalVisible}
          onClose={() => setisEBankAccountModalVisible(false)}
          id={schoolId}
          paymentdetails={bankpayment}
          businessUC={businessUC}
        />
      )}
      {isdGocardlessKeysModalVisible && (
        <DisplaygocardlessschoolKeysModal
          open={isdGocardlessKeysModalVisible}
          onClose={() => setIsdGocardlessKeysModalVisible(false)}
          id={schoolId}
          paymentdetails={Gocardlesspayment}
        />
      )}

      {isGocardlessKeysModalVisible && (
        <SchoolGocardlessKeysModal
          open={isGocardlessKeysModalVisible}
          onClose={() => setIsGocardlessKeysModalVisible(false)}
          id={schoolId}
          // paymentdetails={Gocardlesspayment} {/* Pass paymentdetails as a prop */}
        />
      )}
      {isEGocardlessKeysModalVisible && (
        <EditSchoolGocardlessKeysModal
          open={isEGocardlessKeysModalVisible}
          onClose={() => setIsEGocardlessKeysModalVisible(false)}
          id={schoolId}
          paymentdetails={Gocardlesspayment}
          businessUC={businessUC}
        />
      )}
      {/* Other modals go here */}
    </AddPaymentMethod>
  );
};

// return (
//   <AddPaymentMethod>
//     {deletemodal().modalComponent}

//     {loading && <LoadingOverlay message="" />}
//     <h3 className="table-heading">Payment Information</h3>
//     {rowsWithButtons.length > 0 ? (
//       <Table columns={columns} dataSource={rowsWithButtons as any} />
//     ) : (
//       <div>No data available</div>
//     )}
//   </AddPaymentMethod>
// );
// };

export default AddPaymentSchool;
