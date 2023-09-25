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
import SocalAuth from "../../components/Common/SocalAuth";

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

  // login handle submit
  const handleSubmit = async (values: loginValuesType) => {
    try {
      setloading(true);
      const {
        data: { results },
      } = await axios.post(base_url + login_url, values);
      localStorage.setItem(auth_token_key, JSON.stringify(results));
      // dispatch(setLoginData(results));
      toast("Login Successfully", {
        type: "success",
        autoClose: 1000,
      });
      setloading(false);
      navigate("/");
    } catch (error: any) {
      setloading(false);
      if (error.code) {
        toast(error.response.data.responseMessage, {
          type: "error",
          autoClose: 1000,
        });
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
            <h6 className="title"> Welcome back!</h6>
            <p className="text-center login-text">
              Login to access your account and continue your journey with us
            </p>
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
                            padding="0px"
                            label="Email"
                            placeholder="Enter Email"
                            prefix={<img src={email_icon} alt="email_icon" />}
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
                            label="Passcode"
                            placeholder="Enter Passcode"
                            suffix={show_password_icon}
                            prefix={
                              <img src={password_icon} alt="password_icon" />
                            }
                            className={
                              formik.errors.password && formik.touched.password
                                ? "is-invalid"
                                : "customPasswordInput"
                            }
                            textAlign="end"
                          />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-20">
                          <div className="d-flex align-items-center gap-2">
                             <FormControl
                                control='checkbox'
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                              />
                            <p className="mb-0 text-16">Remember me</p>
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
                            Forgot your password?
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
                            title="Login"
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

            
            <div className="d-flex or-line mt-20 align-items-center">
              <div className="line" />
              <p>Or</p>
              <div className="line" />
            </div>
            <SocalAuth />

            <TermsAndConditions
              setTerms={setTerms}
              showTermsError={showTermsError}
              terms={terms}
            />
            <div className="signup-text mt-20">
              <p className="mb-0 text-16">
                If you already have an account we'll log you in. If not
              </p>
              <h6 className="ms-1 mt-2">
                <Link to="/register" className="underline">
                  register.
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </LoginStyle>
    </>
  );
};

export default Login;
