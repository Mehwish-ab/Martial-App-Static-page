import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import CreateUserStyle from "./style";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  lightDark2,
  pureDark,
  whiteColor,
} from "../../components/GlobalStyle";
import Head from "../../components/Head/Head";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import OauthLogin from "../../components/Common/OauthLogin/OauthLogin";
import EnnvisionModal from "../../components/CustomModals/EnnvisionModal";
import CustomModal from "../../components/Modal/CustomModal";
import profile_icon from "../../assets/icons/ic_profile.svg";
import lock_icon from "../../assets/icons/password.svg";
import email_icon from "../../assets/icons/ic_email.svg";
import ic_building from "../../assets/icons/ic_building.svg";
import { useAppSelector } from "../../app/hooks";
import { validationFinder } from "../../utils/utilities";
import { toast } from "react-toastify";
import axios from "axios";
import { signup_url } from "../../utils/api_urls";
import CustomPhoneInput from "../../components/CustomInputNumber/CustomPhoneInput";
import Errormsg from "../../components/ErrorMessage";
import { OAUTH_USECASES } from "../../components/Common/OauthLogin/constants";

// create user initial values types
type initialValuesType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string | number;
  password: string;
  confirmPassword?: string;
};

const RegisterUser = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const scrollViewRef = useRef<any>();
  const navigate = useNavigate();

  const initialValues: initialValuesType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const { result: userLocation } = useAppSelector(
    (state) => state.userLocation
  );
  // get Validations from redux appData
  const {
    countryName: {
      results: {
        countryCode,
        countryFlagURL,
        examplePhoneNumber,
        name,
        phoneNumberLength,
      },
    },
  } = useAppSelector((state) => state.appData.data);
  // create user initial values

  // user validations
  const firstName = validationFinder("USER_FIRSTNAME")!;
  const lastName = validationFinder("USER_LASTNAME")!;
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const phoneNumber = validationFinder("CANADA_PHONE_NUMBER")!;
  const password = validationFinder("PASSWORD")!;
  // user regExpressions
  const firstNameReg = new RegExp(firstName.pattern);
  const lastNameReg = new RegExp(lastName.pattern);
  const emailAddressReg = new RegExp(emailAddress.pattern);
  const phoneNumberReg = new RegExp(phoneNumber.pattern);
  const passwordReg = new RegExp(password.pattern);

  // create user validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(firstName.notBlankMsgEn)
      .matches(firstNameReg, firstName.patternMsgEn),
    lastName: Yup.string()
      .required(lastName.notBlankMsgEn)
      .matches(lastNameReg, lastName.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    phoneNumber: Yup.string()
      .required(phoneNumber.notBlankMsgEn)
      .matches(phoneNumberReg, phoneNumber.patternMsgEn),
    password: Yup.string()
      .required(password.notBlankMsgEn)
      .matches(passwordReg, password.patternMsgEn),
    confirmPassword: Yup.string()
      .required("confirm password is required!")
      .oneOf([Yup.ref("password")], "passwords must match"),
  });
  // create user data submit
  const onSubmit = async (values: initialValuesType) => {
    if (!terms) {
      setShowTermsError(true);
      setTimeout(() => {
        setShowTermsError(false);
      }, 2000);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      return;
    }
    // get all values other than confirm password
    const allValues = {
      ...values,
    };
    delete allValues.confirmPassword;
    const registerUserValues = {
      ...allValues,
      phoneNumber: values.phoneNumber.toString(),
      countryName: name,
      countryCode: countryCode,
    };
    const userData = {
      ...registerUserValues,
      roleId: 1,
      channel: "Web",
      address: userLocation?.address,
      city: userLocation?.city,
      state: userLocation?.state,
    };
    try {
      setIsLoading(true);
      await axios.post(signup_url, userData);
      setIsShowModal(true);
      setTimeout(() => {
        setIsShowModal(false);
        navigate("/login");
      }, 3000);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast(error.response.data.responseMessage, {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Head title="register" />
      <CustomModal
        isModalVisible={isShowModal}
        setIsModalVisible={setIsShowModal}
        showCloseBtn={false}
      >
        <EnnvisionModal
          doTask={() => {
            navigate("/login");
            setIsShowModal(false);
          }}
          title="Account Created Successfully!"
          description="Thank You For Joining Us And We're Excited To Have You On Board"
        />
      </CustomModal>
      <CreateUserStyle>
        <div className="inner-container">
          <div className="inner-container-card">
            <h6 className="title">Create Your Account</h6>
            <p className="text-center message my-3">
              Please fill in the required information to complete your
              registration and join our us.
            </p>
            <div className="inner-container-card-form">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  console.log(formik.values, "formik values");
                  return (
                    <Form
                      name="basic"
                      onFinish={formik.handleSubmit}
                      autoComplete="off"
                    >
                      <div className="role-section">
                        <h6>Select Your Role</h6>
                        <div className="d-flex gap-2 roles mt-3">
                          <CustomButton
                            bgcolor={whiteColor}
                            textTransform="Captilize"
                            color={lightDark2}
                            padding="8px"
                            width="100%"
                            icon={<img src={ic_building} alt="buiding_icon" />}
                            type="submit"
                            title=" School"
                            fontSize="16px"
                            loading={isLoading}
                            fontFamily={fontFamilyRegular}
                          />
                          <CustomButton
                            bgcolor={whiteColor}
                            textTransform="Captilize"
                            color={lightDark2}
                            icon={<img src={profile_icon} alt="profile_icon" />}
                            padding="8px"
                            width="100%"
                            type="submit"
                            title="Student"
                            fontSize="16px"
                            loading={isLoading}
                            fontFamily={fontFamilyRegular}
                          />
                        </div>
                      </div>
                      <div className="register-input-fields mt-3">
                        <div>
                          <FormControl
                            control="input"
                            type="text"
                            name="firstName"
                            label="First Name"
                            fontSize="14px"
                            border="1px solid #EFEFF4"
                            placeholder="First Name"
                            padding="0px"
                            prefix={
                              <img src={profile_icon} alt="profile_icon" />
                            }
                            labelFamily={fontFamilyMedium}
                            className={
                              formik.errors.firstName &&
                              formik.touched.firstName
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </div>
                        <div>
                          <FormControl
                            control="input"
                            type="text"
                            name="lastName"
                            fontSize="14px"
                            label="Surname  Name"
                            border="1px solid #EFEFF4"
                            labelFamily={fontFamilyMedium}
                            padding="0px"
                            prefix={
                              <img src={profile_icon} alt="profile_icon" />
                            }
                            placeholder="Enter Surname Name"
                            className={
                              formik.errors.lastName && formik.touched.lastName
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </div>
                        <div>
                          <FormControl
                            control="input"
                            type="email"
                            fontSize="14px"
                            name="emailAddress"
                            border="1px solid #EFEFF4"
                            padding="0px"
                            label="Email"
                            prefix={<img src={email_icon} alt="email_icon" />}
                            labelFamily={fontFamilyMedium}
                            placeholder="Enter Email"
                            className={
                              formik.errors.emailAddress &&
                              formik.touched.emailAddress
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <CustomPhoneInput
                            countryNumber={countryCode}
                            placeholder={examplePhoneNumber}
                            phoneLength={phoneNumberLength}
                            countryFlag={countryFlagURL}
                            phoneValueHandler={(value: number | string) =>
                              formik.setFieldValue("phoneNumber", value)
                            }
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            countryName={name}
                          />
                          <div className="mt-3">
                            <ErrorMessage
                              name="phoneNumber"
                              component={Errormsg}
                            />
                          </div>
                        </div>
                        <div className="login-input-fields-field">
                          <FormControl
                            control="password"
                            type="text"
                            name="password"
                            label="Password"
                            padding="0px"
                            fontFamily={fontFamilyMedium}
                            prefix={<img src={lock_icon} alt="lock_icon" />}
                            max={6}
                            border="1px solid #EFEFF4"
                            placeholder="Enter Password"
                            className={
                              formik.errors.password && formik.touched.password
                                ? "is-invalid"
                                : "customPasswordInput"
                            }
                          />
                        </div>
                        <div className="login-input-fields-field">
                          <FormControl
                            control="password"
                            type="text"
                            name="confirmPassword"
                            fontFamily={fontFamilyMedium}
                            prefix={<img src={lock_icon} alt="lock_icon" />}
                            border="1px solid #EFEFF4"
                            label="Confirm Password"
                            padding="0px"
                            placeholder="Enter Confirm passcode"
                            className={
                              formik.errors.confirmPassword &&
                              formik.touched.confirmPassword
                                ? "is-invalid"
                                : "customPasswordInput"
                            }
                          />
                        </div>
                        <div className="d-flex gap-2">
                          <input type="checkbox" name="" id="" />
                          <p>Remember me</p>
                        </div>

                        <div className="mt-3">
                          <CustomButton
                            bgcolor={lightBlue3}
                            textTransform="Captilize"
                            color={pureDark}
                            padding="11px 8px"
                            width="100%"
                            type="submit"
                            title="Register"
                            fontSize="16px"
                            loading={isLoading}
                          />
                        </div>
                        <div className="d-flex justify-center or-line mt-[20px]">
                          <div className="line" />
                          <p>Or</p>
                          <div className="line" />
                        </div>
                        <OauthLogin usecase={OAUTH_USECASES.register} />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <TermsAndConditions
              terms={terms}
              setTerms={setTerms}
              showTermsError={showTermsError}
              screen="registerScreen"
            />
            <div className="signup-text mt-3">
              <p>If you already have an account we'll log you in. If not</p>
              <h6 className="ms-1">
                <Link to="/login">login.</Link>
              </h6>
            </div>
          </div>
        </div>
      </CreateUserStyle>
    </>
  );
};

export default RegisterUser;
