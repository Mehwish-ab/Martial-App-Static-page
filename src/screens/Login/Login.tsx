import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark2,
} from "../../components/GlobalStyle";
import LoginStyle from "./style";
import { useState } from "react";
import Head from "../../components/Head/Head";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
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
import store, { RootState } from "../../redux/store";
import MessageModal from "../../components/Common/MessageModal/MessageModal";
import { setLoginData } from "../../redux/features/loginDataSlice";
import useOauthLogin from "../../hooks/useOauthLogin";
import { getSchoolByUserId } from "../../redux/features/dashboard/dashboardDataSlice";
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
  const { loading: oAuthLoading } = useOauthLogin();
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
  console.log(initialValues);
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
          message="Successful"
          description="You are successfully logged in to your account."
          type="success"
        />,
        {
          autoClose: 1000,
        }
      );
      setloading(false);
      if (results.schoolId) store.dispatch(getSchoolByUserId());
      navigate("/");
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
      <Head title="Login" />
      <LoginStyle>
        <div className="login-container overflow-auto">
          <div className="login-container-card">
            <h6 className="text-center title">
              {getLabelByKey(SCREEN_LABEL_KEYS.title)}
            </h6>
            <p className="subtitle text-center">{getLabelByKey(SCREEN_LABEL_KEYS.subtitle)}</p>
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
                              color={pureDark2}
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
                                  ? "is-invalid is-invalidEmail"
                                  : "customInput"

                              }
                              textalign="end"
                            />
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="password"
                              type="text"
                              name="password"
                              color={pureDark2}
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldTitle
                              )}
                              padding="10px"
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                              )}
                              suffix={show_password_icon}
                              className={
                                formik.errors.password &&
                                  formik.touched.password
                                  ? "is-invalid loginInvalidPassword"
                                  : "customPasswordInput loginPassword"

                              }
                              textalign="end"
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-20">
                            <div className="d-flex align-items-center gap-2 checkBoxstyling">
                              <FormControl
                                control="checkbox"
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                              />
                              <p className="remeberText">
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
                          <div className="mt-20 loginBtn">
                            <CustomButton
                              bgcolor={lightBlue3}
                              textTransform="Captilize"
                              color={pureDark2}
                              padding="16.5px"
                              fontFamily={fontFamilyMedium}
                              width="100%"
                              type="submit"
                              title={getLabelByKey(
                                SCREEN_LABEL_KEYS.loginButton
                              )}
                              fontSize="16px"
                              loading={loading || oAuthLoading}
                            />
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              <div className="d-flex or-line fs-6 mt-20 align-items-center">
                <div className="line" />
                <p className="orText">{getLabelByKey(SCREEN_LABEL_KEYS.or)}</p>
                <div className="line" />
              </div>
              <OauthLogin usecase={OAUTH_USECASES.login} />
              <TermsAndConditions
                setTerms={setTerms}
                showTermsError={showTermsError}
                terms={terms}
                screen={"loginScreen"}
              />
              <div className="signup-text mt-20">
                <p className="mb-0 text-center ">
                  {getLabelByKey(SCREEN_LABEL_KEYS.register)}
                  <span
                    className={`${selectedLanguage === "ar" || selectedLanguage === "ur"
                      ? "me-1"
                      : "ms-1"
                      } mt-2`}
                  >
                    <Link to="/register" className="">
                      {getLabelByKey(SCREEN_LABEL_KEYS.registerAccount)}
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </LoginStyle>
    </>
  );
};

export default Login;
