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
  lightBlue3,
  pureDark,
  pureDark2,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
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
    } catch (error: any) {}
  };
  return (
    <CreateSchoolStyled>
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
                <h3 style={{ color: pureDark2 }}>Membership Information</h3>
                <Row>
                  <Col md="6">
                    <Col md="12" className="mt-20">
                      <FormControl
                        control="input"
                        type="text"
                        name="title"
                        label="Title"
                        padding="10px"
                        fontFamily={fontFamilyMedium}
                        fontSize="16px"
                        max={6}
                        placeholder="7250 Keele St, Vaughan, ON L4K 1Z8, Canada"
                      />
                    </Col>

                    <Col md="12" className="d-flex  gap-2">
                      <Col md="6" className="mt-20">
                        <FormControl
                          control="input"
                          type="text"
                          name="StartDate"
                          fontFamily={fontFamilyMedium}
                          label="Start Dates"
                          padding="10px"
                          placeholder=" Monday, October 27, 2023"
                          suffix={
                            <img
                              src={DateCalander}
                              alt=""
                              style={{ width: "18", height: "18px" }}
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
                          fontFamily={fontFamilyMedium}
                          label="End Dates"
                          padding="10px"
                          placeholder=" Monday, October 27, 2023"
                          suffix={
                            <img
                              src={DateCalander}
                              alt=""
                              style={{ width: "18", height: "18px" }}
                              //onClick={(type = "date")}
                            />
                          }
                        />
                      </Col>
                    </Col>
                    <Col md="12" className=" fill d-flex gap-2">
                      <Col md="6" className=" my-4 ">
                        <FormControl
                          control="select"
                          type="text"
                          name="Visibility"
                          label="Visibility"
                          padding="7px"
                          fontFamily={fontFamilyMedium}
                          fontSize="16px"
                          max={6}
                          placeholder="Select Visibility"
                        />
                      </Col>

                      <Col md="6" className=" my-4 ">
                        <FormControl
                          control="select"
                          type="text"
                          name="SubscriptionType "
                          label="Subscription Type "
                          padding="7px"
                          fontFamily={fontFamilyMedium}
                          fontSize="16px"
                          max={6}
                          placeholder="Select Subscription Type"
                        />
                      </Col>
                    </Col>
                    <Col md="12" className=" fill d-flex gap-2">
                      <Col md="6">
                        <FormControl
                          control="input"
                          type="text"
                          name="membershipfee"
                          fontFamily={fontFamilyMedium}
                          label="Membership Fees"
                          padding="10px"
                          placeholder="300:00"
                          suffix={
                            <img
                              src={doller}
                              alt=""
                              style={{ width: "18", height: "18px" }}
                              //onClick={(type = "date")}
                            />
                          }
                        />
                      </Col>
                      <Col md="6">
                        <FormControl
                          control="input"
                          type="text"
                          name="Activities"
                          fontFamily={fontFamilyMedium}
                          label="Minimum Student"
                          padding="10px"
                          placeholder="Enter Minimum Student Required for Class"
                        />
                      </Col>
                    </Col>
                  </Col>

                  <Col md="6" className="mt-20">
                    <OverlayImages
                      backgroundImg={MembershipData.MemberShipPicture || ""}
                      overlayImg={null}
                      isEditable={true}
                    />
                  </Col>
                  <div className="container my-4">
                    <h3 style={{ color: pureDark2 }}>Subscription Plan</h3>
                  </div>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="DailySubscriptionFees"
                      fontFamily={fontFamilyMedium}
                      label="Daily Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          style={{ width: "18", height: "18px" }}
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
                      fontFamily={fontFamilyMedium}
                      label="Weekly Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          style={{ width: "18", height: "18px" }}
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
                      fontFamily={fontFamilyMedium}
                      label="Monthly Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          style={{ width: "18", height: "18px" }}
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
                      fontFamily={fontFamilyMedium}
                      label="Annually Subscription Fees"
                      padding="10px"
                      placeholder="30:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          style={{ width: "18", height: "18px" }}
                          //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className=" my-4 ">
                    <FormControl
                      control="select"
                      type="text"
                      name="AllowtoStudentCancel "
                      label="Allow to Student Cancel "
                      padding="7px"
                      fontFamily={fontFamilyMedium}
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
                      fontFamily={fontFamilyMedium}
                      label="Refund Fees Date"
                      padding="10px"
                      placeholder=" Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          style={{ width: "18", height: "18px" }}
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
                      fontFamily={fontFamilyMedium}
                      label="Booking Cancellation Start "
                      padding="10px"
                      placeholder=" Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          style={{ width: "18", height: "18px" }}
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
                      fontFamily={fontFamilyMedium}
                      label="Booking Cancellation End "
                      padding="10px"
                      placeholder=" Monday, October 27, 2023"
                      suffix={
                        <img
                          src={DateCalander}
                          alt=""
                          style={{ width: "18", height: "18px" }}
                          //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className="">
                    <FormControl
                      control="input"
                      type="text"
                      name="Cancellation Charge"
                      fontFamily={fontFamilyMedium}
                      label="Cancellation Charge"
                      padding="10px"
                      placeholder="20:00"
                      suffix={
                        <img
                          src={doller}
                          alt=""
                          style={{ width: "18", height: "18px" }}
                          //onClick={(type = "date")}
                        />
                      }
                    />
                  </Col>

                  <Col md="3" className=" fill ">
                    <FormControl
                      control="select"
                      type="text"
                      name="Accommodate"
                      label="Accommodate "
                      fontFamily={fontFamilyMedium}
                      fontSize="15px"
                      max={6}
                      placeholder="Select Accommodation Options"
                    />
                  </Col>

                  <Col md="12" className="mt-20">
                    <h5>Description & Features</h5>
                    <div
                      className="my-3 border border-light border border-4"
                      title="Description & Features"
                      id="description"
                      //   rows="5"
                      //   cols="50"
                      //   control="textarea"
                      //   fontFamily={fontFamilyMedium}
                      //   padding="10px"
                      //   placeholder="Description"
                      //   text="hello"
                    >
                      <div>
                        <p>
                          Judo: a relatively modern Japanese martial art
                          (created in 1882). The goal of judo is to either throw
                          or takedown one’s opponent to the ground and
                          immobilize or subdue them with a grappling maneuver,
                          joint lock, strangle hold, or choke. Strikes and
                          thrusts by hands and feet or weapons are only allowed
                          in pre-arranged forms (kata), and are not allowed in
                          competition or free practice.
                        </p>
                        <p>
                          Jiu Jitsu (Jujitsu, Jujutsu): a Japanese martial art
                          for defeating an armed and armored opponent in which
                          one uses no weapon, or only a short weapon.
                          Practitioners neutralize an enemy with pins, joint
                          locks, and throws by using an attacker’s energy
                          against him, rather than directly opposing it (as with
                          other martial arts such as karate). There are five
                          main areas or arts of training: blocking, fulcrum
                          throw, non-fulcrum throw, escaping, and striking.
                        </p>
                      </div>
                    </div>
                  </Col>

                  <label htmlFor="termCondition">
                    <form className="mt-3 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="termCondition"
                        id="termCondition"
                      />
                      <p className="ms-3 mb-0" id="termCondition">
                        Terms and conditions
                      </p>
                    </form>
                  </label>
                  <label htmlFor="agreement">
                    <form className="mt-2 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="agreement"
                        id="agreement"
                      />
                      <p className="ms-3 mb-0" id="agreement">
                        Agreement to follow the app's guidelines and policies
                      </p>
                    </form>
                  </label>
                  <label htmlFor="liability">
                    <form className="mt-2 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="liability"
                        id="liability"
                      />
                      <p className="ms-3 mb-0" id="liability">
                        Liability waivers
                      </p>
                    </form>
                  </label>
                </Row>
              </div>

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="12px 100px"
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
    </CreateSchoolStyled>
  );
};

export default CreateMembership;
