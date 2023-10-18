import { CreateSchoolStyled } from "../styles";
import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import useCreateSchool from "../../../hooks/useCreateSchool";
import { useParams } from "react-router-dom";
import {
  BELTS_SELECT_OPTIONS,
  CreateSchoolInitialValues,
  SelectOptionsDataTypes,
} from "../../Home/constants";
import { validationFinder } from "../../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CheckboxesList from "../../../components/CustomCheckbox/CheckboxesList";
import PaymentInformation from "../../../components/Common/PaymentInformation/PaymentInformation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";

const EditSchool = () => {
  const { getLabelByKey } = useScreenTranslation("schoolCreate");
  const {
    statusData: { activities, facilities, currency, language, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);
  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const { handleSubmit, loading } = useCreateSchool();
  const { schoolId } = useParams();

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const businessName = validationFinder("BUSINESS_NAME")!;
  const businessNameReg = new RegExp(businessName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const businessPhoneNumber = validationFinder("PHONE_NUMBER")!;

  const validationSchema = Yup.object({
    businessName: Yup.string()
      .required(businessName.notBlankMsgEn)
      .matches(businessNameReg, businessName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    businessType: Yup.string().required("Please select business type"),
    businessPhoneNumber: Yup.string().required(
      businessPhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    description: Yup.string().required("Please enter description"),
    stripePublishableKey: Yup.string().required(
      "Please enter stipe publishable key"
    ),
    stripeSecretKey: Yup.string().required("Please enter stipe secret key"),
    cardAccessToken: Yup.string().required("Please enter card access token"),
    cardClientId: Yup.string().required("Please enter card client id"),
    cardWebHook: Yup.string().required("Please enter card web hook"),
    cardClientSecret: Yup.string().required("Please enter card client secret"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),
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

  const initialValuesForEdit: CreateSchoolInitialValues = {
    businessName: schoolData.businessName,
    businessType: schoolData.businessType.toString(),
    address: schoolData.address,
    businessPhoneNumber: schoolData.phoneNumber,
    belts: schoolData.belts ? 1 : 2, // 1 for yes, 2 for no
    defaultLanguage: schoolData.languageId,
    defaultCurrency: schoolData.currencyId,
    description: schoolData.description,
    stripePublishableKey: schoolData.stripePublicKey,
    stripeSecretKey: schoolData.stripeSecretKey,
    cardAccessToken: schoolData.gclAccessToken,
    cardClientId: schoolData.gclClientId,
    cardWebHook: schoolData.gclWebHook,
    cardClientSecret: schoolData.gclClientSecret,
    selectedActivities: schoolData.activities.split(",").map(String),
    selectedFacilities: schoolData.facilities.split(",").map(String),
  };

  return (
    <CreateSchoolStyled>
      <OverlayImages
        backgroundImg={schoolData.bannerPicture || ""}
        overlayImg={schoolData.profilePicture || ""}
        isEditable={true}
      />
      <Formik
        initialValues={initialValuesForEdit}
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
                <h3>School Information</h3>

                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <FormControl
                        control="input"
                        type="text"
                        name="businessName"
                        label={getLabelByKey("businessName")}
                        padding="10px"
                        fontFamily={fontFamilyMedium}
                        fontSize="16px"
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        max={6}
                        // border="none"
                        placeholder={getLabelByKey("businessNamePlaceholder")}
                        className={
                          formik.errors.businessName &&
                          formik.touched.businessName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="businessType"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("businessType")}
                        padding="10px"
                        placeholder={getLabelByKey("businessTypePlaceholder")}
                        className={
                          formik.errors.businessType &&
                          formik.touched.businessType
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(businessTypes)}
                        defaultValue={
                          schoolId
                            ? createOptions(businessTypes).find(
                                (item) => item.value === schoolData.businessType
                              )?.label
                            : undefined
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="12">
                      <PlacesAutoCompleteInput
                        label={getLabelByKey("address")}
                        placeholder={getLabelByKey("addressPlaceholder")}
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
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <CustomPhoneInput
                        label={getLabelByKey("businessPhoneNumber")}
                        name="businessPhoneNumber"
                        value={formik.values.businessPhoneNumber}
                        placeholder={getLabelByKey("businessPhoneNumber")}
                        limitMaxLength={true}
                        handleOnChange={(e: string) => {
                          formik.setFieldValue("businessPhoneNumber", e);
                        }}
                      />
                      <ErrorMessage name={"businessPhoneNumber"}>
                        {(msg) => (
                          <div
                            className="error-message is-invalid"
                            style={{
                              color: "red",
                              textAlign: "start",
                              marginLeft: "3px",
                              fontSize: "12px",
                              letterSpacing: "1px",
                              fontFamily: fontFamilyRegular,
                            }}
                          >
                            {msg}
                          </div>
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
                        placeholder={getLabelByKey("beltsPlaceholder")}
                        className={
                          formik.errors.belts && formik.touched.belts
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={BELTS_SELECT_OPTIONS}
                        defaultValue={
                          schoolId
                            ? BELTS_SELECT_OPTIONS.find(
                                (item) =>
                                  item.value === initialValuesForEdit.belts
                              )?.label
                            : undefined
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="defaultLanguage"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("defaultLanguage")}
                        padding="10px"
                        placeholder={getLabelByKey("defaultLanguage")}
                        className={
                          formik.errors.defaultLanguage &&
                          formik.touched.defaultLanguage
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(language)}
                        defaultValue={
                          schoolId
                            ? createOptions(language).find(
                                (item) => item.value === schoolData.languageId
                              )?.label
                            : undefined
                        }
                      />
                    </Col>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="defaultCurrency"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("defaultCurrency")}
                        padding="10px"
                        placeholder={getLabelByKey("defaultCurrency")}
                        className={
                          formik.errors.defaultCurrency &&
                          formik.touched.defaultCurrency
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(currency)}
                        defaultValue={
                          schoolId
                            ? createOptions(currency).find(
                                (item) => item.value === schoolData.currencyId
                              )?.value
                            : undefined
                        }
                      />
                    </Col>
                  </Row>
                </div>

                <CheckboxesList
                  name="selectedActivities"
                  label={getLabelByKey("activity")}
                  list={activities}
                />

                <CheckboxesList
                  name="selectedFacilities"
                  label={getLabelByKey("facilities")}
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
                    placeholder={getLabelByKey("enterDescription")}
                    className={
                      formik.errors.description && formik.touched.description
                        ? "is-invalid"
                        : "customInput"
                    }
                    height="200px"
                  />
                </div>

                <PaymentInformation formik={formik} />
              </div>

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="12px 100px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  // title={getLabelByKey(
                  //   PASSWORD_SCREEN_LABEL_KEYS.sumbitButton
                  // )}
                  title={getLabelByKey("primaryButton")}
                  fontSize="17px"
                  disabled={!formik.isValid}
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

export default EditSchool;
