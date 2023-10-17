import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  lightDark3,
  pureDark,
} from "../../components/GlobalStyle";
import LoginStyle from "./style";
import { useState } from "react";
import Head from "../../components/Head/Head";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import email_icon from "../../assets/icons/ic_email.svg";
import password_icon from "../../assets/icons/password.svg";
import show_password_icon from "../../assets/icons/ic_show_passcode.svg";
import { auth_token_key, base_url, login_url } from "../../utils/api_urls";
import axios from "axios";
import { validationFinder } from "../../utils/utilities";
import { toast } from "react-toastify";

import useScreenTranslation from "../../hooks/useScreenTranslation";
import { SCREEN_LABEL_KEYS } from "./constants";
import OauthLogin from "../../components/Common/OauthLogin/OauthLogin";
import { OAUTH_USECASES } from "../../components/Common/OauthLogin/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MessageModal from "../../components/Common/MessageModal/MessageModal";
import { setLoginData } from "../../redux/features/loginDataSlice";
// initial values types
type loginValuesType = {
  emailAddress: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [terms, setTerms] = useState(false);
  const [showTermsError] = useState(false);
  const [loading, setloading] = useState(false);
  const { getLabelByKey } = useScreenTranslation("loginScreen");
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  // console.log("screenTranslation", screenTranslation);
  // initial values
  const initialValues: loginValuesType = {
    emailAddress: "",
    password: "",
  };

  // validations from redux appData
  const email = validationFinder("EMAIL_ADDRESS")!;
  const password = validationFinder("PASSWORD")!;

  // regExpressions from redux appData
  const emailReg = new RegExp(email.pattern);
  const passwordReg = new RegExp(password.pattern);

  // validation schema
  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .required(email.notBlankMsgEn)
      .matches(emailReg, email.patternMsgEn),
    password: Yup.string()
      .required(password.notBlankMsgEn)
      .matches(passwordReg, password.patternMsgEn),
  });

  const dispatch = useDispatch();
  // login handle submit
  const handleSubmit = async (values: loginValuesType) => {
    try {
      setloading(true);
      const {
        data: { results },
      } = await axios.post(base_url + login_url, values);
      localStorage.setItem(auth_token_key, JSON.stringify(results));
      dispatch(setLoginData(results));
      toast(
        <MessageModal
          message="Login Successfully"
          description="You are successfully logged in to your account."
          type="success"
        />,
        {
          autoClose: 1000,
        }
      );
      setloading(false);
      navigate("/school/create");
    } catch (error: any) {
      setloading(false);
      if (error.code) {
        toast(
          <MessageModal
            message={error.response.data.responseMessage}
            description="Please enter correct email or password"
            type="error"
          />
        );
        return;
      }
      toast(error.response.data.responseMessage, {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Head title="login" />
      <LoginStyle>
        <div className="login-container overflow-auto">
          <div className="login-container-card">
            {/* <h6 className="title">{getLabelByKey(SCREEN_LABEL_KEYS.title)}</h6> */}
            <h6 className="text-center title">
              {getLabelByKey(SCREEN_LABEL_KEYS.loginButton)}
            </h6>
            <div className="login-container-card-inner">
              <div className="login-container-card-form">
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
                        <div className="login-input-fields">
                          <div className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="emailAddress"
                              color={lightDark3}
                              padding="10px"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.emailFieldTitle
                              )}
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.emailFieldPlaceholder
                              )}
                              // prefix={<img src={email_icon} alt="email_icon" />}
                              className={
                                formik.errors.emailAddress &&
                                formik.touched.emailAddress
                                  ? "is-invalid"
                                  : "customInput"
                              }
                              textAlign="end"
                            />
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="password"
                              type="text"
                              name="password"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldTitle
                              )}
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                              )}
                              suffix={show_password_icon}
                              // prefix={
                              //   <img src={password_icon} alt="password_icon" />
                              // }
                              padding="10px"
                              className={
                                formik.errors.password &&
                                formik.touched.password
                                  ? "is-invalid"
                                  : "customPasswordInput"
                              }
                              textAlign="end"
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-20">
                            <div className="d-flex align-items-center gap-2">
                              <FormControl
                                control="checkbox"
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                              />
                              <p className="mb-0 text-14">
                                {getLabelByKey(SCREEN_LABEL_KEYS.rememberMe)}
                              </p>
                            </div>
                            <p
                              className="forget_password mb-0 text-end cursor-pointer"
                              onClick={() =>
                                navigate("/forget-password", {
                                  state: {
                                    userCase: "FORGETPASSWORD",
                                  },
                                })
                              }
                            >
                              {getLabelByKey(SCREEN_LABEL_KEYS.forgotPassword)}
                            </p>
                          </div>
                          <div className="mt-20">
                            <CustomButton
                              bgcolor={lightBlue3}
                              textTransform="Captilize"
                              color={pureDark}
                              padding="10px"
                              fontFamily={fontFamilyMedium}
                              width="100%"
                              type="submit"
                              title={getLabelByKey(
                                SCREEN_LABEL_KEYS.loginButton
                              )}
                              fontSize="16px"
                              loading={loading}
                            />
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              {/* <div className="d-flex or-line mt-20 align-items-center">
                <div className="line" />
                <p>{getLabelByKey(SCREEN_LABEL_KEYS.or)}</p>
                <div className="line" />
              </div> */}
              <OauthLogin usecase={OAUTH_USECASES.login} />

              <TermsAndConditions
                setTerms={setTerms}
                showTermsError={showTermsError}
                terms={terms}
                screen={"loginScreen"}
              />
              <div className="signup-text mt-20">
                <p className="mb-0">
                  {getLabelByKey(SCREEN_LABEL_KEYS.register)}
                </p>

                <h6
                  className={`${
                    selectedLanguage === "ar" || selectedLanguage === "ur"
                      ? "me-1"
                      : "ms-1"
                  } mt-2`}
                >
                  <Link to="/register" className="underline">
                    {getLabelByKey(SCREEN_LABEL_KEYS.registerAccount)}
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </LoginStyle>
    </>
  );
};

export default Login;
