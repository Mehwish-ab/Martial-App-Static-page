import { Card, Dropdown, Space, Table } from 'antd'
import { AddPaymentMethod } from './styles'
import { PaymentPop } from './PaymentPop'
import { BranchDataType } from '../../../redux/features/branch/branchSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import show_password_icon from '../../../assets/icons/ic_show_passcode.svg'
import { useState } from 'react'
import CustomModal from '../../../components/Modal/CustomModal'
import FormControl from '../../../components/FormControl'
import { Form, Formik } from 'formik'
import useCreateSchool from '../../../hooks/useCreateSchool'
import { CreateSchoolInitialValues } from '../../Home/constants'
import * as Yup from 'yup'
import { Row, Col } from 'react-bootstrap'

import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'

const AddPaymentSchool: React.FC = () => {
    const navigate = useNavigate()

    //   const { language, currency } = useSelector(
    //     (state: RootState) => state.appData.data.dropdowns
    //   );

    const [isModalVisible, setModelVisible] = useState(false)

    const { loading } = useSelector((state: RootState) => state.branchData)

    //   const { selectedLanguage } = useSelector(
    //     (state: RootState) => state.selectedLanguage
    //   );
    //   let defaultLanguage = language.find(
    //     (item: DataTypesWithIdAndMultipleLangLabel) =>
    //       +item.id == +branch.defaultLanguageId
    //   );

    //   let defaultCurrency = currency.find(
    //     (item: DataTypesWithIdAndMultipleLangLabel) =>
    //       +item.id == +branch.defaultCurrencyId
    //   );

    //   console.log(defaultLanguage, defaultCurrency);

    const navigation = (record: BranchDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'detail':
                setModelVisible(true)
                // navigate(`/branch/detail/${record.branchId}`, {
                //   state: {
                //     branchToEdit: record as BranchDataType,
                //   },
                // });
                break

            case 'edit':
                navigate(`/branch/edit/${record.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
                break
            case 'delete':
                navigate(`/branch/delete/${record.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
        }
    }

    const columns: ColumnsType<BranchDataType> = [
        {
            title: 'Payment Information',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Account Name',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
        {
            title: 'Country Name',
            dataIndex: 'countryName',
            key: 'countryName',
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            render: (DummyData1) => {
                return (
                    <div className={DummyData1}>
                        <button>{DummyData1}</button>
                        <img src={StatusActiveError} alt="images" />
                    </div>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'Staus',
            render: (DummyData2) => {
                return (
                    <div className={DummyData2}>
                        <button>{DummyData2}</button>
                        <img src={StatusActiveError} alt="images" />
                    </div>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (
                value: any,
                record: BranchDataType,
                index: number
            ): any => {
                const items = [
                    {
                        key: '1',
                        label: 'detail',
                        onClick: () => navigation(record, 'detail'),
                    },
                    {
                        key: '2',
                        label: 'Edit',
                        onClick: () => navigation(record, 'edit'),
                    },
                    {
                        key: '4',
                        label: 'Delete',
                        onClick: () => navigation(record, 'delete'),
                    },
                ]

                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <img
                                src={actionMenuTogglerIcon}
                                alt="action menu"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                )
            },
        },
    ]

    const { handleCreateSubmit, SuccessModal } = useCreateSchool()

    const businessName = {
        notBlankMsgEn: 'Business name cannot be blank',
        patternMsgEn: 'Invalid business name pattern',
    }

    const initialValues: CreateSchoolInitialValues = {
        businessName: '',
        businessType: '',
        address: '',
        businessPhoneNumber: '',
        defaultLanguageId: '',
        defaultCurrencyId: '',
        description: '',
        rank: 0,

        selectedActivities: [],
        selectedFacilities: [],
    }

    return (
        <AddPaymentMethod>
            {loading && <LoadingOverlay message="" />}
            <h3 className="table-heading">Payment Information</h3>
            <Table
                columns={columns}
                dataSource={DummyData as any}
                scroll={{ x: true }}
            />

            {/* Create Pages */}

            {/* <CustomModal
        width="477px"
        children={
          <PaymentPop>
            <h3>Stripe keys</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Row>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="input"
                            type="text"
                            name="accontTitle"
                            label="Account Title"
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Account Title"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="select"
                            type="select"
                            name="countryName"
                            label="Country Name"
                            fontSize="16px"
                            max={6}
                            placeholder="Select Country Name"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="input"
                            type="text"
                            name="pulishableKey"
                            label="Publishable Key"
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Publishable Key"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="password"
                            type="text"
                            name="secretKey"
                            labelFamily={`${fontFamilyRegular}`}
                            labelMarginBottom="7px"
                            color={pureDark2}
                            label="Secret Key"
                            padding="10px"
                            placeholder="Enter Secret Key"
                            suffix={show_password_icon}
                            className="loginPassword"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <CustomButton
                            bgcolor={lightBlue3}
                            textTransform="Captilize"
                            color={pureDark2}
                            padding="12.5px"
                            fontFamily={fontFamilyMedium}
                            width="100%"
                            type="submit"
                            title="Submit"
                            fontSize="16px"
                            loading={loading}
                          />
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </div>

          </PaymentPop>
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}
            {/* <CustomModal
        width="953px"
        children={
          <PaymentPop>
            <h3>GoCardLess</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Row>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accontTitle"
                                label="Account Title"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Account Title"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="select"
                                type="select"
                                name="countryName"
                                label="Country Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Select Country Name"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accessToken"
                                label="Access Token"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Access Token"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="clientID"
                                label="Client Id"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Client Id"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="webhook"
                                label="Webhook"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Webhook"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="clientSecret"
                                label="Client Secret"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Client Secret"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                            </Col>
                            <Col md="6" className="mt-20">
                              <CustomButton
                                bgcolor={lightBlue3}
                                textTransform="Captilize"
                                color={pureDark2}
                                padding="12.5px"
                                fontFamily={fontFamilyMedium}
                                width="100%"
                                type="submit"
                                title="Submit"
                                fontSize="16px"
                                loading={loading}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </div>

          </PaymentPop>
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}
            {/* <CustomModal
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
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Row>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accontTitle"
                                label="Account Title"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Account Title"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="select"
                                type="select"
                                name="countryName"
                                label="Country Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Select Country Name"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accessToken"
                                label="Bank Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Name"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="bankAccountHolder"
                                label="Bank Account Holder"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Account Holder"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="IBANNumber"
                                label="IBAN Number"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter IBAN Number"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="bankAccountNumber"
                                label="Bank Account Number"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Account Number"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="sortCode"
                                label="Sort Code"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Sort Code"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="BIC"
                                label="BIC"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter BIC"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                            </Col>
                            <Col md="6" className="mt-20">
                              <CustomButton
                                bgcolor={lightBlue3}
                                textTransform="Captilize"
                                color={pureDark2}
                                padding="12.5px"
                                fontFamily={fontFamilyMedium}
                                width="100%"
                                type="submit"
                                title="Submit"
                                fontSize="16px"
                                loading={loading}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </div>

          </PaymentPop>
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}

            {/* View Pages */}

            {/* <CustomModal
        width="493px"
        showCloseBtn={false}
        children={
          <PaymentPop>
            <h3>Stripe Keys</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Card>
                        <Row>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Account Title
                              </div>
                              <div className="list-item-value">
                                Canada Marital School
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Publish Keys
                              </div>
                              <div className="list-item-value">
                                pk_test_YsTMWo7ZLJX3K6QZYujQ0BA3
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Secret Key
                              </div>
                              <div className="list-item-value">
                                sk_test_YsTMWo7ZLJX3K6QZYujQ0BA3
                              </div>
                            </div>
                          </Col>
                          <Col md="12">
                            <Row>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Country
                                  </div>
                                  <div className="list-item-value">
                                    Canada
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Status
                                  </div>
                                  <div className="list-item-value">
                                    Active
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
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}
            {/* <CustomModal
        width="493px"
        showCloseBtn={false}
        children={
          <PaymentPop>
            <h3>GoCardLess</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Card>
                        <Row>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Account Title
                              </div>
                              <div className="list-item-value">
                                Canada Marital School
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Access Token
                              </div>
                              <div className="list-item-value">
                                pk_test_YsTMWo7ZLJX3K6QZYujQ0BA3
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Client Id
                              </div>
                              <div className="list-item-value">
                                GvboZ9xCrZ
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Webhook
                              </div>
                              <div className="list-item-value">
                                www.webhook.com/imas03
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Client Secret Id
                              </div>
                              <div className="list-item-value">
                                GvboZ9xCrZ
                              </div>
                            </div>
                          </Col>
                          <Col md="12">
                            <Row>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Country
                                  </div>
                                  <div className="list-item-value">
                                    Canada
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Status
                                  </div>
                                  <div className="list-item-value">
                                    Active
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
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}
            {/* <CustomModal
        width="493px"
        showCloseBtn={false}
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
                    <Form
                      name="basic"
                      autoComplete="off"
                    >
                      <Card>
                        <Row>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Account Title
                              </div>
                              <div className="list-item-value">
                                Canada Marital School
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Bank Name
                              </div>
                              <div className="list-item-value">
                                TD Bank Ltd
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Bank Account Holder
                              </div>
                              <div className="list-item-value">
                                John Smith
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Bank Account Number
                              </div>
                              <div className="list-item-value">
                                6016 1331 9268 1954
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                IBAN Number
                              </div>
                              <div className="list-item-value">
                                GB29 NWBK 6016 1331 9268 19
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                Sort Code
                              </div>
                              <div className="list-item-value">
                                12-34-56
                              </div>
                            </div>
                          </Col>
                          <Col md="12" className="mb-20">
                            <div className="list-item">
                              <div className="list-item-title">
                                BIC
                              </div>
                              <div className="list-item-value">
                                HBUKGB4B
                              </div>
                            </div>
                          </Col>
                          <Col md="12">
                            <Row>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Country
                                  </div>
                                  <div className="list-item-value">
                                    Canada
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="list-item">
                                  <div className="list-item-title">
                                    Status
                                  </div>
                                  <div className="list-item-value">
                                    Active
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
        } isModalVisible={isModalVisible} setIsModalVisible={setModelVisible} /> */}
        </AddPaymentMethod>
    )
}

export default AddPaymentSchool
