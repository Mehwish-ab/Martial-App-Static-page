
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
import useBranch from "../../../../src/screens/Franchise/hooks/useFranchise";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import DateCalander from "../../../assets/images/dateCalander.svg";
import FileSubmit from "../../../assets/icons/ic_fileSubmit.svg";


const CreateInstructor = () => {
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const {
    statusData: { activities, facilities },
  } = useSelector((state: RootState) => state.appData.data);

  const { loading } = useBranch();

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
    ranks: ""
  };

  return (
    <CreateSchoolStyled>
      <Formik
        initialValues={initialValues}
        onSubmit={() => { }}
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
                        formik.setFieldValue("franchisePhoneNumber", e);
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
                          suffix={<img src={DateCalander} alt="Calander" width={21} height={21} />}
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
                          type="upload"
                          name="latestCertification"
                          fontFamily={fontFamilyRegular}
                          label="Latest Certification"
                          suffix={<img src={FileSubmit} alt="Calander" width={21} height={21} />}
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
      </Formik >
    </CreateSchoolStyled >
  );
};

export default CreateInstructor;
