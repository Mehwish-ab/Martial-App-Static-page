import { Field, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";

import { validationFinder } from "../../../utils/utilities";
import FormControl from "../../../components/FormControl";
import DateCalander from "../../../assets/images/dateCalander.svg";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
  pureDark2,
} from "../../../components/GlobalStyle";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateClassInitialValues } from "../constant";
const UpdateClass = () => {
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);
  const initialValues: CreateClassInitialValues = {
    ClassTitle: "",
    ClassStartDate: "",
    ClassEndDate: "",
    emailAddress: "",
    Classinstructor: [],
    ClassFee: "",
    ClassActivities: "",
    Classcapicity: "",
    MinimumStudents: "",
    startbooking: "",
    endbooking: "",
    QRCodeAttendanceStart: "",
    QRCodeAttendanceEnd: "",
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

  return (
    <CreateSchoolStyled>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3 style={{ color: pureDark2 }}>Class Information</h3>
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
                          label={"Start Dates"}
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
                          name="EndDate"
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
                    <Col md="12" className="d-flex gap-2">
                      <Col md="6" className=" my-4 ">
                        <FormControl
                          control="select"
                          type="text"
                          name="Instructors"
                          label="Instructors"
                          padding="7px"
                          fontFamily={fontFamilyMedium}
                          fontSize="16px"
                          max={6}
                          placeholder="Select Instructors"
                        />
                      </Col>

                      <Col md="6" className="my-4">
                        <FormControl
                          control="input"
                          type="text"
                          name="ClassFee"
                          fontFamily={fontFamilyMedium}
                          label="Class Fee"
                          padding="10px"
                          placeholder="300:00"
                        />
                      </Col>
                    </Col>

                    <Col md="12">
                      <FormControl
                        control="input"
                        type="text"
                        name="Activities"
                        fontFamily={fontFamilyMedium}
                        label="Activities"
                        padding="10px"
                        placeholder="Select Class Activities"
                      />
                    </Col>
                  </Col>

                  <Col md="6">
                    <Col md="12" className="mt-20">
                      <FormControl
                        control="input"
                        type="upload"
                        name="SelectBannerImage"
                        label="Select Banner Image"
                        padding="10px"
                        fontFamily={fontFamilyMedium}
                        fontSize="16px"
                        max={6}
                        placeholder="Select Banner Image"
                      />
                    </Col>
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="ClassCapacity"
                      fontFamily={fontFamilyMedium}
                      label="Class Capacity"
                      padding="10px"
                      placeholder="Enter Capacity of Classroom"
                    />
                  </Col>

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="MinimumStudent"
                      fontFamily={fontFamilyMedium}
                      label="Minimum Student"
                      padding="10px"
                      placeholder="Enter Minimum Student Required for Class"
                    />
                  </Col>
                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="StartBooking"
                      fontFamily={fontFamilyMedium}
                      label="Start Booking"
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
                      name="EndBooking"
                      fontFamily={fontFamilyMedium}
                      label="End Booking"
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
                      name="QRCodeAttendanceStart"
                      fontFamily={fontFamilyMedium}
                      label="QR Code Attendance Start"
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
                      name="QRCodeAttendanceEnd"
                      fontFamily={fontFamilyMedium}
                      label="QR Code Attendance End"
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

                  <Col md="3" className=" mt-20 ">
                    <FormControl
                      control="select"
                      type="text"
                      name="AllowtoStudentCancel "
                      label="Allow to Student Cancel "
                      padding="7px"
                      fontFamily={fontFamilyMedium}
                      fontSize="16px"
                      max={6}
                      placeholder="Select Instructors"
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

                  <Col md="3" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="Cancellation Charge"
                      fontFamily={fontFamilyMedium}
                      label="Cancellation Charge"
                      padding="10px"
                      placeholder="20:00"
                    />
                  </Col>

                  <Col md="3" className=" mt-20 ">
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
                      className="my-2 border border-light border border-4"
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
                  title="Submit"
                  fontSize="18px"
                  loading={false}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CreateSchoolStyled>
  );
};

export default UpdateClass;
