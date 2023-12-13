import { Formik } from "formik";
import { Form } from "antd";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  maastrichtBlue,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateInstructorInitialValues } from "../constant";
import useInstructor from "../../../hooks/useInstructor";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import DateCalander from "../../../assets/images/dateCalander.svg";
import FileSubmit from "../../../assets/icons/ic_fileSubmit.svg";
import { validationFinder } from "../../../utils/utilities";
import useBranch from "../../Branches/hooks/useBranch";
import * as Yup from "yup";
import { useRef, useState } from "react";


const CreateInstructor = () => {
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const {
    statusData: { activities, facilities },
  } = useSelector((state: RootState) => state.appData.data);

  // const { loading } = useBranch();
  const { loading, handleSubmit } = useInstructor();
  const [file, setFile] = useState<File[]>([]);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: any) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File state updated:", file);
    }
  };

  const initialValues: CreateInstructorInitialValues = {
    instructorName: "",
    emailAddress: "",
    instructorPhoneNumber: "",
    address: "",
    yearsOfExperience: "",
    ranking: "",
    latestCertification: "",
    description: "",
    selectedActivities: [],
    selectedFacilities: [],
    termCondition: "",
    ranks: "",
  };

  const instructorName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(instructorName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const emailAddressReg = new RegExp(emailAddress.pattern);
  const instructorPhoneNumber = validationFinder("PHONE_NUMBER")!;

  const validationSchema = Yup.object({
    in: Yup.string()
      .required(instructorName.notBlankMsgEn)
      .matches(franchiseNameReg, instructorName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    instructorPhoneNumber: Yup.string().required(
      instructorPhoneNumber.notBlankMsgEn
    ),
    ranking: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    yearsOfExperience: Yup.string().required(
      "Please select years Of Experience"
    ),
    latestCertification: Yup.string().required(
      "Please add your latest Certificates"
    ),

    defaultCurrency: Yup.string().required("Please select default currency"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an specilization"))
      .min(1, "Select at least one specilization"),
  });
  const handleonSubmit = () => {
    console.log("submitted");
  };
  return (
    <CreateSchoolStyled>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleonSubmit}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3>Instructor Information</h3>
                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="instructorName"
                      label="Instructor Name"
                      padding="10px"
                      fontFamily={fontFamilyRegular}
                      fontSize="16px"
                      max={6}
                      placeholder="Instructor Name"
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="email"
                      name="emailAddress"
                      fontFamily={fontFamilyRegular}
                      label="Email Address"
                      padding="10px"
                      placeholder="Email Address"
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      label="Instructor Mobile Number"
                      name="instructorPhoneNumber"
                      value={formik.values.instructorPhoneNumber}
                      placeholder={getLabelByKey("instructorPhoneNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("instructorPhoneNumber", e);
                      }}
                    />
                  </Col>

                  <Col md="4" className="mt-20">
                    <PlacesAutoCompleteInput
                      label={getLabelByKey("address")}
                      placeholder="Address"
                      handleChange={(val: any) => {
                        formik.setFieldValue("address", val);
                      }}
                      className={
                        formik.errors.address && formik.touched.address
                          ? "is-invalid"
                          : "customInput"
                      }
                      formik={formik}
                      name="address"
                      value={formik.values.address}
                    />
                  </Col>
                  <Col md="8">
                    <Row>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="input"
                          type="text"
                          name="yearsOfExperience"
                          fontFamily={fontFamilyRegular}
                          label="Years Of Experience"
                          padding="10px"
                          suffix={
                            <img
                              src={DateCalander}
                              alt="Calander"
                              width={21}
                              height={21}
                            />
                          }
                          placeholder="Years Of Experience"
                        />
                      </Col>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="select"
                          type="text"
                          name="ranks"
                          fontFamily={fontFamilyRegular}
                          label="Ranking"
                          placeholder="English"
                        />
                      </Col>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="input"
                          type="file"
                          ref={inputFile} style={{ display: 'none' }}
                          name="file"
                          fontFamily={fontFamilyRegular}
                          label="Latest Certification"
                          src={FileSubmit}
                          onChange={handleChange}
                          suffix={
                            <img
                              src={FileSubmit}
                              alt="Calander"
                              width={21}
                              height={21}
                              className="uploadICon"
                              onClick={() => {
                                inputFile.current?.click()
                              }}
                            />
                          }
                          padding="10px"
                          placeholder="Pound"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedFacilities"
                      label="Specializations"
                      list={facilities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedActivities"
                      label="Activities"
                      list={activities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <div className="mt-20">
                    <FormControl
                      control="textarea"
                      type="text"
                      name="description"
                      fontFamily={fontFamilyRegular}
                      label="Description"
                      padding="10px"
                      placeholder="Description"
                      height="200px"
                    />
                  </div>
                  <label htmlFor="termCondition">
                    <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                      <FormControl
                        control="checkbox"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <p className="ms-3 mb-0" id="termCondition">
                        Terms and conditions
                      </p>
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
                      <p className="ms-3 mb-0" id="agreement">
                        Agreement to follow the app's guidelines and policies
                      </p>
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
                  color={maastrichtBlue}
                  padding="11px 40.50px"
                  margin="30px 0px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title={getLabelByKey("primaryButton")}
                  fontSize="18px"
                  loading={loading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CreateSchoolStyled>
  );
};

export default CreateInstructor;
