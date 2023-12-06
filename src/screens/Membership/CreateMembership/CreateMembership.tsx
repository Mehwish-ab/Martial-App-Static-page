import { useState } from "react";

import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import { Link, useNavigate } from "react-router-dom";

import { validationFinder } from "../../../utils/utilities";
import FormControl from "../../../components/FormControl";
import DateCalander from "../../../assets/images/dateCalander.svg";
import doller from "../../../assets/images/$.svg";
import camera from "../../../assets/images/DSLR_Camera.png";
import img from "../../../assets/images/Rectangleimg.png";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateClassStyled } from "../../Class/CreateClasses/styles";
import { CreateMembershipInitialValues } from "../constant";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import ic_calender from "../../../assets/icons/ic_calendar.svg";
import EnnvisionModal from "../../../components/CustomModals/EnnvisionModal";
import CustomModal from "../../../components/Modal/CustomModal";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
const CreateMembership = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  const { MembershipData } = useSelector(
    (state: RootState) => state.MembershipData
  );

  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);

  const initialValues: CreateMembershipInitialValues = {
    MembershipTitle: "",
    MembershipStartDate: "",
    MembershipEndDate: "",
    Visibility: [],
    MembershipSubscriptionType: [],
    MembershipFee: "",
    MinimumStudents: "",
    DailySubscriptionFees: "",
    WeeklySubscriptionFees: "",
    MonthlySubscriptionFees: "",
    AnnuallySubscriptionFees: "",
    AllowToStudentCancle: "",
    RefundFeeDate: "",
    BookingCancellationStart: "",
    BookingCancellationEnd: "",
    CancellationCharges: "",
    Accommodate: "",
    Description: "",
    Agreement: "",
    termCondition: "",
    Liabilitywaivers: "",
  };

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const emailAddressReg = new RegExp(emailAddress.pattern);

  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;

  const validationSchema = Yup.object({
    franchiseName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    franchisePhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),
  });
  const onSubmit = async () => {
    try {
      setIsShowModal(true);
      setTimeout(() => {
        setIsShowModal(false);
        navigate("/membership/list");
      }, 3000);
      setIsLoading(false);
    } catch (error: any) { }
  };
  return (
    <CreateClassStyled>
      <CustomModal
        isModalVisible={isShowModal}
        setIsModalVisible={setIsShowModal}
        showCloseBtn={false}
      >
        <EnnvisionModal
          doTask={() => {
            navigate("/branch/list");
            setIsShowModal(false);
          }}
          title="Membership Created Successfully!"
          description="Congratulations! Your Membership has been successfully Created, ensuring a seamless experience within the Marital "
        />
      </CustomModal>

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3>Membership Information</h3>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12" className="mt-20">
                        <FormControl
                          control="input"
                          type="text"
                          name="title"
                          label="Title"
                          padding="10px"
                          fontFamily={fontFamilyRegular}
                          fontSize="16px"
                          max={6}
                          placeholder="Title"
                        />
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="6" className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="StartDate"
                              fontFamily={fontFamilyRegular}
                              label="Start Date"
                              padding="10px"
                              placeholder="Start Date"
                              suffix={
                                <img
                                  src={DateCalander}
                                  alt=""
                                  width={25} height={25}
                                //onClick={(type = "date")}
                                />
                              }
                            />
                          </Col>
                          <Col md="6" className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="endDate"
                              fontFamily={fontFamilyRegular}
                              label="End Date"
                              padding="10px"
                              placeholder="End Date"
                              suffix={
                                <img
                                  src={DateCalander}
                                  alt=""
                                  width={25} height={25}
                                //onClick={(type = "date")}
                                />
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <Row>
                          <Col md="6" className="mt-20">
                            <FormControl
                              control="select"
                              type="text"
                              name="Visibility"
                              label="Visibility"
                              padding="7px"
                              fontFamily={fontFamilyRegular}
                              fontSize="16px"
                              max={6}
                              placeholder="Select Visibility"
                            />
                          </Col>
                          <Col md="6" className="mt-20">
                            <FormControl
                              control="select"
                              type="text"
                              name="SubscriptionType "
                              label="Subscription Type "
                              padding="7px"
                              fontFamily={fontFamilyRegular}
                              fontSize="16px"
                              max={6}
                              placeholder="Select Subscription Type"
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
                              name="membershipfee"
                              fontFamily={fontFamilyRegular}
                              label="Membership Fees"
                              padding="10px"
                              placeholder="300:00"
                              suffix={
                                <img
                                  src={doller}
                                  alt=""
                                  width={13} height={27}
                                //onClick={(type = "date")}
                                />
                              }
                            />
                          </Col>
                          <Col md="6" className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="Activities"
                              fontFamily={fontFamilyRegular}
                              label="Minimum Student"
                              padding="10px"
                              placeholder="Enter Minimum Student Required for Class"
                            />
                          </Col>
                        </Row>
                      </Col>

                    </Row>
                  </Col>
                  <Col md="6">
                    <Col md="12" className="mt-20">
                      <p className="bannerTitle ">Select Banner Image</p>
                      <OverlayImages
                        backgroundImg={MembershipData?.MemberShipPicture || ""}
                        overlayImg={false}
                        isEditable={true}
                      />
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <h3 className="mt-20">Subscription Plan</h3>
                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="DailySubscriptionFees"
                      fontFamily={fontFamilyRegular}
                      label="Daily Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          width={13} height={27}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>
                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="WeeklySubscriptionFees"
                      fontFamily={fontFamilyRegular}
                      label="Weekly Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          width={13} height={27}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>
                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="MonthlySubscriptionFees"
                      fontFamily={fontFamilyRegular}
                      label="Monthly Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          width={13} height={27}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>
                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="AnnuallySubscriptionFees"
                      fontFamily={fontFamilyRegular}
                      label="Annually Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          width={13} height={27}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="AllowtoStudentCancel "
                      label="Allow to Student Cancel "
                      padding="7px"
                      fontFamily={fontFamilyRegular}
                      fontSize="16px"
                      max={6}
                      placeholder="Monday, October 27, 2023"
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="RefundFeesDate"
                      fontFamily={fontFamilyRegular}
                      label="Refund Fees Date"
                      padding="10px"
                      placeholder="Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          width={25} height={25}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="BookingCancellationStart "
                      fontFamily={fontFamilyRegular}
                      label="Booking Cancellation Start "
                      padding="10px"
                      placeholder="Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          width={25} height={25}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="BookingCancellationEnd "
                      fontFamily={fontFamilyRegular}
                      label="Booking Cancellation End "
                      padding="10px"
                      placeholder="Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          width={25} height={25}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="Cancellation Charge"
                      fontFamily={fontFamilyRegular}
                      label="Cancellation Charge"
                      padding="10px"
                      placeholder="20:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          width={13} height={27}
                        //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="Accommodate"
                      label="Accommodate "
                      fontFamily={fontFamilyRegular}
                      fontSize="16px"
                      max={6}
                      placeholder="Select Accommodation Options"
                    />
                  </Col>


                  <Col md="12" className="mt-20">
                    <FormControl
                      control="textarea"
                      type="text"
                      name="description"
                      fontFamily={fontFamilyRegular}
                      label="Description & Features"
                      padding="10px"
                      placeholder="Description & Features"
                      height="200px"
                    />
                  </Col>

                  <label htmlFor="termCondition">
                    <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                      <FormControl
                        control="checkbox"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <p className="checkBoxPara" id="termCondition">Terms and conditions</p>
                    </form>
                  </label>
                  <label htmlFor="agreement">
                    <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                      <FormControl
                        control="checkbox"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <p className="checkBoxPara" id="agreement">Agreement to follow the app's guidelines and policies</p>
                    </form>
                  </label>
                  <label htmlFor="liability">
                    <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                      <FormControl
                        control="checkbox"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <p className="checkBoxPara" id="liability">Liability waivers</p>
                    </form>
                  </label>
                </Row>
              </div>

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="11px 40.50px"
                  margin="30px 0px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title="Next"
                  fontSize="18px"
                  loading={isLoading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CreateClassStyled>
  );
};

export default CreateMembership;
