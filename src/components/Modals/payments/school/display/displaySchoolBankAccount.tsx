import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { Row, Col, Card } from "react-bootstrap"; // Replace with your layout library
import CustomModal from "../../../../Modal/CustomModal";
import FormControl from "../../../../FormControl";
import { PaymentPop } from "../../../../../screens/CreateSchool/AddPaymentSchool/PaymentPop";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark2,
} from "../../../../GlobalStyle";
// import countryList from "react-select-country-list";

import CustomButton from "../../../../CustomButton/CustomButton";
import show_password_icon from "../../../assets/icons/ic_show_passcode.svg";
import { createPaymentInitialValues } from "../../constant";
import usePayment from "../../../../../hooks/usePayment";
import { AddPaymentMethod } from "../../../../../screens/Franchise/ViewFranchise/styles";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../../../redux/features/types";
import { SelectOptionsDataTypes } from "../../../../../screens/Home/constants";
import PlacesAutoCompleteInput from "../../../../../maps/PlacesAutocomplete";
interface StripeKeysModalProps {
  open: boolean;
  onClose: (value: string) => void;
  id: any;
  paymentdetails: any; // Define the prop type
}

// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const changeHandler = (value:any) => {
//   setValue(value)

// }
const DisplayBankaccountSchoolKeysModal: React.FC<StripeKeysModalProps> = (
  props
) => {
  console.log("Account values", props.paymentdetails);
  const firstPaymentDetail = props.paymentdetails[0];

  const initialValues: createPaymentInitialValues = {
    businessUC: "",
    id: 0,
    publishableKey: "",
    secretKey: "",
    accountName: "",
    paymentMethod: "",
    isActive: false,
    countryName: "",
    accessToken: "",
    clientId: "",
    webhook: "",
    clientSecret: "",
    bankName: "",
    accountHolder: "",
    ibanNumber: "",
    accountNumber: "",
    sortCode: "",
    bic: "",
  };
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  const createOptions = (list: DataTypesWithIdAndMultipleLangLabel[]) => {
    let options: SelectOptionsDataTypes[] = [];
    list?.forEach((item) => {
      let obj = {
        label: (item as any)[selectedLanguage],
        value: item.id,
      };

      options.push(obj);
    });

    return options;
  };

  const [iSModalVisible, setModelVisible] = useState(false);
  const { create_Payment, loading } = usePayment();
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes, countryName },
  } = useSelector((state: RootState) => state.appData.data);
  const handleCreateSubmit = async (values: any) => {
    // const data = await create_bankaccount("SCHOOL", values, props.id);
    // if (data) props.onClose("");
  };

  return (
    <AddPaymentMethod>
      <CustomModal
        onCancel={() => props.onClose("")}
        width="953px"
        children={
          <PaymentPop>
            <h3>Bank Account</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form name="basic" autoComplete="off">
                      <Card>
                        <Row>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Account Title
                              </div>
                              <div className="list-item-value">
                                {firstPaymentDetail.accountName}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">Bank Name</div>
                              <div className="list-item-value">
                                {firstPaymentDetail.bankName}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Bank Account Holder
                              </div>
                              <div className="list-item-value">
                                {firstPaymentDetail.accountHolder}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Bank Account Number
                              </div>
                              <div className="list-item-value">
                                {firstPaymentDetail.accountNumber}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">IBAN Number</div>
                              <div className="list-item-value">
                                {firstPaymentDetail.ibanNumber}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">Sort Code</div>
                              <div className="list-item-value">
                                {firstPaymentDetail.sortCode}
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">BIC</div>
                              <div className="list-item-value">
                                {firstPaymentDetail.bic}
                              </div>
                            </div>
                          </Col>
                          <Col md="12">
                            <Row>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">Country</div>
                                  <div className="list-item-value">
                                    {firstPaymentDetail.countryName}
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">Status</div>
                                  <div className="list-item-value">
                                    {firstPaymentDetail.isActive === true
                                      ? "Active"
                                      : "De-Active"}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </PaymentPop>
        }
        isModalVisible={props.open}
        setIsModalVisible={setModelVisible}
      />
    </AddPaymentMethod>
  );
};

export default DisplayBankaccountSchoolKeysModal;
