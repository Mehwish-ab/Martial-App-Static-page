import profileImg from "../../../../assets/images/create_school_user_profile.svg";
import banner from "../../../../assets/images/create_school_banner.svg";
import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import searchIcon from "../../../assets/icons/ic_search.svg";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import useCreateSchool from "../../../hooks/useCreateSchool";
import {
  BELTS_SELECT_OPTIONS,
  SelectOptionsDataTypes,
} from "../../Home/constants";
import { validationFinder } from "../../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import SearchGoogleLocation from "../../../components/Common/SearchGoogleLocation/SearchGoogleLocation";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CheckboxesList from "../../../components/CustomCheckbox/CheckboxesList";
import PaymentInformation from "../../../components/Common/PaymentInformation/PaymentInformation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateFranchiseInitialValues } from "../constant";
import useBranch from "../hooks/useFranchise";

const CreateFranchise = () => {
  const { getLabelByKey } = useScreenTranslation("franchiseCreate");
  const {
    statusData: { activities, facilities, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);
  const { loading, handleSubmit } = useBranch();
  const initialValues: CreateFranchiseInitialValues = {
    franchiseName: "",
    franchiseType: "",
    address: "",
    franchisePhoneNumber: "",
    belts: "",
    description: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    cardAccessToken: "",
    cardClientId: "",
    cardWebHook: "",
    cardClientSecret: "",
    selectedActivities: [],
    selectedFacilities: [],
    schoolStripeMethod: false,
    schoolGclMethod: false,
  };

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;

  const validationSchema = Yup.object({
    franchiseName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    franchiseType: Yup.string().required("Please select franchise type"),
    franchisePhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    stripePublishableKey: Yup.string().when("schoolStripeMethod", {
      is: false,
      then: Yup.string().required("Please enter stripe publishable key"),
      otherwise: Yup.string().notRequired(),
    }),
    stripeSecretKey: Yup.string().when("schoolStripeMethod", {
      is: false,
      then: Yup.string().required("Please enter stripe secret key"),
      otherwise: Yup.string().notRequired(),
    }),
    cardAccessToken: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card access token"),
      otherwise: Yup.string().notRequired(),
    }),
    cardClientId: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card client id"),
      otherwise: Yup.string().notRequired(),
    }),
    cardWebHook: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card web hook"),
      otherwise: Yup.string().notRequired(),
    }),
    cardClientSecret: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card client secret"),
      otherwise: Yup.string().notRequired(),
    }),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),

    schoolStripeMethod: Yup.boolean(),
    schoolGclMethod: Yup.boolean(),
  });

  const createOptions = (list: DataTypesWithIdAndMultipleLangLabel[]) => {
    let options: SelectOptionsDataTypes[] = [];
    list.forEach((item) => {
      let obj = {
        label: (item as any)[selectedLanguage],
        value: item.id,
      };

      options.push(obj);
    });

    return options;
  };

  return (
    <CreateSchoolStyled>
      <OverlayImages backgroundImg={""} overlayImg={""} isEditable={false} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3>Branch Information</h3>

                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <FormControl
                        control="input"
                        type="text"
                        name="franchiseName"
                        label={getLabelByKey("franchiseName")}
                        padding="10px"
                        fontFamily={fontFamilyMedium}
                        fontSize="16px"
                        max={6}
                        placeholder={getLabelByKey("franchiseName")}
                        className={
                          formik.errors.franchiseName &&
                          formik.touched.franchiseName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="franchiseType"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("franchiseType")}
                        padding="10px"
                        placeholder={getLabelByKey("franchiseType")}
                        className={
                          formik.errors.franchiseType &&
                          formik.touched.franchiseType
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(businessTypes)}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="12">
                      <SearchGoogleLocation
                        name="address"
                        value={formik.values.address}
                        label={getLabelByKey("address")}
                        placeholder={getLabelByKey("address")}
                        className={
                          formik.errors.address && formik.touched.address
                            ? "is-invalid"
                            : "customInput"
                        }
                        setFieldValue={(val: any) => {
                          formik.setFieldValue("address", val);
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <CustomPhoneInput
                        label={getLabelByKey("franchisePhoneNumber")}
                        name="franchisePhoneNumber"
                        value={formik.values.franchisePhoneNumber}
                        placeholder={getLabelByKey("franchisePhoneNumber")}
                        limitMaxLength={true}
                        handleOnChange={(e: string) => {
                          formik.setFieldValue("franchisePhoneNumber", e);
                        }}
                      />
                      <ErrorMessage name={"franchisePhoneNumber"}>
                        {(msg) => (
                          <div className="error-message is-invalid">{msg}</div>
                        )}
                      </ErrorMessage>
                    </Col>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="belts"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("belts")}
                        padding="10px"
                        placeholder={getLabelByKey("belts")}
                        className={
                          formik.errors.belts && formik.touched.belts
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={BELTS_SELECT_OPTIONS}
                      />
                    </Col>
                  </Row>
                </div>

                <CheckboxesList
                  name="selectedActivities"
                  label="Activity"
                  list={activities}
                />

                <CheckboxesList
                  name="selectedFacilities"
                  label="Facility"
                  list={facilities}
                />
                <div className="mt-20">
                  <FormControl
                    control="textarea"
                    type="text"
                    name="description"
                    fontFamily={fontFamilyMedium}
                    // prefix={<img src={lock_icon} alt="lock_icon" />}
                    label={getLabelByKey("description")}
                    padding="10px"
                    placeholder={getLabelByKey("description")}
                    className={
                      formik.errors.description && formik.touched.description
                        ? "is-invalid"
                        : "customInput"
                    }
                    height="200px"
                  />
                </div>

                <PaymentInformation formik={formik} showPaymentMethods={true} />
              </div>

              {/* {Object.keys(formik.errors).map((item: any) => {
                return <li>{item}</li>;
              })} */}
              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="12px 100px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title={getLabelByKey("primaryButton")}
                  fontSize="17px"
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

export default CreateFranchise;
